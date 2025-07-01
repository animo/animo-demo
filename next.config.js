/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode for compatibility with existing React components
  reactStrictMode: false,
  // Custom webpack config for Aries Framework JavaScript
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig