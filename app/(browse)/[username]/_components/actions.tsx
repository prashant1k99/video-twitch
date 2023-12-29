'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { onFollow, onUnfollow } from '@/actions/follow'
import { onBlock, onUnBlock } from '@/actions/block'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
	user: User
	isFollowing: boolean
	isBlockedByThisUser: boolean
}

export const Actions = ({
	user,
	isFollowing,
	isBlockedByThisUser,
}: ActionsProps) => {
	const [isPending, startTransition] = useTransition()

	const handleFollowActions = () => {
		const action = isFollowing ? onUnfollow : onFollow
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

	const handleBlockActions = () => {
		const action = isBlockedByThisUser ? onUnBlock : onBlock
		startTransition(() => {
			action(user.id)
				.then((data) => {
					toast.info(
						`You have ${isBlockedByThisUser ? 'unblocked' : 'blocked'} user: ${
							data?.blockee.username
						}`
					)
				})
				.catch((error) => {
					toast.error(error.message)
				})
		})
	}

	return (
		<div className="">
			<Button
				disabled={isPending}
				onClick={handleFollowActions}
				variant="primary">
				{isFollowing ? 'Unfollow' : 'Follow'}
			</Button>

			<Button
				disabled={isPending}
				onClick={handleBlockActions}
				variant={isBlockedByThisUser ? 'outline' : 'destructive'}>
				{isBlockedByThisUser ? 'UnBlock User' : 'Block User'}
			</Button>
		</div>
	)
}
