/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to build a static site
  basePath: '/Portfolio', // REPLACE 'Portfolio' with your NEW repo name exactly
  assetPrefix: '/Portfolio', // REPLACE 'Portfolio' with your NEW repo name exactly
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
};
export default nextConfig;