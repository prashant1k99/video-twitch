import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Auth | Video Twitch',
	description: 'Twitch clone for streaming video games',
}

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex w-full h-full justify-center items-center">
			{children}
		</div>
	)
}
