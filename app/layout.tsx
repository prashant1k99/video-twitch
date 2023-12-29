import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme/provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'GameHub',
	description: 'Twitch clone for streaming video games',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang="en">
				<body className={cn(inter.className, 'w-screen h-screen')}>
					<ThemeProvider
						attribute="class"
						forcedTheme="dark"
						storageKey="gameHub">
						<Toaster theme="light" />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
