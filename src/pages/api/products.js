// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async (request, result) => {
	// Extrapolating the cursor is a common pagination technique. Further reading: https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
	const cursor = Number.parseInt(request.query.cursor) || 0

	const pageSize = 5
	const maxProducts = 25 // Adjust this value to get more overall products from api.

	// Ensure cursor does not exceed maxProducts so that we stop scrolling at the proper time.
	const adjustedCursor = cursor >= maxProducts ? maxProducts - pageSize : cursor

	try {
		const response = await axios.get(
			// DummyJSON API is relatively reliable with neat options, best of all, it's free!
			`https://dummyjson.com/products?limit=${pageSize}&skip=${adjustedCursor}&select=title,thumbnail,id`,
		)

		const data = response.data.products.map((product) => ({
			name: product.title,
			id: product.id,
			thumbnail: product.thumbnail,
		}))

		const nextId =
			adjustedCursor + pageSize < maxProducts ? adjustedCursor + pageSize : null
		const previousId =
			adjustedCursor - pageSize >= 0 ? adjustedCursor - pageSize : null

		setTimeout(() => result.json({ data, nextId, previousId }), 1000)
	} catch (error) {
		console.error('Error fetching data from DummyJSON API:', error)
		result.status(500).json({ error: 'Failed to fetch data' })
	}
}
