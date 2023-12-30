import { getSelf } from '@/lib/authService'
import { getStreamByUserId } from '@/lib/streamService'
import { ToggleCard } from './_components/toggleCard'

const ChatPage = async () => {
	const self = await getSelf()
	if (!self) {
		return <div>Not logged in</div>
	}
	const stream = await getStreamByUserId(self.id)

	if (!stream) {
		return <div>Stream not found</div>
	}

	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">Chat Settings</h1>
			</div>
			<div className="space-y-4">
				<ToggleCard
					field="isChatEnabled"
					label="Enable chat"
					value={stream.isChatEnabled}
				/>
				<ToggleCard
					isDisabled={!stream.isChatEnabled}
					field="isChatDelayed"
					label="Delay chat"
					value={stream.isChatDelayed}
				/>
				<ToggleCard
					isDisabled={!stream.isChatEnabled}
					field="isChatFollowersOnly"
					label="Enable chat"
					value={stream.isChatFollowersOnly}
				/>
			</div>
		</div>
	)
}

export default ChatPage
