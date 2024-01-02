'use server'

import { revalidatePath } from 'next/cache'
import { Stream } from '@prisma/client'

import { db } from '@/lib/db'
import { getSelf } from '@/lib/authService'

export const updateStream = async (values: Partial<Stream>) => {
	try {
		const self = await getSelf()
		if (!self) throw new Error('Unauthorized')

		const stream = await db.stream.findUnique({
			where: {
				userId: self.id,
			},
		})

		if (!stream) throw new Error('Stream not found')

		const validData = {
			name: values.name,
			thumbnailUrl: values.thumbnailUrl,
			isChatEnabled: values.isChatEnabled,
			isChatFollowersOnly: values.isChatFollowersOnly,
			isChatDelayed: values.isChatDelayed,
		}

		console.log(validData)

		const updatedStream = await db.stream.update({
			where: {
				userId: self.id,
			},
			data: validData,
		})

		revalidatePath(`/${self.username}`)
		revalidatePath(`/u/${self.username}`)
		revalidatePath(`/u/${self.username}/chat`)

		return updatedStream
	} catch (err) {
		if (err instanceof Error)
			throw new Error(`Failed to update stream: ${err.message}`)
		else throw new Error('Internal server error')
	}
}
