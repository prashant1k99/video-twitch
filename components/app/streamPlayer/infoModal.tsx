'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { UploadDropzone } from '@/lib/uploadthing'
import { toast } from 'sonner'
import { updateStream } from '@/actions/streams'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Hint } from '../hint'
import { Trash } from 'lucide-react'
import Image from 'next/image'

interface InfoModalProps {
	initialThumbnailUrl: string | null
	initialName: string
}

export const InfoModal = ({
	initialThumbnailUrl,
	initialName,
}: InfoModalProps) => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [name, setName] = useState<string>(initialName)
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
		initialThumbnailUrl
	)

	const modalCloseButtonRef = useRef<HTMLButtonElement>(null)

	const closeModal = () => {
		if (modalCloseButtonRef.current) {
			modalCloseButtonRef.current.click()
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		startTransition(() => {
			updateStream({
				name,
			})
				.then(() => {
					toast.success('Stream updated!')
					closeModal()
				})
				.catch((err) => {
					toast.error(err.message)
				})
		})
	}

	const handleRemoveThumbnail = () => {
		startTransition(() => {
			updateStream({
				thumbnailUrl: null,
			})
				.then(() => {
					toast.success('Thumbnail removed!')
					setThumbnailUrl(null)
					closeModal()
				})
				.catch((err) => {
					toast.error(err.message)
				})
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" className="ml-auto">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Edit your stream info</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-14">
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							placeholder="Stream name"
							onChange={(e) => setName(e.target.value)}
							value={name}
							disabled={isPending}
						/>
					</div>
					<div className="space-y-2">
						<Label>Thumbnail</Label>
						{thumbnailUrl ? (
							<div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
								<div className="absolute top-2 right-2 z-10">
									<Hint label="Remove Thumbnail" asChild side="left">
										<Button
											type="button"
											disabled={isPending}
											onClick={handleRemoveThumbnail}
											className="h-auto w-auto p-1.5">
											<Trash className="w-4 h-4 text-muted-foreground" />
										</Button>
									</Hint>
								</div>
								<Image
									src={thumbnailUrl}
									layout="fill"
									objectFit="cover"
									alt={name}
									fill
								/>
							</div>
						) : (
							<div className="rounded-xl border outline-dashed outline-muted">
								<UploadDropzone
									endpoint="thumbnailUploader"
									appearance={{
										label: {
											color: '#fff',
										},
										allowedContent: {
											color: '#fff',
										},
									}}
									onClientUploadComplete={(res) => {
										setThumbnailUrl(res[0].url)
										router.refresh()
										closeModal()
									}}
								/>
							</div>
						)}
					</div>
					<div className="flex justify-between">
						<DialogClose ref={modalCloseButtonRef} asChild>
							<Button type="button" variant="ghost">
								Cancel
							</Button>
						</DialogClose>
						<Button variant="primary" disabled={isPending} type="submit">
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
