'use client'

import { useChatSidebar } from '@/store/useChatSidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { Hint } from '../hint'
import { Button } from '@/components/ui/button'

export const ChatToggle = () => {
	const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state)

	const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine

	const onToggle = () => {
		if (collapsed) {
			onExpand()
		} else {
			onCollapse()
		}
	}

	const label = collapsed ? 'Expand Chat' : 'Collapse Chat'

	return (
		<Hint side="left" label={label} asChild>
			<Button
				onClick={onToggle}
				className="h-auto p-2 text-white hover:bg-white/10 hover:text-primary bg-transparent rounded-lg">
				<Icon className="w-4 h-4" />
			</Button>
		</Hint>
	)
}
