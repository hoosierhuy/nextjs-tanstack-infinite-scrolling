// Core React
import { Fragment, useEffect } from 'react'

// External Libraries
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

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
			<h1>Infinite Scrolling</h1>
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
						.flatMap((page) => page.data)
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
									src={product.thumbnail}
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
