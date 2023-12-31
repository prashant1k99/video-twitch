'use client'

import { ChatVariant, useChatSidebar } from '@/store/useChatSidebar'
import { MessageSquare, Users } from 'lucide-react'
import { Hint } from '../hint'
import { Button } from '@/components/ui/button'

export const VariantToggle = () => {
	const { variant, onChangeVariant } = useChatSidebar((state) => state)

	const isChat = variant == ChatVariant.CHAT

	const Icon = isChat ? Users : MessageSquare

	const onToggle = () => {
		const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
		onChangeVariant(newVariant)
	}

	const label = isChat ? 'Switch to Community' : 'Switch to Chat'

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
