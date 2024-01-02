'use server'

import { getSelf } from '@/lib/authService'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const updateUser = async (values: Partial<User>) => {
	try {
		const self = await getSelf()

		const validData = {
			bio: values.bio,
		}

		const user = await db.user.update({
			where: {
				id: self.id,
			},
			data: {
				...validData,
			},
		})

		revalidatePath(`/${self.username}`)
		revalidatePath(`/u/${self.username}`)

		return user
	} catch (err) {
		if (err instanceof Error)
			throw new Error(`Failed to update user: ${err.message}`)
		else throw new Error('Internal server error')
	}
}
