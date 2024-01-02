'use client'

import { useRef, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'

interface AboutModalProps {
	initialBio: string | null
}

export const AboutModal = ({ initialBio }: AboutModalProps) => {
	const [isPending, startTransition] = useTransition()
	const [bio, setBio] = useState<string>(initialBio || '')

	const modalCloseButtonRef = useRef<HTMLButtonElement>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		startTransition(() => {
			updateUser({
				bio,
			})
				.then(() => {
					toast.success('Bio updated!')
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
						<Label>User Bio</Label>
						<Textarea
							placeholder="Add a bio"
							onChange={(e) => setBio(e.target.value)}
							value={bio || ''}
							disabled={isPending}
							className="resize-none"
						/>
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
