'use client'

import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { NavItem } from './navItem'

const Navigation = () => {
	const pathname = usePathname()
	const { user } = useUser()

	const routes = [
		{
			label: 'Stream',
			href: `/u/${user?.username}`,
			icon: Fullscreen,
		},
		{
			label: 'Keys',
			href: `/u/${user?.username}/keys`,
			icon: KeyRound,
		},
		{
			label: 'Chat',
			href: `/u/${user?.username}/chat`,
			icon: MessageSquare,
		},
		{
			label: 'Community',
			href: `/u/${user?.username}/community`,
			icon: Users,
		},
	]

	return (
		<ul className="">
			{routes.map((route) => {
				const isActive = pathname === route.href
				return <NavItem key={route.label} {...route} isActive={isActive} />
			})}
		</ul>
	)
}

export default Navigation
