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
          // Basic security hardening
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          // Allow self and vercel analytics/assets; adjust as needed for wallet SDKs if they inject iframes/scripts
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://raw.githack.com https://*.walletconnect.com https://images.walletconnect.com https://registry.walletconnect.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.coingecko.com https://*.vercel-insights.com https://api.web3modal.org https://pulse.walletconnect.org https://*.walletconnect.com wss://*.walletconnect.com https://cca-lite.coinbase.com https://raw.githack.com; frame-src 'self' https://*.walletconnect.com https://*.coinbase.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
          // HSTS (only effective over HTTPS; includeSubDomains optional)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://monswap-docs.vercel.app/',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: 'https://monswap-docs.vercel.app/:path*',
        permanent: true,
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
