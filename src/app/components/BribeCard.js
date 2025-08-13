"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function BribeCard({
  pair = "TokenA / TokenB",
  apr = "—",
  liquidityA = { symbol: "RAWR", value: "—" },
  liquidityB = { symbol: "TOKEN", value: "—" },
  balanceA = { symbol: "RAWR", value: "—" },
  balanceB = { symbol: "TOKEN", value: "—" },
  available = "—",
  initialToken = "RAWR",
  usdPreview = "—",
} = {}) {
  const [token, setToken] = useState(initialToken)
  const [amount, setAmount] = useState("")

  return (
    <motion.div
      className="glass hairline rounded-2xl w-full max-w-lg mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-lg">{pair}</div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xs text-[--color-muted]">APR</div>
            <div className="text-sm">{apr}</div>
          </div>
        </div>
      </div>

      {/* Liquidity and balances */}
      <div className="px-4 pb-3">
        <div className="flex items-start justify-between text-sm">
          <div>
            <div className="text-[--color-muted] mb-1">Liquidity</div>
            <div>{liquidityA.value} {liquidityA.symbol}</div>
            <div>{liquidityB.value} {liquidityB.symbol}</div>
          </div>
          <div className="text-right">
            <div className="text-[--color-muted] mb-1">Your Balance</div>
            <div>{balanceA.value} {balanceA.symbol}</div>
            <div>{balanceB.value} {balanceB.symbol}</div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[var(--color-hairline)]" />
      {/* Availability */}
      <div className="px-4 pt-3 pb-1 text-right text-sm text-[--color-muted]">Available {available} {token}</div>

      {/* Amount input */}
      <div className="px-4">
        <div className="bg-[#141414] hairline rounded-xl px-3 py-3 flex items-center justify-between input-pill">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full hairline bg-white/5">
            <div className="w-5 h-5 rounded-full bg-white/10" />
            <span className="text-sm font-medium">{token}</span>
          </span>
          <input
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent outline-none text-2xl w-full ml-3 text-right"
          />
          <div className="ml-3 text-right text-sm text-[--color-muted] min-w-[5rem]">{usdPreview}</div>
        </div>
      </div>

      {/* Action */}
      <div className="px-4 py-4">
        <button className="w-full h-11 rounded-2xl bg-accent-gradient text-white font-medium hover:opacity-90 transition">
          Bribe
        </button>
      </div>
    </motion.div>
  )
}


