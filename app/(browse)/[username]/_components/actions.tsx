'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { onFollow, onUnfollow } from '@/actions/follow'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
	user: User
	isFollowing: boolean
}

export const Actions = ({ user, isFollowing }: ActionsProps) => {
	const [isPending, startTransition] = useTransition()

	const action = isFollowing ? onUnfollow : onFollow

	const handleFollowActions = () => {
		startTransition(() => {
			action(user.id)
				.then((data) => {
					toast.info(
						`You are ${isFollowing ? 'no longer' : 'now'} following ${
							data?.followee.username
						}`
					)
				})
				.catch((error) => {
					toast.error(error.message)
				})
		})
	}

	return (
		<Button
			disabled={isPending}
			onClick={handleFollowActions}
			variant="primary">
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}
