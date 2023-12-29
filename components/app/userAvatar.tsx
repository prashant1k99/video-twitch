import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@prisma/client'
import { LiveBadge } from './liveBadge'
import { Skeleton } from '../ui/skeleton'

const AvatarVariants = cva('', {
	variants: {
		size: {
			default: 'h-10 w-10',
			sm: 'h-8 w-8',
			lg: 'h-12 w-12',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

export interface UserAvatarProps extends VariantProps<typeof AvatarVariants> {
	user: User
	showBadge?: boolean
	isLive?: boolean
}

export const UserAvatar = ({
	user,
	isLive,
	showBadge,
	size,
}: UserAvatarProps) => {
	const canShowBadge = isLive && showBadge

	return (
		<div className="relative">
			<Avatar
				className={cn(
					AvatarVariants({ size }),
					isLive &&
						'ring-2 ring-offset-2 ring-offset-background ring-rose-500 border-background'
				)}>
				<AvatarImage src={user.imageUrl} className="object-cover" />
				<AvatarFallback>
					<AvatarImage
						src="https://avatars.githubusercontent.com/u/11742736?v=4"
						className="object-cover"
					/>
				</AvatarFallback>
			</Avatar>
			{canShowBadge && (
				<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
					<LiveBadge />
				</div>
			)}
		</div>
	)
}

interface UserAvatarSkeletopProps extends VariantProps<typeof AvatarVariants> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletopProps) => {
	return <Skeleton className={cn('rounded-full', AvatarVariants({ size }))} />
}
