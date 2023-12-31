'use client'

import { Participant } from 'livekit-client'
import { useRef } from 'react'

interface LiveVideoProps {
	participant: Participant
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	return (
		<div ref={wrapperRef} className="relative h-full flex">
			<video
				width="100%"
				className="object-cover w-full h-full"
				autoPlay
				playsInline
				ref={videoRef}
			/>
		</div>
	)
}
