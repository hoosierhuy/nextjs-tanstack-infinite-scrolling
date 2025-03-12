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
		initialPageParam: 0, // Change the value to a positive number to go "backwards", e.g. 5, because product id start at 1.
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
									: 'Nothing more to load'}
						</button>
					</section>
					{data.pages.map((page) => (
						<Fragment key={page.nextId}>
							{page.data.map((product) => (
								<p
									style={{
										border: '1px solid gray',
										borderRadius: '5px',
										padding: '5rem 1rem',
										background: `hsla(${product.id * 30}, 60%, 80%, 0.5)`, // Just to make each element easier to distinguish when scrolling.
									}}
									key={product.id}
								>
									{product.name} <br />
									<img src={product.thumbnail} alt="product thumbnail" />
								</p>
							))}
						</Fragment>
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
