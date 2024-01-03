import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const getSearch = async (query?: string) => {
	let userId

	try {
		const self = await getSelf()
		userId = self.id
	} catch {
		userId = null
	}

	let streams = []

	if (userId) {
		streams = await db.stream.findMany({
			where: {
				user: {
					NOT: {
						blocked: {
							some: {
								blockeeId: userId,
							},
						},
					},
				},
				OR: [
					{
						name: {
							contains: query,
						},
					},
					{
						user: {
							username: {
								contains: query,
							},
						},
					},
				],
			},
			select: {
				user: true,
				id: true,
				name: true,
				isLive: true,
				thumbnailUrl: true,
				updatedAt: true,
			},
			orderBy: [
				{
					isLive: 'desc',
				},
				{
					updatedAt: 'desc',
				},
			],
		})
	} else {
		streams = await db.stream.findMany({
			where: {
				OR: [
					{
						name: {
							contains: query,
						},
					},
					{
						user: {
							username: {
								contains: query,
							},
						},
					},
				],
			},
			select: {
				user: true,
				id: true,
				name: true,
				isLive: true,
				thumbnailUrl: true,
				updatedAt: true,
			},
			orderBy: [
				{
					isLive: 'desc',
				},
				{
					updatedAt: 'desc',
				},
			],
		})
	}

	return streams
}
