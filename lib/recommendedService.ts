import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const getRecommended = async (page = 1, pageSize = 10) => {
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
					AND: [
						{
							NOT: {
								id: userId,
							},
						},
						{
							NOT: {
								followedBy: {
									some: {
										followerId: userId,
									},
								},
							},
						},
						{
							NOT: {
								blocked: {
									some: {
										blockeeId: userId,
									},
								},
							},
						},
					],
				},
				take: pageSize,
				skip: (page - 1) * pageSize,
		  })
		: // Find all users
		  await db.user.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				take: pageSize,
				skip: (page - 1) * pageSize,
		  })

	return users
}
