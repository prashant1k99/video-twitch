import { db } from './db'
import { getSelf } from './authService'

export const getStream = async () => {
	let userId

	try {
		const self = await getSelf()
		userId = self.id
	} catch (err) {
		userId = null
	}

	let streams = []

	if (userId) {
		streams = await db.stream.findMany({
			where: {
				user: {
					AND: [
						{
							NOT: {
								id: userId,
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
			},
			orderBy: [
				{
					isLive: 'desc',
				},
				{
					updatedAt: 'desc',
				},
			],
			include: {
				user: true,
			},
		})
	} else {
		streams = await db.stream.findMany({
			orderBy: [
				{
					isLive: 'desc',
				},
				{
					updatedAt: 'desc',
				},
			],
			include: {
				user: true,
			},
		})
	}

	return streams
}
