'use client'

import { useSidebar } from '@/store/useSidebar'
import { Follow, User } from '@prisma/client'
import { UserItem, UserItemSkeleton } from './userItem'
import { Skeleton } from '@/components/ui/skeleton'

interface FollowingProps {
	data: (Follow & {
		followee: User & {
			stream: {
				isLive: boolean
			} | null
		}
	})[]
}

export const Following = ({ data }: FollowingProps) => {
	const { collapsed } = useSidebar((state) => state)

	if (!data.length) return null

	return (
		<div className="">
			{!collapsed && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Following</p>
				</div>
			)}
			<ul className="space-y-2 px-2">
				{data.map(({ followee }) => (
					<li key={followee.id} className="">
						<UserItem user={followee} isLive={followee.stream?.isLive} />
					</li>
				))}
			</ul>
		</div>
	)
}

export const FollowingSkeleton = () => {
	return (
		<div className="">
			<Skeleton className="ml-6 h-4 mb-4 w-[100px] hidden lg:block" />
			<div className="space-y-2 px-2">
				{[...Array(3)].map((_, i) => (
					<UserItemSkeleton key={i} />
				))}
			</div>
		</div>
	)
}
