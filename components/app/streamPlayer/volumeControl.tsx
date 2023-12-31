'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { Hint } from '../hint'
import { Slider } from '@/components/ui/slider'

interface VolumeControlProps {
	volume: number
	onChange: (volume: number) => void
	onToggleMute: () => void
}

export const VolumeControl = ({
	onToggleMute,
	onChange,
	volume,
}: VolumeControlProps) => {
	const isMuted = volume === 0
	const isAboveHalf = volume > 50

	let Icon = Volume1
	if (isMuted) {
		Icon = VolumeX
	} else if (isAboveHalf) {
		Icon = Volume2
	}

	const label = isMuted ? 'Unmute' : 'Mute'

	const handleChange = (value: number[]) => {
		onChange(value[0])
	}

	return (
		<div className="flex items-center gap-2">
			<Hint label={label} asChild>
				<button
					onClick={onToggleMute}
					className="text-white hover:bg-white/10 p-1.5 rounded-lg">
					<Icon className="w-6 h-6" />
				</button>
			</Hint>
			<Slider
				className="w-[8rem] cursor-pointer"
				min={0}
				max={100}
				value={[volume]}
				onValueChange={handleChange}
			/>
		</div>
	)
}
