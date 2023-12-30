'use client'

import { toast } from 'sonner'
import { useTransition } from 'react'
import { updateStream } from '@/actions/streams'
import { Switch } from '@/components/ui/switch'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowOnly'

interface ToggleCardProps {
	field: FieldTypes
	label: string
	value: boolean
}

export const ToggleCard = ({
	label,
	value = false,
	field,
}: ToggleCardProps) => {
	const [isPending, startTransition] = useTransition()

	const onChange = () => {
		startTransition(() => {
			updateStream({ [field]: !value })
				.then(() => toast.success('Chat settings updated!'))
				.catch((error) => toast.error(error.message || 'Something went wrong'))
		})
	}

	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center justify-between">
				<p className="font-semibold shrink-0">{label}</p>
				<div className="space-y-2">
					<Switch
						disabled={isPending}
						isloading={isPending}
						checked={value}
						onCheckedChange={onChange}>
						{value ? 'On' : 'Off'}
					</Switch>
				</div>
			</div>
		</div>
	)
}
