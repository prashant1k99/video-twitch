'use client'

import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps {
	value?: string | null
}

export const CopyButton = ({ value }: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false)

	const copyToClipboard = async () => {
		if (!value) return

		setIsCopied(true)
		navigator.clipboard.writeText(value || '')
		setTimeout(() => setIsCopied(false), 2000)
	}

	const Icon = isCopied ? CheckCheck : Copy

	return (
		<Button
			disabled={isCopied || !value}
			onClick={copyToClipboard}
			className=""
			variant="ghost"
			size="sm">
			<Icon className="h-4 w-4" />
		</Button>
	)
}
