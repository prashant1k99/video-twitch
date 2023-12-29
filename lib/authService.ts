import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'

export const getSelf = async () => {
	const user = await currentUser()
	if (!user || !user.username) return null

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
