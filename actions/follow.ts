'use server'

import { followUser } from '@/lib/followService'
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
