import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const isBlockedByUser = async (id: string) => {
	try {
		const self = await getSelf()

		if (!self || self?.id === id) return false

		const otherUser = await db.user.findUnique({
			where: { id },
		})

		if (!otherUser) throw new Error('User not found')

		const isBlocked = await db.block.findUnique({
			where: {
				blockerId_blockeeId: {
					blockerId: otherUser.id,
					blockeeId: self.id,
				},
			},
		})

		return !!isBlocked
	} catch (err) {
		return false
	}
}

export const isBlocked = async (id: string) => {
	try {
		const self = await getSelf()

		if (!self || self?.id === id) return false

		const otherUser = await db.user.findUnique({
			where: { id },
		})

		if (!otherUser) throw new Error('User not found')

		const wasBlocked = await db.block.findUnique({
			where: {
				blockerId_blockeeId: {
					blockerId: self.id,
					blockeeId: otherUser.id,
				},
			},
		})

		return !!wasBlocked
	} catch (err) {
		return false
	}
}

export const blockUser = async (id: string) => {
	const self = await getSelf()

	if (!self) throw new Error('Authentication required')

	if (self?.id === id) throw new Error('Cannot block yourself')

	const otherUser = await db.user.findUnique({
		where: { id },
	})

	if (!otherUser) throw new Error('User not found')

	const isBlocked = await db.block.findUnique({
		where: {
			blockerId_blockeeId: {
				blockerId: self.id,
				blockeeId: otherUser.id,
			},
		},
	})

	if (isBlocked) return

	const block = await db.block.create({
		data: {
			blockerId: self.id,
			blockeeId: otherUser.id,
		},
		include: {
			blockee: true,
		},
	})

	return block
}

export const unblockUser = async (id: string) => {
	const self = await getSelf()

	if (!self) throw new Error('Authentication required')

	if (self?.id === id) throw new Error('Cannot unblock yourself')

	const otherUser = await db.user.findUnique({
		where: { id },
	})

	if (!otherUser) throw new Error('User not found')

	const isBlocked = await db.block.findUnique({
		where: {
			blockerId_blockeeId: {
				blockerId: self.id,
				blockeeId: otherUser.id,
			},
		},
	})

	if (!isBlocked) return

	const unblocked = await db.block.delete({
		where: {
			id: isBlocked.id,
		},
		include: {
			blockee: true,
		},
	})

	return unblocked
}
