'use server'

import { getSelf } from '@/lib/authService'
import { blockUser, unblockUser } from '@/lib/blockService'
import { RoomServiceClient } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY,
	process.env.LIVEKIT_API_SECRET
)

export const onBlock = async (id: string) => {
	try {
		const self = await getSelf()

		let blockedUser

		try {
			blockedUser = await blockUser(id)
		} catch (err) {
			// User is guest
		}

		try {
			await roomService.removeParticipant(self.id, id)
		} catch (err) {
			// This means user is not in the room
		}

		revalidatePath(`/u/${self.username}/community`)

		return blockedUser
	} catch (err) {
		if (err instanceof Error)
			throw new Error(`Failed to follow user: ${err.message}`)
		else throw new Error('Failed to follow user')
	}
}

export const onUnBlock = async (id: string) => {
	try {
		const unblockedUser = await unblockUser(id)

		revalidatePath('/')

		if (unblockedUser) {
			revalidatePath(`/${unblockedUser.blockee.username}`)
		}

		return unblockedUser
	} catch (err) {
		if (err instanceof Error)
			throw new Error(`Failed to unfollow user: ${err.message}`)
		else throw new Error('Failed to unfollow user')
	}
}
