"use client"

import { useEffect, useState } from "react"
import SwapCard from "../components/SwapCard"
import AddLiquidityCard from "../components/AddLiquidityCard"
import PoolDetailsCard from "../components/PoolDetailsCard"
import BribeCard from "../components/BribeCard"
import VoteCard from "../components/VoteCard"

export default function PoolsClient() {
  const [isSwapOpen, setIsSwapOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isBribeOpen, setIsBribeOpen] = useState(false)
  const [isVoteOpen, setIsVoteOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setIsSwapOpen(false); setIsAddOpen(false); setIsDetailsOpen(false); setIsBribeOpen(false); setIsVoteOpen(false) }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const btnClass = "h-8 w-36 px-4 rounded-lg hairline hover:bg-white/5 text-sm inline-flex items-center justify-center whitespace-nowrap"
  const rows = Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className="grid grid-cols-1 md:grid-cols-8 items-center px-4 py-3 hairline-b last:hairline-b-0 cursor-pointer hover:bg-white/3"
      onClick={() => setIsDetailsOpen(true)}
    >
      <div className="hidden md:block md:col-span-2 min-w-0">TokenA / TokenB</div>
      <div className="hidden md:block min-w-0">$ —</div>
      <div className="hidden md:block min-w-0">APR —</div>
      <div className="hidden md:block min-w-0">Liquidity —</div>
      <div className="hidden md:block min-w-0">Voting APR —</div>
      <div className="md:col-span-2 flex items-center gap-2 justify-start md:justify-end" onClick={(e) => e.stopPropagation()}>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsSwapOpen(true) }}>Swap</button>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsAddOpen(true) }}>+Liquidity</button>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsBribeOpen(true) }}>Bribe</button>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsVoteOpen(true) }}>Vote</button>
      </div>
    </div>
  ))

  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">Liquidity Pools</h1>
      </div>

      <section className="glass hairline rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-8 px-4 py-3 text-sm text-[--color-muted] hairline-b bg-white/5">
          <div className="hidden md:block md:col-span-2">Pool</div>
          <div className="hidden md:block">24h Volume</div>
          <div className="hidden md:block">APR</div>
          <div className="hidden md:block">Liquidity</div>
          <div className="hidden md:block">Voting APR</div>
          <div className="md:col-span-2">Actions</div>
        </div>
        {rows}
      </section>

      {isSwapOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-40 md:pt-48">
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-label="Close"
            onClick={() => setIsSwapOpen(false)}
          />
          <div className="relative w-full max-w-lg mx-4">
            <SwapCard />
          </div>
        </div>
      )}

      {isAddOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-40 md:pt-48">
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-label="Close"
            onClick={() => setIsAddOpen(false)}
          />
          <div className="relative w-full max-w-lg mx-4">
            <AddLiquidityCard />
          </div>
        </div>
      )}

      {isDetailsOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-40 md:pt-48">
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-label="Close"
            onClick={() => setIsDetailsOpen(false)}
          />
          <div className="relative w-full max-w-lg mx-4">
            <PoolDetailsCard />
          </div>
        </div>
      )}

      {isBribeOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-40 md:pt-48">
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-label="Close"
            onClick={() => setIsBribeOpen(false)}
          />
          <div className="relative w-full max-w-lg mx-4">
            <BribeCard />
          </div>
        </div>
      )}

      {isVoteOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-40 md:pt-48">
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-label="Close"
            onClick={() => setIsVoteOpen(false)}
          />
          <div className="relative w-full max-w-lg mx-4">
            <VoteCard />
          </div>
        </div>
      )}
    </main>
  )
}


