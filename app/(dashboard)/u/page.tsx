import { getSelf } from '@/lib/authService'
import { redirect } from 'next/navigation'

export const UserPageRedirect = async () => {
	const self = await getSelf()
	if (!self) {
		return <div>Not logged in</div>
	}

	return redirect(`/u/${self.username}`)
}

export default UserPageRedirect
