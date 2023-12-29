'use server'

import { blockUser, unblockUser } from '@/lib/blockService'
import { revalidatePath } from 'next/cache'

export const onBlock = async (id: string) => {
	try {
		// TODO: Implement livestream blocking
		// TODO: Implement kicking guests
		const blockedUser = await blockUser(id)

		revalidatePath('/')

		if (blockedUser) {
			revalidatePath(`/${blockedUser.blockee.username}`)
		}

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
