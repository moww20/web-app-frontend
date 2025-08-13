"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
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
  const [mounted, setMounted] = useState(false)
  const pageSize = 6
  const [page, setPage] = useState(1)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setIsSwapOpen(false); setIsAddOpen(false); setIsDetailsOpen(false); setIsBribeOpen(false); setIsVoteOpen(false) }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => { setMounted(true) }, [])

  const pools = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    pair: "TokenA / TokenB",
  }))
  const total = pools.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * pageSize
  const visible = pools.slice(startIdx, startIdx + pageSize)

  const btnClass = "h-8 w-36 px-4 rounded-lg hairline hover:bg-white/5 text-sm inline-flex items-center justify-center whitespace-nowrap"
  const rows = visible.map((row) => (
    <div
      key={row.id}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_auto] lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_minmax(0,1fr)_auto] xl:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center px-4 py-3 hairline-b last:hairline-b-0 cursor-pointer hover:bg-white/3"
      onClick={() => setIsDetailsOpen(true)}
    >
      <div className="min-w-0">{row.pair}</div>
      <div className="hidden sm:block min-w-0">$ —</div>
      <div className="hidden md:block min-w-0">APR —</div>
      <div className="hidden lg:block min-w-0">Liquidity —</div>
      <div className="hidden xl:block min-w-0">Voting APR —</div>
      <div className="flex items-center gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsSwapOpen(true) }}>Swap</button>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsAddOpen(true) }}>+Liquidity</button>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsBribeOpen(true) }}>Bribe</button>
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setIsVoteOpen(true) }}>Vote</button>
      </div>
    </div>
  ))

  return (
    <div>
      <section className="glass hairline rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_auto] lg:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_minmax(0,1fr)_auto] xl:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto] px-4 py-3 text-sm text-[--color-muted] hairline-b bg-white/5">
          <div>Pool</div>
          <div className="hidden sm:block">24h Volume</div>
          <div className="hidden md:block">APR</div>
          <div className="hidden lg:block">Liquidity</div>
          <div className="hidden xl:block">Voting APR</div>
          <div>Actions</div>
        </div>
        {rows}
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <button
            className="px-3 py-1.5 rounded-full hairline hover:bg-white/5 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1
              const active = p === currentPage
              return (
                <button
                  key={p}
                  className={`w-8 h-8 rounded-full text-xs hairline ${active ? "bg-white/10" : "hover:bg-white/5"}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              )
            })}
          </div>
          <button
            className="px-3 py-1.5 rounded-full hairline hover:bg-white/5 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      {mounted && isSwapOpen && createPortal(
        (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24">
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              aria-label="Close"
              onClick={() => setIsSwapOpen(false)}
            />
            <div className="relative w-full max-w-lg mx-4">
              <SwapCard />
            </div>
          </div>
        ),
        document.body
      )}

      {mounted && isAddOpen && createPortal(
        (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24">
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              aria-label="Close"
              onClick={() => setIsAddOpen(false)}
            />
            <div className="relative w-full max-w-lg mx-4">
              <AddLiquidityCard />
            </div>
          </div>
        ),
        document.body
      )}

      {mounted && isDetailsOpen && createPortal(
        (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24">
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              aria-label="Close"
              onClick={() => setIsDetailsOpen(false)}
            />
            <div className="relative w-full max-w-lg mx-4">
              <PoolDetailsCard />
            </div>
          </div>
        ),
        document.body
      )}

      {mounted && isBribeOpen && createPortal(
        (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24">
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              aria-label="Close"
              onClick={() => setIsBribeOpen(false)}
            />
            <div className="relative w-full max-w-lg mx-4">
              <BribeCard />
            </div>
          </div>
        ),
        document.body
      )}

      {mounted && isVoteOpen && createPortal(
        (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24">
            <button
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              aria-label="Close"
              onClick={() => setIsVoteOpen(false)}
            />
            <div className="relative w-full max-w-lg mx-4">
              <VoteCard />
            </div>
          </div>
        ),
        document.body
      )}
    </div>
  )
}


