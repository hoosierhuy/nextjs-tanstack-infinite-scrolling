// Core React
import { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
// External Libraries
import axios from 'axios'
import { useInView } from 'react-intersection-observer'

function InfiniteScroll() {
	const { ref, inView } = useInView()

	const {
		status,
		data,
		error,
		isFetching,
		isFetchingNextPage,
		isFetchingPreviousPage,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
	} = useInfiniteQuery({
		queryKey: ['products'],
		queryFn: async ({ pageParam }) => {
			const res = await axios.get(`/api/products?cursor=${pageParam}`)
			return res.data
		},
		initialPageParam: 0, // Change the value to a positive integer to go "backwards", e.g. 5, because product id start at 1.
		getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
		getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
	})

	useEffect(() => {
		// Unless the initialPageParam above is changed, we load the first 5 products initially, when we intersect a threshold in the viewport, we load the next 5.
		if (inView) {
			fetchNextPage()
		}
	}, [fetchNextPage, inView])

	return (
		<div>
			<p>
				<span className="big-letter">♾️ Infinite Scrolling </span>
				<span>
					Using green for St. Patrick's Day. Companion Video on{' '}
					<a
						href="https://www.youtube.com/watch?v=bIiWVTTRFGg"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-label="YouTube"
							style={{
								color: '#ef4444',
								width: '2rem',
								height: '2rem',
								transform: 'translateY(0.6rem)',
							}} // Aligns better with text
						>
							<title>YouTube</title>
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
						</svg>
					</a>
				</span>
			</p>
			{status === 'pending' ? (
				<p>Loading...</p>
			) : status === 'error' ? (
				<span>Error: {error.message}</span>
			) : (
				<>
					<section>
						<button
							type="button"
							onClick={() => fetchPreviousPage()}
							disabled={!hasPreviousPage || isFetchingPreviousPage}
						>
							{isFetchingPreviousPage
								? 'Loading more products...'
								: hasPreviousPage
									? 'Load older products'
									: 'At beginning of products list'}
						</button>
					</section>
					{data.pages
						.flatMap((page) => page?.data ?? [])
						.map((product) => (
							<p
								className="product"
								style={{
									background: `hsl(120, 100%, ${(product.id * 10) % 100}%)`, // Happy Saint Patrick's Day!🍀
								}}
								key={product.id}
							>
								{product.name} <br />
								Product ID: {product.id} <br />
								<img
									src={product.thumbnail ?? ''}
									alt="product thumbnail"
									title="product thumbnail"
								/>
							</p>
						))}
					<section>
						<button
							type="button"
							ref={ref}
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
						>
							{isFetchingNextPage
								? 'Loading more...'
								: hasNextPage
									? 'Load Newer'
									: 'Nothing more to load'}
						</button>
					</section>
					<section>
						{isFetching && !isFetchingNextPage
							? 'Background Updating...'
							: null}
					</section>
				</>
			)}
		</div>
	)
}

export default InfiniteScroll
