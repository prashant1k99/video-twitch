'use client'

import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/useCreatorSidebar'

interface ContainerProps {
	children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
	const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
		(state) => state
	)
	const isDesktop = useMediaQuery('(min-width: 1024px)')

	useEffect(() => {
		if (isDesktop) {
			onExpand()
		} else {
			onCollapse()
		}
	}, [isDesktop, onCollapse, onExpand])

	return (
		<div className={cn('flex-1 ml-[70px]', !collapsed && 'lg:ml-60')}>
			{children}
		</div>
	)
}
