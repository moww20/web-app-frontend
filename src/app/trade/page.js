export const metadata = {
  title: "Trade — Web3 DEX",
  description: "Swap tokens on Web3 DEX.",
}

import TradeClient from "./TradeClient"

export default function TradePage() {
  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-24">
      <h1 className="sr-only">Trade</h1>
      <TradeClient />
    </main>
  )
}


