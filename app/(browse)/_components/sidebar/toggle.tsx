'use client'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/useSidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

export const Toggle = () => {
	const { collapsed, onCollapse, onExpand } = useSidebar()

	const label = collapsed ? 'Expand' : 'Collapse'
	const action = collapsed ? onExpand : onCollapse

	return (
		<>
			{!collapsed ? (
				<div className="p-3 pl-6 mb-2 flex items-center w-full">
					<p className="font-semibold text-primary">For you</p>
					<Button
						className="h-auto p-2 ml-auto"
						variant="ghost"
						onClick={action}>
						<ArrowLeftFromLine className="h-4 w-4" />
					</Button>
				</div>
			) : (
				<div className="hidden lg:flex w-full justify-center items-center pt-4 mb-4">
					<Button className="h-auto p-2" variant="ghost" onClick={action}>
						<ArrowRightFromLine className="h-4 w-4" />
					</Button>
				</div>
			)}
		</>
	)
}
