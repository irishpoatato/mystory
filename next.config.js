/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true,
  },
  basePath: '/mystory', // Replace with your repository name
  assetPrefix: '/mystory/', // Replace with your repository name
}

module.exports = nextConfig 