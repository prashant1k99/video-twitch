import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const getRecommended = async () => {
	const self = await getSelf()

	const users = self
		? await db.user.findMany({
				where: {
					id: {
						not: self.id,
					},
				},
				take: 10, // Limit the result to 10
		  })
		: await db.user.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				take: 10, // Limit the result to 10
		  })

	return users
}
