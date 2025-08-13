/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Relax COOP/COEP for Coinbase Wallet SDK popups
          { key: 'Cross-Origin-Opener-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Avoid bundling optional server-only pretty-printer in browser/runtime builds
      'pino-pretty': false,
      // Also guard common server modules if pulled transitively
      'fs': false,
      'path': false,
      'os': false,
      'worker_threads': false,
    }
    return config
  },
};

export default nextConfig;
