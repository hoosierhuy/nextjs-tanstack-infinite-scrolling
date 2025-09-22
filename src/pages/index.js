// Local imports
import InfiniteScroll from '@/components/InfiniteScroll'
import Head from 'next/head'
// Next.js
import Link from 'next/link'

export default function HomePage() {
	return (
		<>
			<Head>
				<title>Tanstack Query Infinite Scrolling + Intersection Observer</title>
			</Head>
			<InfiniteScroll />
			<hr />
			<Link href="/About">Learn More About Us</Link>
		</>
	)
}
