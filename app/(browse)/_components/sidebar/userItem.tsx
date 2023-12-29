'use client'

import { User } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/useSidebar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserAvatar } from '@/components/app/userAvatar'
import { LiveBadge } from '@/components/app/liveBadge'
import { Skeleton } from '@/components/ui/skeleton'

interface UserItemProps {
	user: User
	isLive?: boolean
}

export const UserItem = ({ user, isLive }: UserItemProps) => {
	const pathname = usePathname()

	const { collapsed } = useSidebar((state) => state)

	const href = `/${user.username}`
	const isActive = pathname === href
	return (
		<Button
			className={cn(
				'w-full h-12',
				collapsed ? 'justify-center' : 'justify-start',
				isActive && 'bg-accent'
			)}
			variant="ghost"
			asChild>
			<Link href={href}>
				<div
					className={cn(
						'flex items-center w-full gap-x-4',
						collapsed && 'justify-center bg-transparent'
					)}>
					<UserAvatar size="sm" user={user} isLive={isLive} showBadge={false} />
					{!collapsed && (
						<p className="truncate text-sm font-medium">{user.username}</p>
					)}
					{isLive && !collapsed && <LiveBadge className="ml-auto" />}
				</div>
			</Link>
		</Button>
	)
}

export const UserItemSkeleton = () => {
	return (
		<li className="flex items-center w-full gap-x-4 px-3 py-2">
			<Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
			<div className="flex-1">
				<Skeleton className="h-6" />
			</div>
		</li>
	)
}
