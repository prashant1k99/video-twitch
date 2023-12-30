import { Button } from '@/components/ui/button'
import UrlCard from './_components/urlCard'
import { getSelf } from '@/lib/authService'
import { getStreamByUserId } from '@/lib/streamService'
import { KeyCard } from './_components/keyCard'

const KeysPage = async () => {
	const self = await getSelf()
	const stream = await getStreamByUserId(self.id)

	if (!stream) {
		throw new Error('Stream not found')
	}

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">Keys &amp; URLs</h1>
				<Button className="text-sm">Generate</Button>
			</div>
			<div className="space-y-4 ">
				<UrlCard value={stream.serverUrl} />
				<KeyCard value={stream.streamKey} />
			</div>
		</div>
	)
}

export default KeysPage