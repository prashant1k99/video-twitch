import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const font = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const Logo = () => {
	return (
		<Link href="/">
			<div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
				<div className="bg-white rounded-full p-1">
					<Image src="/spooky.svg" alt="GameHub Logo" width={32} height={32} />
				</div>
				<div className={font.className}>
					<p className="text-lg font-semibold">GameHub</p>
					<p className="text-xs text-muted-foreground">Let&apos;s Play</p>
				</div>
			</div>
		</Link>
		// <div className="flex items-center space-y-4 select-none">
		// 	<div className="bg-white rounded-full p-1">
		// 		<Image src="/spooky.svg" alt="GameHub Logo" width={32} height={32} />
		// 	</div>
		// </div>
	)
}
