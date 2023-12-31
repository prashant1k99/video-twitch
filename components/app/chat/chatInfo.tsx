import { Hint } from '../hint'
import { Info } from 'lucide-react'
import { useMemo } from 'react'

interface ChatInfoProps {
	isDelayed: boolean
	isFollowersOnly: boolean
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
	const hint = useMemo(() => {
		if (isFollowersOnly && !isDelayed) {
			return 'Only followers can chat'
		}

		if (isDelayed && !isFollowersOnly) {
			return 'Messages are delayed by 3 seconds'
		}

		if (isDelayed && isFollowersOnly) {
			return 'Only followers can chat. Messages are delayed by 3 seconds'
		}

		return ''
	}, [isDelayed, isFollowersOnly])

	const label = useMemo(() => {
		if (isFollowersOnly && !isDelayed) {
			return 'Followers Only'
		}

		if (isDelayed && !isFollowersOnly) {
			return 'Slow Mode'
		}

		if (isDelayed && isFollowersOnly) {
			return 'Followers Only & Slow Mode'
		}

		return ''
	}, [isDelayed, isFollowersOnly])

	if (!isFollowersOnly && !isDelayed) {
		return null
	}

	return (
		<div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
			<Hint side="top" label={hint} asChild>
				<Info className="w-4 h-4" />
			</Hint>
			<p className="text-xs font-semibold">{label}</p>
		</div>
	)
}
