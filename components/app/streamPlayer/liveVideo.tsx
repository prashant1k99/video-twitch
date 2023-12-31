'use client'

import { Participant, Track } from 'livekit-client'
import { useEffect, useRef, useState } from 'react'
import { useTracks } from '@livekit/components-react'
import { FullScreenControl } from './fullScreenControl'
import { useEventListener } from 'usehooks-ts'
import { VolumeControl } from './volumeControl'

interface LiveVideoProps {
	participant: Participant
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [volume, setVolume] = useState(0)

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

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter((track) => track.participant.identity === participant.identity)
		.forEach((track) => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current)
			}
		})

	return (
		<div ref={wrapperRef} className="relative h-full flex">
			<video
				width="100%"
				className="object-cover w-full h-full"
				autoPlay
				playsInline
				ref={videoRef}
			/>
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
