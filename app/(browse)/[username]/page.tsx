import { isFollowingUser } from '@/lib/followService'
import { getUserByUsername } from '@/lib/userService'
import { notFound } from 'next/navigation'
import { Actions } from './_components/actions'
import { isBlocked, isBlockedByUser } from '@/lib/blockService'

interface UserPageProps {
	params: {
		username: string
	}
}

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUserByUsername(params.username)

	if (!user) {
		return notFound()
	}

	const isFollowing = await isFollowingUser(user.id)
	const isBlocking = await isBlockedByUser(user.id)

	if (isBlocking) {
		return notFound()
	}

	const isBlockedByThisUser = await isBlocked(user.id)

	return (
		<div className="flex flex-col gap-y-4">
			<p>username: {user.username}</p>
			<p>userId: {user.id}</p>
			<p>isFollowing: {isFollowing ? 'true' : 'false'}</p>
			<Actions
				user={user}
				isFollowing={isFollowing}
				isBlockedByThisUser={isBlockedByThisUser}
			/>
		</div>
	)
}

export default UserPage