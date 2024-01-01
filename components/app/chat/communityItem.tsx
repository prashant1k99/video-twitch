'use client'

import { cn, stringToColor } from '@/lib/utils'
import { Hint } from '../hint'
import { Button } from '@/components/ui/button'
import { MinusCircle } from 'lucide-react'
import { useTransition } from 'react'
import { onBlock } from '@/actions/block'
import { toast } from 'sonner'

interface CommunityItemProps {
	hostName: string
	viewerName: string
	participentName?: string
	participentIdentity: string
}

export const CommunityItem = ({
	hostName,
	viewerName,
	participentIdentity,
	participentName,
}: CommunityItemProps) => {
	const [isPending, startTransition] = useTransition()
	const color = stringToColor(participentName || 'unknown')
	const isSelf = participentIdentity === viewerName
	const isHost = participentIdentity === hostName

	const handleBlock = () => {
		if (!participentName || isSelf || !isHost) return

		startTransition(() => {
			onBlock(participentIdentity)
				.then(() => {
					toast.success(`Blocked ${participentName}`)
				})
				.catch((err) => {
					toast.error(err.message)
				})
		})
	}

	return (
		<div
			className={cn(
				'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
				isPending && 'opacity-50 pointer-events-none'
			)}>
			<p style={{ color }}>{participentName || participentIdentity}</p>
			{isHost && !isSelf && (
				<Hint side="left" label="Block" asChild>
					<Button
						variant="ghost"
						disabled={isPending}
						onClick={handleBlock}
						className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition">
						<MinusCircle className="w-4 h-4 text-muted-foreground" />
					</Button>
				</Hint>
			)}
		</div>
	)
}
