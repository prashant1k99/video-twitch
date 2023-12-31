'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatInfo } from './chatInfo'

interface ChatFormProps {
	onSubmit: (value: string) => void
	value: string
	onChange: (value: string) => void
	isHidden: boolean
	isFollowing: boolean
	isChatDelayed: boolean
	isChatFollowersOnly: boolean
}

export const ChatForm = ({
	onChange,
	onSubmit,
	value,
	isHidden,
	isFollowing,
	isChatDelayed,
	isChatFollowersOnly,
}: ChatFormProps) => {
	const [isDelayed, setIsDelayBlocked] = useState<boolean>(false)
	const isForllowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing

	const isDisabled = isHidden || isForllowersOnlyAndNotFollowing || isDelayed

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (!value) return

		if (isChatDelayed) {
			setIsDelayBlocked(true)
			setTimeout(() => {
				setIsDelayBlocked(false)
				onSubmit(value)
			}, 3000)
			return
		}

		onSubmit(value)
	}

	if (isHidden) {
		return null
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center gap-y-4 p-2">
			<div className="w-full">
				<ChatInfo
					isDelayed={isChatDelayed}
					isFollowersOnly={isChatFollowersOnly}
				/>
				<Input
					onChange={(e) => onChange(e.target.value)}
					value={value}
					disabled={isDisabled}
					placeholder="Send a message"
					className={cn(
						'border-white/10',
						isChatFollowersOnly && 'rounded-t-none border-t-0'
					)}
				/>
			</div>
			<div className="ml-auto">
				<Button
					type="submit"
					variant="primary"
					size="sm"
					disabled={isDisabled}
					// className="bg-primary text-white hover:bg-primary/90"
				>
					Chat
				</Button>
			</div>
		</form>
	)
}

export const ChatFormSkeleton = () => {
	return (
		<div className="flex flex-col items-center gap-y-4 p-3">
			<Skeleton className="w-full h-10" />
			<div className="flex items-center gap-x-2 ml-auto">
				<Skeleton className="w-7 h-7" />
				<Skeleton className="w-12 h-7" />
			</div>
		</div>
	)
}
