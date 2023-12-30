import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { db } from '@/lib/db'
import { clerkClient } from '@clerk/nextjs'

export async function GET() {
	return new Response('OK', { status: 200 })
}

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error('CLERK_WEBHOOK_SECRET is not defined')
	}

	// Headers
	const headerPayload = headers()
	const svix_id = headerPayload.get('svix-id')
	const svix_signature = headerPayload.get('svix-signature')
	const svix_timestamp = headerPayload.get('svix-timestamp')

	if (!svix_id || !svix_signature || !svix_timestamp) {
		return new Response('Missing headers', { status: 400 })
	}

	// Get Payload
	const payload = await req.json()
	const body = JSON.stringify(payload)

	// Verify
	const webhook = new Webhook(WEBHOOK_SECRET)

	let event: WebhookEvent

	try {
		event = webhook.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent
	} catch (err) {
		console.error('Error verifying webhook', err)
		return new Response('Error occured', { status: 400 })
	}

	// Get the ID and type of the event
	const { id } = event.data
	const eventType = event.type

	// Handle the event
	console.log(`Received event ${eventType} with ID ${id}`)
	switch (eventType) {
		case 'user.created':
			await db.user.create({
				data: {
					id: id as string,
					username: payload.data.username,
					imageUrl: payload.data.image_url,
					stream: {
						create: {
							name: `${payload.data.username}'s stream`,
						},
					},
					createdAt: new Date(payload.data.created_at),
					updatedAt: new Date(payload.data.updated_at),
				},
			})
			break
		case 'user.updated':
			await db.user.update({
				where: {
					id,
				},
				data: {
					username: payload.data.username,
					imageUrl: payload.data.image_url,
					updatedAt: new Date(payload.data.updated_at),
					stream: {
						update: {
							name: `${payload.data.username}'s stream`,
						},
					},
				},
			})
			break
		case 'user.deleted':
			try {
				await db.user.delete({
					where: {
						id,
					},
				})
			} catch (err) {
				console.log(err)
			}
			break
		default:
			console.log(`Unhandled event ${eventType} with ID ${id}`)
			break
	}

	// Return a response
	return new Response('OK', { status: 200 })
}
