import { headers } from 'next/headers'
import { WebhookReceiver } from 'livekit-server-sdk'
import { db } from '@/lib/db'

const webhookReceiver = new WebhookReceiver(
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!
)

export async function GET() {
	return new Response('OK', { status: 200 })
}

export async function POST(req: Request) {
	const body = await req.text()
	const headerPayload = headers()

	const authorization = headerPayload.get('authorization')

	if (!authorization) {
		return new Response('Missing authorization headers', { status: 400 })
	}

	const event = webhookReceiver.receive(body, authorization)

	switch (event.event) {
		case 'ingress_started':
			await db.stream.update({
				where: {
					ingressId: event.ingressInfo?.ingressId,
				},
				data: {
					isLive: true,
				},
			})
			break
		case 'ingress_ended':
			await db.stream.update({
				where: {
					ingressId: event.ingressInfo?.ingressId,
				},
				data: {
					isLive: false,
				},
			})
			break

		default:
			console.log(`Received event [Unhandled]: ${event.event}`)
			break
	}

	return new Response('OK', { status: 200 })
}
