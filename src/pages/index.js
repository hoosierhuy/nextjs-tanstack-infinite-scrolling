// Next.js
import Link from 'next/link'
import Head from 'next/head'
// External libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Local imports
import InfiniteScroll from '@/components/InfiniteScroll'
// CSS import
import '@/styles/globals.css'

const queryClient = new QueryClient()

export default function App() {
	return (
		<>
			<Head>
				<title>Tanstack Query Infinite Scrolling + Intersection Observer</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<InfiniteScroll />
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>

			<hr />
			<Link href="/About">Learn More About Us</Link>
		</>
	)
}
