import type { Metadata } from 'next'

import { Logo } from './_components/logo'

export const metadata: Metadata = {
	title: 'Auth | GameHub',
	description: 'Twitch clone for streaming video games',
}

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col w-full h-full justify-center items-center space-y-6">
			<Logo />
			{children}
		</div>
	)
}
