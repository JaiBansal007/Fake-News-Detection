/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ❌ Invalid — needs fixing below
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
