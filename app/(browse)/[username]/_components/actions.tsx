'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { onFollow } from '@/actions/follow'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
	user: User
	isFollowing: boolean
}

export const Actions = ({ user, isFollowing }: ActionsProps) => {
	const [isPending, startTransition] = useTransition()

	const handleFollowClick = () => {
		startTransition(() => {
			onFollow(user.id)
				.then((data) => {
					toast.error(`You are now following ${data?.followee.username}`)
				})
				.catch((error) => {
					toast.error(error.message)
				})
		})
	}

	return (
		<Button
			disabled={isFollowing || isPending}
			onClick={handleFollowClick}
			variant="primary">
			Follow
		</Button>
	)
}
