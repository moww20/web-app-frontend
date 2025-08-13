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
      className="grid [grid-template-columns:minmax(0,1fr)_auto] sm:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_auto] md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] xl:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center px-4 py-3 hairline-b last:hairline-b-0 cursor-pointer hover:bg-white/3"
      onClick={() => setIsDetailsOpen(true)}
    >
      <div className="min-w-0 truncate">TokenA / TokenB</div>
      <div className="hidden sm:block min-w-0 truncate">$ —</div>
      <div className="hidden md:block min-w-0 truncate">APR —</div>
      <div className="hidden lg:block min-w-0 truncate">Liquidity —</div>
      <div className="hidden xl:block min-w-0 truncate">Voting APR —</div>
      <div className="flex flex-wrap xl:flex-nowrap items-center gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
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
        <div className="grid [grid-template-columns:minmax(0,1fr)_auto] sm:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_auto] md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] xl:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] px-4 py-3 text-sm text-[--color-muted] hairline-b bg-white/5">
          <div className="truncate">Pool</div>
          <div className="hidden sm:block truncate">24h Volume</div>
          <div className="hidden md:block truncate">APR</div>
          <div className="hidden lg:block truncate">Liquidity</div>
          <div className="hidden xl:block truncate">Voting APR</div>
          <div className="justify-self-end">Actions</div>
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


