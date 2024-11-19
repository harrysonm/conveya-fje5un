/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  output: 'export',
  distDir: 'out',
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;