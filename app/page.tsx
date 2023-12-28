import { UserButton } from '@clerk/nextjs'

export default function Home() {
	return (
		<div className="flex flex-col gap-y-4">
			<UserButton afterSignOutUrl="/" />
			<h1>Home</h1>
		</div>
	)
}
