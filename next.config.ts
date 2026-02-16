import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Required for GitHub Pages
  images: {
    unoptimized: true, // Required for GitHub Pages (no server-side image optimization)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // If you are deploying to https://<USERNAME>.github.io/<REPO>/
  // you might need: basePath: '/Portfolio',
};

export default nextConfig;
