'use client'

import { Input } from '@/components/ui/input'
import { CopyButton } from './copyButton'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface KeyCardProps {
	value: string | null
}

export const KeyCard = ({ value }: KeyCardProps) => {
	const [show, setShow] = useState(false)
	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center gap-x-10">
				<p className="font-semibold shrink-0">Stream Key</p>
				<div className="space-y-2 w-full">
					<div className="w-full flex items-center gap-x-2">
						<Input
							disabled
							type={show ? 'text' : 'password'}
							value={value || ''}
							placeholder="Key"
						/>
						<Button
							className="w-16"
							size="sm"
							variant="link"
							onClick={() => setShow(!show)}>
							{show ? 'Hide' : 'Show'}
						</Button>
						<CopyButton value={value} />
					</div>
				</div>
			</div>
		</div>
	)
}
