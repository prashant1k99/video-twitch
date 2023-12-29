'use client'

import { useSidebar } from '@/store/useSidebar'
import { User } from '@prisma/client'
import { UserItem, UserItemSkeleton } from './userItem'

interface RecommendedProps {
	data: User[]
}

export const Recommended = ({ data }: RecommendedProps) => {
	const { collapsed } = useSidebar((state) => state)

	console.log(data)

	const showLabel = !collapsed && data.length
	return (
		<div className="">
			{showLabel && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Recommended</p>
				</div>
			)}
			<ul className="space-y-2 px-2">
				{data.map((user) => (
					<li key={user.id} className="">
						<UserItem user={user} isLive={true} />
					</li>
				))}
			</ul>
		</div>
	)
}

export const RecommendedSkeleton = () => {
	return (
		<div className="space-y-2 px-2">
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</div>
	)
}
