import { isFollowingUser } from '@/lib/followService'
import { getUserByUsername } from '@/lib/userService'
import { notFound } from 'next/navigation'
import { isBlockedByUser } from '@/lib/blockService'
import { StreamPlayer } from '@/components/app/streamPlayer'

interface UserPageProps {
	params: {
		username: string
	}
}

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUserByUsername(params.username)

	if (!user || !user.stream) {
		return notFound()
	}

	const isFollowing = await isFollowingUser(user.id)
	const isBlocking = await isBlockedByUser(user.id)

	if (isBlocking) {
		return notFound()
	}

	return (
		<StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
	)
}

export default UserPage
