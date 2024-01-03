'use client'

import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { InfoModal } from './infoModal'

interface InfoCardProps {
	hostIdentity: string
	viewerIdentity: string
	name: string
	thumbnailUrl: string | null
}

export const InfoCard = ({
	hostIdentity,
	viewerIdentity,
	name,
	thumbnailUrl,
}: InfoCardProps) => {
	const hostAsViewer = `${hostIdentity}[host]`
	const isHost = viewerIdentity === hostAsViewer

	if (!isHost) return null

	return (
		<div className="px-4 ">
			<div className="rounded-xl bg-background">
				<div className="flex items-center gap-x-2.5 p-4">
					<div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
						<Pencil className="w-5 h-5" />
					</div>
					<div>
						<h2 className="text-sm lg:text-lg font-semibold capitalize">
							Edit your stream info
						</h2>
						<p className="text-muted-foreground text-sx lg:text-sm">
							Update your stream title and thumbnail
						</p>
					</div>
					<InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
				</div>
				<Separator />
				<div className="p-4 lg:p-6 space-y-4">
					<div>
						<h3 className="text-sm text-muted-foreground mb-2">Name</h3>
						<p className="text-sm font-semibold">{name}</p>
					</div>
					<div>
						<h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
						{thumbnailUrl && (
							<div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
								<Image
									src={thumbnailUrl}
									layout="fill"
									objectFit="cover"
									alt={name}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
