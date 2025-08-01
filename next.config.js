/** @type {import('next').NextConfig} */

const nextConfig = {
 
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
  },
  env: {
    QLOO_API_KEY: process.env.QLOO_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
  },
}

module.exports = nextConfig