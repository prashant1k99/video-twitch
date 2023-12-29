import { cn } from '@/lib/utils'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from '../ui/tooltip'

interface HintProps {
	label: string
	hide?: boolean
	children: React.ReactNode
	asChild?: boolean
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
}

export const Hint = ({
	label,
	children,
	asChild,
	side,
	align,
	hide,
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className={cn('text-black bg-white', hide && 'hidden')}
					side={side}
					align={align}>
					<p className="font-semibold">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
