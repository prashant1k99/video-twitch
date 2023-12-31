'use server'

import { v4 } from 'uuid'
import { AccessToken } from 'livekit-server-sdk'

import { getSelf } from '@/lib/authService'
import { getUserById } from '@/lib/userService'
import { isBlockedByUser } from '@/lib/blockService'

export const createViewerToken = async (hostIdentity: string) => {
	let self
	try {
		self = await getSelf()
	} catch (err) {
		const id = v4()
		const username = `guest#${id.slice(0, 4)}`
		self = {
			id,
			username,
		}
	}

	const host = await getUserById(hostIdentity)

	if (!host) {
		throw new Error('User not found')
	}
	const isHost = self.id === host.id

	if (!isHost) {
		const isBlocked = await isBlockedByUser(host.id)

		if (isBlocked) {
			throw new Error('Unable to join stream')
		}
	}

	const identity = isHost ? `host-${self.id}` : self.id

	const token = new AccessToken(
		process.env.LIVEKIT_API_KEY!,
		process.env.LIVEKIT_API_SECRET!,
		{
			identity,
			name: self.username,
		}
	)

	token.addGrant({
		room: host.id,
		roomJoin: true,
		canPublish: false,
		canPublishData: false,
	})

	return await Promise.resolve(token.toJwt())
}
