'use client'

import { useParticipants } from '@livekit/components-react'
import { useDebounce } from 'usehooks-ts'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommunityItem } from './communityItem'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

interface ChatCommunityProps {
	viewerName: string
	hostName: string
	isHidden: boolean
}

export const ChatCommunity = ({
	viewerName,
	hostName,
	isHidden,
}: ChatCommunityProps) => {
	const [value, setValue] = useState<string>('')
	const debouncedValue = useDebounce<string>(value, 500)

	const participants = useParticipants()

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const filteredParticipants = useMemo(() => {
		const dedupedParticipants = participants.reduce((acc, participant) => {
			const hostAsViewer = `${participant.identity}[host]`
			if (!acc.some((p) => p.identity === hostAsViewer)) {
				acc.push(participant)
			}
			return acc
		}, [] as (RemoteParticipant | LocalParticipant)[])
		return dedupedParticipants.filter((participant) => {
			return participant.name
				?.toLowerCase()
				.includes(debouncedValue.toLowerCase())
		})
	}, [debouncedValue, participants])

	if (isHidden) {
		return (
			<div className="flex flex-1 items-center justify-center">
				<p className="text-sm text-muted-foreground">Community is disabled</p>
			</div>
		)
	}

	return (
		<div className="p-4">
			<Input
				onChange={onChange}
				value={value}
				placeholder="Search community"
				className="border-white/10"
			/>
			<ScrollArea className="gap-y-2 mt-4">
				<p className="text-center text-sm text-muted-foreground hidden last:block p-2">
					No results
				</p>
				{filteredParticipants.map((participant) => {
					return (
						<CommunityItem
							key={participant.identity}
							hostName={hostName}
							viewerName={viewerName}
							participentIdentity={participant.identity}
						/>
					)
				})}
			</ScrollArea>
		</div>
	)
}
