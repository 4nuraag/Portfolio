/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Tells Next.js to build a static site
  trailingSlash: true, // IMPORTANT: Allows relative paths like ./gallery/ to resolve correctly
  basePath: isProd ? '/Portfolio' : '', // REPLACE 'Portfolio' with your NEW repo name exactly
  assetPrefix: isProd ? '/Portfolio' : '', // REPLACE 'Portfolio' with your NEW repo name exactly
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
};
export default nextConfig;