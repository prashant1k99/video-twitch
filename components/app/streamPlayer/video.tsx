'use client'

import { ConnectionState, Track } from 'livekit-client'
import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from '@livekit/components-react'
import { OfflineVideo } from './offlineVideo'
import { LoadingVideo } from './loadingVideo'
import { LiveVideo } from './liveVideo'
import { Skeleton } from '@/components/ui/skeleton'

interface VideoProps {
	hostName: string
	hostIdentity: string
	thumbnailUrl: string | null
}

export const Video = ({ hostName, hostIdentity, thumbnailUrl }: VideoProps) => {
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostIdentity)
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter((track) => track.participant.identity === hostIdentity)

	let content

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />
	} else if (!participant || tracks.length === 0) {
		content = <LoadingVideo label={connectionState} />
	} else {
		content = (
			<LiveVideo thumbnailUrl={thumbnailUrl} participant={participant} />
		)
	}

	return <div className="aspect-video border-b group relative">{content}</div>
}

export const VideoSkeleton = () => {
	return (
		<div className="aspect-video border-x border-background">
			<Skeleton className="w-full h-full rounded-none" />
		</div>
	)
}
