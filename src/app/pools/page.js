export const metadata = {
  title: "Pools — Web3 DEX",
  description: "Explore liquidity pools on Web3 DEX.",
}

import PoolsClient from './PoolsClient'

export default function PoolsPage() {
  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16">
      <div className="overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">Liquidity Pools</h1>
        </div>
        <div className="origin-top animate-fadein-500">
          <PoolsClient />
        </div>
      </div>
    </main>
  )
}


