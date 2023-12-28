import { Button } from '@/components/ui/button'

import { currentUser, SignInButton, UserButton } from '@clerk/nextjs'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'

export const Actions = async () => {
	const user = await currentUser()

	return (
		<div className="flex items-center justify-end gap-x-2 ml-2 lg:ml-0">
			{!!user ? (
				<div className="flex items-center gap-x-4">
					<Button
						className="text-muted-foreground hover:text-primary"
						size="sm"
						variant="ghost"
						asChild>
						<Link href={`/u/${user.username}`}>
							<Clapperboard className="h-5 w-5 lg:mr-2" />
							<span className="hidden lg:block">Dashboard</span>
						</Link>
					</Button>
					<UserButton afterSignOutUrl="/" />
				</div>
			) : (
				<SignInButton>
					<Button size="sm" variant="priamry">
						Login
					</Button>
				</SignInButton>
			)}
		</div>
	)
}
