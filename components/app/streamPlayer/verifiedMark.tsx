import { BadgeCheck } from 'lucide-react'

export const VerifiedMark = () => {
	return (
		<div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600">
			<BadgeCheck className="h-full w-full text-primary stroke-[1.5px]" />
			{/* <p className="text-xs font-semibold">Verified</p> */}
		</div>
	)
}
