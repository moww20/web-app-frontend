"use client"

import { useState, useEffect } from "react"
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

function AmountRow({ label, amount, setAmount, token, onSelectToken, usdPreview, isMenuOpen = false, tokens = [], onPickToken = () => {}, onCloseMenu = () => {}, balanceLabel, onMax, readOnly = false }) {
  return (
    <div className="bg-[#141414] hairline rounded-2xl p-4 input-pill">
      <div className="flex items-center justify-between">
        <div className="text-sm text-[--color-muted]">{label}</div>
        <div className="relative inline-block">
          <TokenButton symbol={token} onClick={onSelectToken} />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 z-20 w-40 bg-[#141414] hairline rounded-xl shadow-xl p-1">
              <div className="grid gap-1">
                {tokens.map((sym) => (
                  <button key={sym} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => onPickToken(sym)}>{sym}</button>
                ))}
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-[--color-muted]" onClick={onCloseMenu}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {balanceLabel && (
        <div className="mt-1 flex items-center justify-end text-xs text-[--color-muted]">
          <span>{balanceLabel}</span>
          {onMax && (
            <button className="ml-2 px-2 py-0.5 rounded-full hairline hover:bg-white/5" onClick={onMax}>Max</button>
          )}
        </div>
      )}
      <div className="mt-2 flex items-end justify-between">
        <input
          inputMode="decimal"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0"
          value={amount}
          onChange={(e) => { if (!readOnly) setAmount(e.target.value) }}
          readOnly={readOnly}
          className="bg-transparent outline-none text-4xl font-light w-full"
        />
        <div className="ml-3 text-right text-sm text-[--color-muted] min-w-[5rem]">{usdPreview ?? "$0"}</div>
      </div>
    </div>
  )
}

export default function AddLiquidityCard({
  tokenPrices = null,
  tokenBalances = null,
  defaultTokenA = "",
  defaultTokenB = "",
} = {}) {
  const [tokenA, setTokenA] = useState(defaultTokenA)
  const [tokenB, setTokenB] = useState(defaultTokenB)
  const [amountA, setAmountA] = useState("")
  const [amountB, setAmountB] = useState("")
  const [menu, setMenu] = useState(null) // 'A' | 'B' | null

  const formatUsd = (val) => {
    const n = Number(val)
    if (!isFinite(n) || !tokenPrices) return "$0"
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  }
  const getPrice = (sym) => (tokenPrices && sym ? (typeof tokenPrices[sym] === 'number' ? tokenPrices[sym] : 0) : 0)
  const getBalance = (sym) => (tokenBalances && sym ? (typeof tokenBalances[sym] === 'number' ? tokenBalances[sym] : 0) : 0)
  const tokens = tokenPrices ? Object.keys(tokenPrices) : []
  const usdA = formatUsd((Number(amountA||0)||0) * getPrice(tokenA))
  const usdB = formatUsd((Number(amountB||0)||0) * getPrice(tokenB))

  const deriveAmountB = (a, symA, symB) => {
    const v = Number(a)
    if (!isFinite(v) || v <= 0) return ""
    const pA = getPrice(symA)
    const pB = getPrice(symB)
    if (pA <= 0 || pB <= 0) return ""
    const usd = v * pA
    const out = usd / pB
    return String(Number(out.toFixed(6)))
  }

  // Auto-calc Token B to match Token A's value
  useEffect(() => {
    if (!tokenPrices) return
    const nextB = deriveAmountB(amountA, tokenA, tokenB)
    if (nextB !== amountB) {
      setAmountB(nextB)
    }
  }, [amountA, tokenA, tokenB, tokenPrices, amountB])

  return (
    <motion.div
      className="glass hairline rounded-2xl w-full max-w-lg mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 pt-3 pb-4">
        <div className="text-sm text-[--color-muted] mb-2">Add Liquidity</div>

        <AmountRow
          label="Token A"
          amount={amountA}
          setAmount={setAmountA}
          token={tokenA}
          onSelectToken={() => { if (tokens.length) setMenu('A') }}
          isMenuOpen={menu==='A'}
          tokens={tokens}
          onPickToken={(sym) => { setTokenA(sym); setMenu(null) }}
          onCloseMenu={() => setMenu(null)}
          usdPreview={usdA}
          balanceLabel={tokenBalances ? `Balance: ${getBalance(tokenA)} ${tokenA}` : undefined}
          onMax={tokenBalances ? (() => setAmountA(String(getBalance(tokenA)))) : undefined}
        />

        <div className="flex items-center justify-center my-2">
          <svg className="w-4 h-4 text-[--color-muted]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>

        <AmountRow
          label="Token B"
          amount={amountB}
          setAmount={setAmountB}
          token={tokenB}
          onSelectToken={() => { if (tokens.length) setMenu('B') }}
          isMenuOpen={menu==='B'}
          tokens={tokens}
          onPickToken={(sym) => { setTokenB(sym); setMenu(null) }}
          onCloseMenu={() => setMenu(null)}
          usdPreview={usdB}
          balanceLabel={tokenBalances ? `Balance: ${getBalance(tokenB)} ${tokenB}` : undefined}
          onMax={tokenBalances ? (() => setAmountB(String(getBalance(tokenB)))) : undefined}
          readOnly
        />

        {/* Fee tier placeholder */}
        <div className="mt-3 text-sm text-[--color-muted]">Fee tier: —</div>

        <button className="mt-4 w-full px-4 py-3 rounded-2xl bg-accent-gradient text-white font-medium hover:opacity-90 transition">
          Add liquidity
        </button>
      </div>
    </motion.div>
  )
}


