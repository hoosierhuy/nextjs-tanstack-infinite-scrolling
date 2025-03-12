// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async (req, res) => {
	const cursor = Number.parseInt(req.query.cursor) || 0
	const pageSize = 5
	const maxProducts = 30

	// Ensure cursor does not exceed maxProducts
	const adjustedCursor = cursor >= maxProducts ? maxProducts - pageSize : cursor

	try {
		const response = await axios.get(
			`https://dummyjson.com/products?limit=${pageSize}&skip=${adjustedCursor}`,
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

		setTimeout(() => res.json({ data, nextId, previousId }), 1000)
	} catch (error) {
		console.error('Error fetching data from DummyJSON API:', error)
		res.status(500).json({ error: 'Failed to fetch data' })
	}
}
