import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Explicitly tell Next.js the project boundary to stop it traversing up to home directory
	outputFileTracingRoot: __dirname,
}

export default nextConfig
