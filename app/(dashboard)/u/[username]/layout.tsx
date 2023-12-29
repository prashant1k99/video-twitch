import { getUserByUsername } from '@/lib/userService'
import { notFound, redirect } from 'next/navigation'
import { Navbar } from './_components/navbar'

interface CreatorLayoutProps {
	params: {
		username: string
	}
	children: React.ReactNode
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
	const self = await getUserByUsername(params.username)

	if (!self) {
		redirect('/')
	}

	return (
		<>
			<Navbar />
			<div className="flex h-full pt-20">{children}</div>
		</>
	)
}

export default CreatorLayout
