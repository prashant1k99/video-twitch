'use client'

import { Participant, Track } from 'livekit-client'
import { useEffect, useRef, useState } from 'react'
import { useTracks } from '@livekit/components-react'
import { FullScreenControl } from './fullScreenControl'
import { useEventListener } from 'usehooks-ts'
import { VolumeControl } from './volumeControl'
import Image from 'next/image'

interface LiveVideoProps {
	participant: Participant
	thumbnailUrl: string | null
}

export const LiveVideo = ({ participant, thumbnailUrl }: LiveVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [volume, setVolume] = useState(0)
	// const [hasVideoTrack, setHasVideoTrack] = useState(false)

	const toggleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen()
			setIsFullScreen(false)
		} else {
			wrapperRef.current?.requestFullscreen()
			setIsFullScreen(true)
		}
	}

	const handleFullScreenChange = () => {
		const isVideoFullScreen = document.fullscreenElement === wrapperRef.current
		setIsFullScreen(isVideoFullScreen)
	}

	useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef)

	const onVolumeChange = (volume: number) => {
		setVolume(+volume)
		if (videoRef.current) {
			videoRef.current.muted = volume === 0
			videoRef.current.volume = +volume / 100
		}
	}

	const onToggleMute = () => {
		if (volume === 0) {
			onVolumeChange(50)
		} else {
			onVolumeChange(0)
		}
	}

	useEffect(() => {
		onVolumeChange(25)
	}, [])

	const videoTracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter((track) => track.participant.identity === participant.identity)

	useEffect(() => {
		videoTracks.forEach((track) => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current)
				// setHasVideoTrack(true)
			}
		})
	}, [videoTracks])

	const hasVideoTrack = videoTracks.some(
		(track) => track.publication.track?.kind === 'video'
	)

	return (
		<div ref={wrapperRef} className="relative h-full flex w-full">
			{!hasVideoTrack && thumbnailUrl ? (
				<Image
					src={thumbnailUrl}
					alt="Thumbnail"
					objectFit="cover"
					width={100}
					height={100}
				/>
			) : (
				<video
					width="100%"
					className="object-cover w-full h-full"
					autoPlay
					playsInline
					ref={videoRef}
				/>
			)}
			<div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
				<div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
					<VolumeControl
						onChange={onVolumeChange}
						volume={volume}
						onToggleMute={onToggleMute}
					/>
					<FullScreenControl isFullScreen={false} onToggle={toggleFullScreen} />
				</div>
			</div>
		</div>
	)
}
