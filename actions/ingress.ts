'use server'

import {
	IngressAudioEncodingPreset,
	IngressInput,
	IngressClient,
	IngressVideoEncodingPreset,
	RoomServiceClient,
	CreateIngressOptions,
} from 'livekit-server-sdk'
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models'

import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY,
	process.env.LIVEKIT_API_SECRET
)

const ingressClient = new IngressClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY,
	process.env.LIVEKIT_API_SECRET
)

export const resetIngress = async (hostIdentity: string) => {
	const ingresses = await ingressClient.listIngress({
		roomName: hostIdentity,
	})

	if (!ingresses || ingresses.length === 0) {
		return
	}

	for (const ingress of ingresses) {
		if (ingress.ingressId) await ingressClient.deleteIngress(ingress.ingressId)
	}

	const rooms = await roomService.listRooms([hostIdentity])

	if (!rooms || rooms.length === 0) {
		return
	}

	for (const room of rooms) {
		await roomService.deleteRoom(room.name)
	}
}

export const createIngress = async (ingressType: IngressInput) => {
	const self = await getSelf()

	await resetIngress(self.id)

	const options: CreateIngressOptions = {
		name: self.username,
		roomName: self.id,
		participantIdentity: self.id,
		participantName: self.username,
	}

	if (ingressType === IngressInput.WHIP_INPUT) {
		options.bypassTranscoding = true
	} else {
		options.video = {
			source: TrackSource.CAMERA,
			preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
		}
		options.audio = {
			source: TrackSource.MICROPHONE,
			preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
		}
	}

	const ingress = await ingressClient.createIngress(ingressType, options)

	if (!ingress || !ingress.url || !ingress.streamKey) {
		throw new Error('Failed to create ingress')
	}

	await db.stream.update({
		where: {
			userId: self.id,
		},
		data: {
			ingressId: ingress.ingressId,
			serverUrl: ingress.url,
			streamKey: ingress.streamKey,
		},
	})

	revalidatePath(`/u/${self.username}/keys`)
	return ingress
}
