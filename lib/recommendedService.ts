import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const getRecommended = async () => {
	let userId: string | null = null
	try {
		const self = await getSelf()
		userId = self?.id as string
	} catch (err) {
		userId = null
	}

	const users = userId
		? // Find all users except the current user
		  await db.user.findMany({
				where: {
					id: {
						not: userId,
					},
				},
				take: 10, // Limit the result to 10
		  })
		: // Find all users
		  await db.user.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				take: 10,
		  })

	return users
}
