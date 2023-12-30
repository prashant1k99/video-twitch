'use client'

import { createIngress } from '@/actions/ingress'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'
import {
	Select,
	SelectItem,
	SelectContent,
	SelectValue,
	SelectTrigger,
} from '@/components/ui/select'
import { IngressInput } from 'livekit-server-sdk'
import { useState, useTransition, useRef, ElementRef } from 'react'
import { toast } from 'sonner'

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

const ConnectModal = () => {
	const closeRef = useRef<ElementRef<'button'>>(null)
	const [ingressType, setIngressType] = useState<IngressType>(RTMP)
	const [isPending, startTransition] = useTransition()

	const generate = async () => {
		startTransition(() => {
			createIngress(parseInt(ingressType))
				.then(() => {
					console.log('IsPending: ', isPending)
					toast.success('Ingress created')
					closeRef.current?.click()
				})
				.catch((err) => {
					toast.error(err.message)
				})
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary">Generate Keys</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate Connection</DialogTitle>
				</DialogHeader>
				<Select
					disabled={isPending}
					value={ingressType}
					onValueChange={(value) => setIngressType(value)}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={RTMP}>RTMP</SelectItem>
						<SelectItem value={WHIP}>WHIP</SelectItem>
					</SelectContent>
				</Select>
				<Alert variant="warning">
					<AlertTriangle className="h-4 w-4" />
					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>
						This will disconnect any current stream.
					</AlertDescription>
				</Alert>
				<div className="flex justify-between w-full space-x-2">
					<DialogClose ref={closeRef} asChild>
						<Button className="w-full" variant="ghost">
							Cancel
						</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						className="w-full"
						variant="primary"
						onClick={generate}>
						{isPending && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ConnectModal
