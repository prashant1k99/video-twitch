import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const getStreamByUserId = async (userId: string) => {
	const stream = await db.stream.findUnique({
		where: {
			userId,
		},
	})

	if (!stream) {
		throw new Error('Stream not found')
	}

	return stream
}

export const getStreamByUsername = async (username: string) => {
	const user = await db.user.findUnique({
		where: {
			username,
		},
	})

	if (!user) {
		throw new Error('User not found')
	}

	const stream = await db.stream.findUnique({
		where: {
			userId: user.id,
		},
	})

	if (!stream) {
		throw new Error('Stream not found')
	}

	return stream
}
