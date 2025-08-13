"use client"

import { useState } from "react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { monadTestnet } from "@reown/appkit/networks"

// Initialize AppKit at module scope so hooks can be used immediately
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "REPLACE_WITH_REOWN_PROJECT_ID"
const networks = [monadTestnet]
const wagmiAdapter = new WagmiAdapter({ networks, projectId, ssr: true })

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: "MONSWAP",
    description: "A premium, high‑performance DEX on Monad",
    url: "http://localhost:3000",
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


