'use client'

import { useSidebar } from '@/store/useSidebar'
import { User } from '@prisma/client'
import { UserItem, UserItemSkeleton } from './userItem'
import { Skeleton } from '@/components/ui/skeleton'

interface RecommendedProps {
	data: (User & {
		stream: {
			isLive: boolean
		} | null
	})[]
}

export const Recommended = ({ data }: RecommendedProps) => {
	const { collapsed } = useSidebar((state) => state)

	console.log(data)

	const showLabel = !collapsed && data.length > 0
	return (
		<div className="">
			{showLabel && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Recommended</p>
				</div>
			)}
			<ul className="space-y-2 px-2">
				{data.map((user) => {
					console.log(`${user.username} isLive: `, user.stream?.isLive)
					return (
						<li key={user.id} className="">
							<UserItem user={user} isLive={user.stream?.isLive} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export const RecommendedSkeleton = () => {
	return (
		<div>
			<Skeleton className="ml-6 h-4 mb-4 w-[100px] hidden lg:block" />
			<div className="space-y-2 px-2">
				{[...Array(3)].map((_, i) => (
					<UserItemSkeleton key={i} />
				))}
			</div>
		</div>
	)
}
