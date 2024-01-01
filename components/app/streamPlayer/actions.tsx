'use client'

import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
	hostIdentity: string
	isFollowing: boolean
	isHost: boolean
}

export const Actions = ({
	hostIdentity,
	isFollowing,
	isHost,
}: ActionsProps) => {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const { userId } = useAuth()

	const handleFollow = () => {
		if (!userId) {
			return router.push('/sign-in')
		}

		if (isHost) {
			return
		}

		const action = isFollowing ? onUnfollow : onFollow
		const actionText = isFollowing ? 'unfollowed' : 'followed'
		startTransition(() => {
			action(hostIdentity)
				.then((data) => {
					toast.success(
						`You ${actionText.toLowerCase()} ${data?.followee.username}`
					)
				})
				.catch((err) => {
					toast.error(err.message)
				})
		})
	}

	return (
		<Button
			onClick={handleFollow}
			disabled={isPending || isHost}
			variant="primary"
			size="sm"
			className="w-full lg:w-auto">
			<HeartIcon
				className={cn('w-4 h-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}
			/>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}

export const ActionsSkeleton = () => {
	return <Skeleton className="h-10 w-full lg:w-24" />
}
