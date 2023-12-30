import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'

export const getSelf = async () => {
	const user = await currentUser()
	if (!user || !user.username) throw new Error('Authentication required')

	const self = await db.user.findUnique({
		where: {
			id: user.id,
		},
	})

	if (!self) {
		throw new Error('User not found')
	}

	return self
}

export const getSelfByUsername = async (username: string) => {
	const self = await currentUser()
	if (!self || !self.username) throw new Error('Authentication required')

	const user = await db.user.findUnique({
		where: {
			username,
		},
	})

	if (!user) {
		throw new Error('User not found')
	}

	return user
}
