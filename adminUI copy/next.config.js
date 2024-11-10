/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: { unoptimized: true } ,
  env: {
      SERVER_URL: 'http://localhost:8000',
    },
  
}

module.exports = nextConfig
