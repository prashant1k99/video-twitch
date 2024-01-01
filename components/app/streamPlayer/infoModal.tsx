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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		startTransition(() => {
			updateStream({
				name,
				// thumbnailUrl: initialThumbnailUrl,
			})
				.then(() => {
					toast.success('Stream updated!')
					modalCloseButtonRef.current?.click()
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
								}}
							/>
						</div>
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
