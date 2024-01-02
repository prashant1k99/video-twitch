'use client'

import { AboutModal } from './aboutModal'
import { VerifiedMark } from './verifiedMark'
import { Button } from '@/components/ui/button'

interface AboutCardProps {
	hostName: string
	hostIdentity: string
	viewerIdentity: string
	bio: string | null
	followerCount: number
}

export const AboutCard = ({
	hostIdentity,
	hostName,
	viewerIdentity,
	bio,
	followerCount,
}: AboutCardProps) => {
	const hostAsViewer = `${hostIdentity}[host]`
	const isHost = viewerIdentity === hostAsViewer

	const followerLabel = followerCount === 1 ? 'follower' : 'followers'

	return (
		<div className="px-4">
			<div className="group rounded-xl bg-background p-4 lg:p-6 flex flex-col gap-y-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-2 font-semibold text-lg lg:text-xl">
						About {hostName}
						<VerifiedMark />
					</div>
					{isHost && <AboutModal initialBio={bio} />}
				</div>
				<div className="text-sm text-muted-foreground">
					<span>{followerCount}</span>&nbsp;
					{followerLabel}
				</div>
				<p className="text-sm">{bio || 'No bio'}</p>
			</div>
		</div>
	)
}
