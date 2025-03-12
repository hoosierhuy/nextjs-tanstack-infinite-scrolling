// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async (req, res) => {
	const cursor = Number.parseInt(req.query.cursor) || 0
	const pageSize = 5 // We load the first 5 products initially, when we intersect a threshold in the viewport, we load the next 5.

	try {
		/* dummyjson is a reliable free api service. The product's ids
      are in consecutive ascending order starting with 1. */
		const response = await axios.get(
			// Remove the limit and skip query parameters to load 30 products at a time, (API default) until all products are loaded.
			`https://dummyjson.com/products?limit=${pageSize}&skip=${cursor}`,
		)
		const data = response.data.products.map((product, i) => ({
			name: product.title,
			id: product.id,
			thumbnail: product.thumbnail,
		}))

		const nextId = cursor < 10 ? data[data.length - 1].id + 1 : null
		const previousId = cursor > -10 ? data[0].id - pageSize : null

		/* This setTimeout is just to simulate latency so we can see loading
       otherwise the response is so fast we can't see the loading state. */
		setTimeout(() => res.json({ data, nextId, previousId }), 1000)
	} catch (error) {
		console.error('Error fetching data from DummyJSON API:', error)
		res.status(500).json({ error: 'Failed to fetch data' })
	}
}
