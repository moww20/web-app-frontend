export const metadata = {
  title: "Trade — MONSWAP",
  description: "Swap tokens on Monad Testnet with MONSWAP.",
}

import SwapCard from "../components/SwapCard"

export default function TradePage() {
  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-24">
      <h1 className="sr-only">Trade</h1>
      <SwapCard />
    </main>
  )
}


