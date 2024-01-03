import { format } from 'date-fns'

import { getBlockedUsers } from '@/lib/blockService'

import { DataTable } from './_components/dataTable'
import { columns } from './_components/columns'

const CommunityPage = async () => {
	const blockedUsers = await getBlockedUsers()

	const formattedData = blockedUsers.map((block) => ({
		...block,
		userId: block.blockee.id,
		imageUrl: block.blockee.imageUrl,
		username: block.blockee.username,
		createdAt: format(new Date(block.blockee.createdAt), 'dd/MM/yyyy'),
	}))

	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">Community Settings</h1>
			</div>
			<DataTable columns={columns} data={formattedData} />
		</div>
	)
}

export default CommunityPage
