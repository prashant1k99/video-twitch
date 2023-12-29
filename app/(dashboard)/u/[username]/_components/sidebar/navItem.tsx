'use client'

import { Hint } from '@/components/app/hint'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/useCreatorSidebar'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface NavItemProps {
	label: string
	icon: LucideIcon
	href: string
	isActive?: boolean
}

export const NavItem = ({
	label,
	icon: Icon,
	href,
	isActive,
}: NavItemProps) => {
	const { collapsed } = useCreatorSidebar((state) => state)
	return (
		<Hint hide={!collapsed} label={label} side="right" align="center" asChild>
			<Button
				className={cn(
					'w-full h-12 cursor-pointer',
					collapsed ? 'justify-center' : 'justify-start',
					isActive && 'bg-accent'
				)}
				variant="ghost"
				asChild>
				<Link href={href}>
					<div className="flex items-center gap-x-5">
						<Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
						{!collapsed && (
							<span className="truncate text-sm font-medium">{label}</span>
						)}
					</div>
				</Link>
			</Button>
		</Hint>
	)
}
