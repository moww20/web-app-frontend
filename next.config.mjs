/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Relax COOP/COEP for wallet connections
          { key: 'Cross-Origin-Opener-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
          // Basic security hardening
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          // Simplified CSP for direct wallet connections
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://raw.githubusercontent.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.coingecko.com https://*.vercel-insights.com https://raw.githubusercontent.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
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
        destination: 'https://docs.web3dex.dev/',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: 'https://docs.web3dex.dev/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
