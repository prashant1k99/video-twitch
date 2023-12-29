'use client'

import { Hint } from '@/components/app/hint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSidebar } from '@/store/useSidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

export const Toggle = () => {
	const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)

	const label = collapsed ? 'Expand' : 'Collapse'
	const action = collapsed ? onExpand : onCollapse

	return (
		<>
			{!collapsed ? (
				<div className="p-3 pl-6 mb-2 flex items-center w-full">
					<p className="font-semibold text-primary">For you</p>
					<Hint label={label} side="right" align="center" asChild>
						<Button
							className="h-auto p-2 ml-auto"
							variant="ghost"
							onClick={action}>
							<ArrowLeftFromLine className="h-4 w-4" />
						</Button>
					</Hint>
				</div>
			) : (
				<div className="hidden lg:flex w-full justify-center items-center pt-4 mb-4">
					<Hint label={label} side="right" align="center" asChild>
						<Button className="h-auto p-2" variant="ghost" onClick={action}>
							<ArrowRightFromLine className="h-4 w-4" />
						</Button>
					</Hint>
				</div>
			)}
		</>
	)
}

export const ToggleSkeleton = () => {
	return (
		<div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
			<Skeleton className="h-6 w-[100px]" />
			<Skeleton className="h-6 w-6" />
		</div>
	)
}
