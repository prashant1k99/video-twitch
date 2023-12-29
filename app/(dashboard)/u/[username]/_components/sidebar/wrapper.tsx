'use client'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/useCreatorSidebar'
// import { ToggleSkeleton } from './toggle'
import { useIsClient } from 'usehooks-ts'
import { ToggleSkeleton } from './toggle'

interface WrapperProps {
	children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
	const isClient = useIsClient()

	const { collapsed } = useCreatorSidebar((state) => state)

	// to prevent flickering on client side
	if (!isClient)
		return (
			<aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
				<ToggleSkeleton />
			</aside>
		)

	return (
		<aside
			className={cn(
				'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50',
				collapsed && 'lg:w-[70px]'
			)}>
			{children}
		</aside>
	)
}
