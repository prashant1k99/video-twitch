'use client'

import { useViewerToken } from '@/hooks/useViewerToken'
import { Stream, User } from '@prisma/client'

interface StreamPlayerProps {
	user: User
	stream: Stream
	isFollowing: boolean
}

export const StreamPlayer = ({
	user,
	stream,
	isFollowing,
}: StreamPlayerProps) => {
	const { token, name, identity } = useViewerToken(user.id)

	if (!token || !name || !identity) {
		return <div className="">Cannot Watch the stream</div>
	}

	return <div className="">Allowed to watch the stream</div>
}
