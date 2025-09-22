// External libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Global CSS import - this is the only place where global CSS can be imported
import '@/styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	)
}
