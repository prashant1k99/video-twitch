'use client'

import { useChatSidebar } from '@/store/useChatSidebar'
import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChatHeader } from './chatHeader'

interface ChatProps {
	viewerName: string
	hostName: string
	hostIdentity: string
	isFollowing: boolean
	isChatEnabled: boolean
	isChatDelayed: boolean
	isChatFollowersOnly: boolean
}

export const Chat = ({
	viewerName,
	hostIdentity,
	hostName,
	isFollowing,
	isChatDelayed,
	isChatEnabled,
	isChatFollowersOnly,
}: ChatProps) => {
	const matches = useMediaQuery('(min-width: 1024px)')
	const { variant, onExpand } = useChatSidebar((state) => state)
	const connectionState = useConnectionState()
	const remoteParticipant = useRemoteParticipant(hostIdentity)

	const isOnline =
		connectionState === ConnectionState.Connected && remoteParticipant

	const isHidden = !isChatEnabled || !isOnline

	const [value, setValue] = useState<string>('')
	const { chatMessages: messages, send } = useChat()

	useEffect(() => {
		if (matches) {
			onExpand()
		}
	}, [matches, onExpand])

	const reversedMessages = useMemo(() => {
		return messages.sort((a, b) => b.timestamp - a.timestamp)
	}, [messages])

	const onSubmit = () => {
		if (!send) return

		send(value)
		setValue('')
	}

	const onChange = (value: string) => {
		setValue(value)
	}

	return (
		<div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
			<ChatHeader />
		</div>
	)
}
