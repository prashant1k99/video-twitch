'use client'

import { ChatVariant, useChatSidebar } from '@/store/useChatSidebar'
import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChatHeader, ChatHeaderSkeleton } from './chatHeader'
import { ChatForm, ChatFormSkeleton } from './chatForm'
import { ChatList, ChatListSkeleton } from './chatList'
import { ChatCommunity } from './chatCommunity'

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

	useEffect(() => {
		console.log('Messages:', messages) // log the messages
	}, [messages])

	const reversedMessages = useMemo(() => {
		return messages.sort((a, b) => b.timestamp - a.timestamp)
	}, [messages])

	const onSubmit = async () => {
		if (!send) return
		console.log(send) // log the send function

		await send(value)
		setValue('')
	}

	const onChange = (value: string) => {
		setValue(value)
	}

	return (
		<div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
			<ChatHeader />
			{variant === ChatVariant.CHAT ? (
				<>
					<ChatList messages={reversedMessages} isHidden={isHidden} />
					<ChatForm
						onSubmit={onSubmit}
						onChange={onChange}
						value={value}
						isHidden={isHidden}
						isFollowing={isFollowing}
						isChatDelayed={isChatDelayed}
						isChatFollowersOnly={isChatFollowersOnly}
					/>
				</>
			) : (
				<ChatCommunity
					viewerName={viewerName}
					hostName={hostName}
					isHidden={isHidden}
				/>
			)}
		</div>
	)
}

export const ChatSkeleton = () => {
	return (
		<div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
			<ChatHeaderSkeleton />
			<ChatListSkeleton />
			<ChatFormSkeleton />
		</div>
	)
}
