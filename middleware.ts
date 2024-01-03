import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: [
		'/',
		'/search',
		'/:username',
		'/api/webhooks(.*)',
		'/api/uploadthing(.*)',
	],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
