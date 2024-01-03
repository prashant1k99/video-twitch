import { Suspense } from 'react'
import { ResultSekelton, Results } from './_components/result'

export default function Home() {
	return (
		<div className="h-full p-8 max-w-screen-2xl mx-auto">
			<Suspense fallback={<ResultSekelton />}>
				<Results />
			</Suspense>
		</div>
	)
}
