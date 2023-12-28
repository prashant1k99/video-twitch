'use client'

import qs from 'query-string'
import { useState } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Search = () => {
	const router = useRouter()
	const [query, setQuery] = useState('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!query) return
		router.push(
			`/search?${qs.stringify({ q: query }, { skipEmptyString: true })}`
		)
	}

	const clearSearch = () => {
		setQuery('')
		router.push('/')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="relative w-full lg:w-[400px] flex items-center">
			<Input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
				placeholder="Search"
			/>
			{query && (
				<XIcon
					onClick={clearSearch}
					className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
				/>
			)}
			<Button type="submit" size="sm" variant="secondary">
				<SearchIcon className="h-5 w-5 text-muted-foreground" />
			</Button>
		</form>
	)
}
