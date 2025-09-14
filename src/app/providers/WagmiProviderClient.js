"use client"

import { useState } from "react"
import { WagmiProvider, createConfig, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mainnet, polygon, arbitrum, optimism, bsc } from "wagmi/chains"
import { injected, metaMask, coinbaseWallet } from "wagmi/connectors"

// Simple configuration without external dependencies
const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, bsc],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: "Web3 DEX",
      appLogoUrl: "/next.svg",
    }),
  ],
  transports: {
    [mainnet.id]: http({
      onFetchError: (error) => {
        console.warn('Network error on mainnet:', error.message)
        return undefined
      }
    }),
    [polygon.id]: http({
      onFetchError: (error) => {
        console.warn('Network error on polygon:', error.message)
        return undefined
      }
    }),
    [arbitrum.id]: http({
      onFetchError: (error) => {
        console.warn('Network error on arbitrum:', error.message)
        return undefined
      }
    }),
    [optimism.id]: http({
      onFetchError: (error) => {
        console.warn('Network error on optimism:', error.message)
        return undefined
      }
    }),
    [bsc.id]: http({
      onFetchError: (error) => {
        console.warn('Network error on bsc:', error.message)
        return undefined
      }
    }),
  },
  ssr: true, // Enable SSR support
})

export default function WagmiProviderClient({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
