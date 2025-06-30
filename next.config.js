/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to support dynamic routes and server-side functionality
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  experimental: {
    // Updated serverActions configuration for Next.js 15+
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
  },
};

module.exports = nextConfig;