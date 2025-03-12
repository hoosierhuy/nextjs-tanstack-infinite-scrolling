// Next.js
import Link from 'next/link'
// External libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Local imports
import InfiniteScroll from '@/components/InfiniteScroll'

const queryClient = new QueryClient()

export default function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<InfiniteScroll />
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>

			<hr />
			<Link href="/About">Learn More About Us</Link>
		</>
	)
}
