'use client'

import {
	useParticipants,
	useRemoteParticipant,
} from '@livekit/components-react'
import { UserAvatar } from '../userAvatar'
import { VerifiedMark } from './verifiedMark'
import { UserIcon } from 'lucide-react'

interface HeaderProps {
	imageUrl: string
	hostName: string
	hostIdentity: string
	viewerIdentity: string
	isFollowing: boolean
	name: string
}

export const Header = ({
	imageUrl,
	hostName,
	hostIdentity,
	viewerIdentity,
	isFollowing,
	name,
}: HeaderProps) => {
	const participants = useParticipants()
	const host = useRemoteParticipant(hostIdentity)

	const isLive = !!host
	const participantCount = participants.length - 1

	const hostAsViewer = `${hostIdentity}[host]`
	const isHost = viewerIdentity === hostAsViewer

	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
			<div className="flex items-center gap-x-3">
				<UserAvatar
					imageUrl={imageUrl}
					username={name}
					size="lg"
					isLive={isLive}
					showBadge
				/>
				<div className="space-y-1">
					<div className="flex items-center gap-x-2">
						<h2 className="text-lg font-semibold">{hostName}</h2>
						<VerifiedMark />
					</div>
					<p className="text-sm font-semibold">{name}</p>
					{isLive ? (
						<div className="font-semibold flex gap-x-1 items-center text-sm text-rose-500">
							<UserIcon className="h-4 w-4" />
							<p className="">
								{participantCount}{' '}
								{participantCount === 1 ? 'viewer' : 'viewers'}
							</p>
						</div>
					) : (
						<p className="text-muted-foreground text-sm font-semibold">
							Offline
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
