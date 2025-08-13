"use client"

import { useState } from "react"
import { motion } from "framer-motion"

function TokenButton({ symbol, onClick }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 px-3 py-2 rounded-full hairline bg-white/5 hover:bg-white/10 transition">
      <div className="w-5 h-5 rounded-full bg-white/10" />
      <span className="text-sm font-medium">{symbol ?? "Select token"}</span>
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function AmountRow({ label, amount, setAmount, token, onSelectToken }) {
  return (
    <div className="bg-[#141414] hairline rounded-2xl p-4 input-pill">
      <div className="flex items-center justify-between">
        <div className="text-sm text-[--color-muted]">{label}</div>
        <TokenButton symbol={token} onClick={onSelectToken} />
      </div>
      <div className="mt-2 flex items-end justify-between">
        <input
          inputMode="decimal"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent outline-none text-4xl font-light w-full"
        />
        <div className="ml-3 text-right text-sm text-[--color-muted] min-w-[5rem]">$0</div>
      </div>
    </div>
  )
}

export default function AddLiquidityCard() {
  const [tokenA, setTokenA] = useState("")
  const [tokenB, setTokenB] = useState("")
  const [amountA, setAmountA] = useState("")
  const [amountB, setAmountB] = useState("")

  return (
    <motion.div
      className="glass hairline rounded-2xl w-full max-w-lg mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 pt-3 pb-4">
        <div className="text-sm text-[--color-muted] mb-2">Add Liquidity</div>

        <AmountRow label="Token A" amount={amountA} setAmount={setAmountA} token={tokenA} onSelectToken={() => {}} />

        <div className="flex items-center justify-center my-2">
          <svg className="w-4 h-4 text-[--color-muted]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>

        <AmountRow label="Token B" amount={amountB} setAmount={setAmountB} token={tokenB} onSelectToken={() => {}} />

        {/* Fee tier placeholder */}
        <div className="mt-3 text-sm text-[--color-muted]">Fee tier: —</div>

        <button className="mt-4 w-full px-4 py-3 rounded-2xl bg-accent-gradient text-white font-medium hover:opacity-90 transition">
          Add liquidity
        </button>
      </div>
    </motion.div>
  )
}


