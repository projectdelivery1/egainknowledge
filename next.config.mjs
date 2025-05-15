/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you're using the App Router, you might need this:
  experimental: {
    appDir: true,
  },
}

export default nextConfig
