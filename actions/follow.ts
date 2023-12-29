'use server'

import { followUser, unfollowUser } from '@/lib/followService'
import { revalidatePath } from 'next/cache'

export const onFollow = async (id: string) => {
	try {
		const followedUser = await followUser(id)

		revalidatePath('/')

		if (followedUser) {
			revalidatePath(`/${followedUser.followee.username}`)
		}

		return followedUser
	} catch (err) {
		if (err instanceof Error)
			throw new Error(`Failed to follow user: ${err.message}`)
		else throw new Error('Failed to follow user')
	}
}

export const onUnfollow = async (id: string) => {
	try {
		const unfollowedUser = await unfollowUser(id)

		revalidatePath('/')

		if (unfollowedUser) {
			revalidatePath(`/${unfollowedUser.followee.username}`)
		}

		return unfollowedUser
	} catch (err) {
		if (err instanceof Error)
			throw new Error(`Failed to unfollow user: ${err.message}`)
		else throw new Error('Failed to unfollow user')
	}
}
