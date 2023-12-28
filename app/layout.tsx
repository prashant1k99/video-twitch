import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Video Twitch',
	description: 'Twitch clone for streaming video games',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={cn(inter.className, 'w-screen h-screen')}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
