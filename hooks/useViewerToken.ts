import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { createViewerToken } from '@/actions/token'

export const useViewerToken = (hostIdentity: string) => {
	const [token, setToken] = useState<string | null>(null)
	const [name, setName] = useState<string | null>(null)
	const [identity, setIdentity] = useState<string | null>(null)

	useEffect(() => {
		const createToken = async () => {
			try {
				const viewerToken = await createViewerToken(hostIdentity)
				setToken(viewerToken)

				const decoded = jwtDecode<JwtPayload & { name?: string }>(viewerToken)

				setName(decoded?.name ?? null)
				setIdentity(decoded?.jti ?? null)
			} catch (err) {
				toast.error(err instanceof Error ? err.message : 'Something went wrong')
			}
		}

		createToken()
	}, [hostIdentity])

	return { token, name, identity }
}
