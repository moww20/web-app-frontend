export const metadata = {
  title: "Pools — MONSWAP",
  description: "Explore liquidity pools on MONSWAP.",
}

import PoolsClient from './PoolsClient'

export default function PoolsPage() {
  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-24">
      <div className="overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">Liquidity Pools</h1>
        </div>
        <div className="origin-top opacity-0 translate-y-3 animate-[fadein_500ms_ease_forwards]">
          <PoolsClient />
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadein {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}


