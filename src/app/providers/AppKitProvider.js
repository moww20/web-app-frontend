"use client"

import { useState } from "react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { monadTestnet } from "@reown/appkit/networks"

// Initialize AppKit at module scope so hooks can be used immediately
// Try several common env var names; only NEXT_PUBLIC_* will be exposed client-side in Next.js
const rawProjectId =
  process.env.NEXT_PUBLIC_PROJECT_ID ||
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ||
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  "REPLACE_WITH_REOWN_PROJECT_ID"

// Sanitize to avoid stray quotes/newlines from envs (handles CR/LF on Vercel)
const projectId = (rawProjectId || "")
  .replace(/^['"]|['"]$/g, "") // strip surrounding quotes
  .replace(/\s+/g, "") // remove any whitespace incl. \r\n
  .trim()

if (!projectId || projectId === "REPLACE_WITH_REOWN_PROJECT_ID") {
  // eslint-disable-next-line no-console
  console.error(
    "[AppKit] Missing Reown projectId. Set NEXT_PUBLIC_PROJECT_ID in your .env.local or hosting env."
  )
}
const networks = [monadTestnet]
const wagmiAdapter = new WagmiAdapter({ networks, projectId, ssr: true })

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: "MONSWAP",
    description: "A premium, high‑performance DEX on Monad",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    icons: ["/mon-2.svg"],
  },
})

export default function AppKitProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}


