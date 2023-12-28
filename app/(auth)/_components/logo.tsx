import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const Logo = () => {
	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="bg-white rounded-full p-1">
				<Image src="/spooky.svg" alt="GameHub Logo" width={80} height={80} />
			</div>
			<div className={cn('flex items-center gap-x-2', font.className)}>
				<p className="text-xl font-bold ml-4">GameHub</p>
				<p className="text-sm text-muted-foreground">Let&apos;s Play</p>
			</div>
		</div>
	)
}
