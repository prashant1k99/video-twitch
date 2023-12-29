import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const getFollowedUsers = async (page = 1, pageSize = 10) => {
	try {
		const self = await getSelf()

		if (!self) return []

		const followedUsers = await db.follow.findMany({
			where: {
				followerId: self?.id,
			},
			include: {
				followee: true,
			},
			take: pageSize,
			skip: (page - 1) * pageSize,
		})

		return followedUsers
	} catch (err) {
		return []
	}
}

export const isFollowingUser = async (id: string) => {
	try {
		const self = await getSelf()

		if (!self) return false
		if (self?.id === id) return true

		const otherUser = await db.user.findUnique({
			where: { id },
		})

		if (!otherUser) throw new Error('User not found')

		const following = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followeeId: otherUser.id,
			},
		})

		return !!following
	} catch (err) {
		return false
	}
}

export const followUser = async (id: string) => {
	const self = await getSelf()

	if (!self) throw new Error('Authentication required')

	if (self?.id === id) throw new Error('Cannot follow yourself')

	const otherUser = await db.user.findUnique({
		where: { id },
	})

	if (!otherUser) throw new Error('User not found')

	const following = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followeeId: otherUser.id,
		},
	})

	if (following) return

	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followeeId: otherUser.id,
		},
		include: {
			followee: true,
			follower: true,
		},
	})

	return follow
}

export const unfollowUser = async (id: string) => {
	const self = await getSelf()

	if (!self) throw new Error('Authentication required')

	if (self?.id === id) throw new Error('Cannot unfollow yourself')

	const otherUser = await db.user.findUnique({
		where: { id },
	})

	if (!otherUser) throw new Error('User not found')

	const isFollowing = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followeeId: otherUser.id,
		},
	})

	if (!isFollowing) throw new Error('You are not following this user')

	const follow = await db.follow.delete({
		where: {
			id: isFollowing.id,
		},
		include: {
			followee: true,
			follower: true,
		},
	})

	return follow
}
