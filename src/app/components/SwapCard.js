"use client"

 import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const tabs = ["Swap", "Limit", "Buy", "Sell"]

function TabBar({ value, onChange, mode, onChangeMode, onSettingsClick }) {
  return (
    <div className="flex items-center gap-4 px-3 py-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={
            "px-3 py-1.5 rounded-full text-sm transition " +
            (value === t
              ? "bg-white/10 text-foreground"
              : "text-[--color-muted] hover:text-foreground hover:bg-white/5")
          }
        >
          {t}
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:inline-flex items-center rounded-full p-1 hairline">
          <button
            onClick={() => onChangeMode("basic")}
            className={`px-3 py-1.5 rounded-full text-sm ${mode === "basic" ? "bg-white/10" : "text-[--color-muted] hover:text-foreground"}`}
          >
            Basic
          </button>
        
          <button
            onClick={() => onChangeMode("pro")}
            className={`px-3 py-1.5 rounded-full text-sm ${mode === "pro" ? "bg-accent-gradient text-white" : "text-[--color-muted] hover:text-foreground"}`}
          >
            Pro
          </button>
        </div>
        <button className="p-2 rounded-full hover:bg-white/5" aria-label="Settings" onClick={onSettingsClick} data-settings-button>
          <svg className="w-5 h-5 opacity-70" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.7922 15.1778C21.6555 14.5178 20.9589 13.3078 20.9589 12C20.9589 10.6922 21.6555 9.48221 22.7922 8.82221C22.9878 8.69999 23.0611 8.45556 22.9389 8.26L20.8978 4.74C20.8244 4.60555 20.69 4.53224 20.5556 4.53224C20.4822 4.53224 20.4089 4.55667 20.3478 4.59334C19.7855 4.91111 19.15 5.08222 18.5144 5.08222C17.8667 5.08222 17.2311 4.9111 16.6567 4.5811C15.52 3.9211 14.8233 2.72333 14.8233 1.41555C14.8233 1.18333 14.64 1 14.42 1H9.57999C9.35999 1 9.17667 1.18333 9.17667 1.41555C9.17667 2.72333 8.48 3.9211 7.34334 4.5811C6.76889 4.9111 6.13335 5.08222 5.48557 5.08222C4.85002 5.08222 4.21446 4.91111 3.65224 4.59334C3.45668 4.47111 3.21222 4.54444 3.10222 4.74L1.0489 8.26C1.01223 8.32111 1 8.39445 1 8.45556C1 8.60223 1.07335 8.73666 1.20779 8.82221C2.34446 9.48221 3.04113 10.68 3.04113 11.9878C3.04113 13.3078 2.34444 14.5178 1.21999 15.1778H1.20779C1.01224 15.3 0.938874 15.5444 1.0611 15.74L3.10222 19.26C3.17556 19.3944 3.31 19.4678 3.44444 19.4678C3.51778 19.4678 3.59113 19.4433 3.65224 19.4067C4.80113 18.7589 6.20667 18.7589 7.34334 19.4189C8.46778 20.0789 9.16444 21.2767 9.16444 22.5844C9.16444 22.8167 9.34776 23 9.57999 23H14.42C14.64 23 14.8233 22.8167 14.8233 22.5844C14.8233 21.2767 15.52 20.0789 16.6567 19.4189C17.2311 19.0889 17.8667 18.9178 18.5144 18.9178C19.15 18.9178 19.7855 19.0889 20.3478 19.4067C20.5433 19.5289 20.7878 19.4556 20.8978 19.26L22.9511 15.74C22.9878 15.6789 23 15.6055 23 15.5444C23 15.3978 22.9267 15.2633 22.7922 15.1778ZM12 15.6667C9.97111 15.6667 8.33333 14.0289 8.33333 12C8.33333 9.97111 9.97111 8.33333 12 8.33333C14.0289 8.33333 15.6667 9.97111 15.6667 12C15.6667 14.0289 14.0289 15.6667 12 15.6667Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function InfoDot({ text }) {
  return (
    <span className="group relative inline-flex items-center justify-center w-4 h-4 rounded-full hairline bg-white/5 text-[9px] leading-4 text-[--color-muted] cursor-help select-none" tabIndex={0} aria-label="Info">
      i
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-5 z-30 w-64 bg-[#16181f] hairline rounded-2xl p-3 shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity text-[12px] text-[--color-muted]">
        {text}
      </div>
    </span>
  )
}

function TokenButton({ label, symbol, onClick }) {
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

function AmountRow({ title, amount, setAmount, token, onSelectToken, usdPreview, className = "", isMenuOpen = false, tokens = [], onPickToken = () => {}, onCloseMenu = () => {}, balanceLabel, onMax, readOnly = false }) {
  return (
    <div className={`bg-[#141414] hairline rounded-2xl p-4 input-pill ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-[--color-muted]">{title}</div>
        <div className="relative inline-block">
          <TokenButton symbol={token} onClick={onSelectToken} />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 z-20 w-40 bg-[#141414] hairline rounded-xl shadow-xl p-1">
              <div className="grid gap-1">
                {tokens.map((sym) => (
                  <button key={sym}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5"
                          onClick={() => onPickToken(sym)}
                  >{sym}</button>
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

export default function SwapCard({
  tokenPrices = null,
  defaultSellToken = "ETH",
  defaultBuyToken = "",
  tokenBalances = null,
} = {}) {
  const [tab, setTab] = useState("Swap")
  const [sellAmount, setSellAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [sellToken, setSellToken] = useState(defaultSellToken)
  const [buyToken, setBuyToken] = useState(defaultBuyToken)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [maxSlippage, setMaxSlippage] = useState("5")
  const [slippageAuto, setSlippageAuto] = useState(true)
  const [deadlineMins, setDeadlineMins] = useState("5")
  const [mode, setMode] = useState("basic")
  const settingsRef = useRef(null)
  const [tokenMenu, setTokenMenu] = useState(null) // 'sell' | 'buy' | null

  const SETTINGS_KEY = "monswap.settings"

  const saveSettings = () => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ maxSlippage, slippageAuto, deadlineMins, mode })
      )
    } catch {}
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY)
      if (raw) {
        const s = JSON.parse(raw)
        if (s.maxSlippage != null) setMaxSlippage(String(s.maxSlippage))
        if (s.slippageAuto != null) setSlippageAuto(Boolean(s.slippageAuto))
        if (s.deadlineMins != null) setDeadlineMins(String(s.deadlineMins))
        // Always default to Basic on load regardless of previously saved mode
      }
    } catch {}
  }, [])

  useEffect(() => {
    const onDocDown = (e) => {
      if (!settingsOpen) return
      const target = e.target
      const insideMenu = settingsRef.current && settingsRef.current.contains(target)
      const onButton = target && (target.closest && target.closest('[data-settings-button]'))
      if (!insideMenu && !onButton) {
        saveSettings()
        setSettingsOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocDown)
    return () => document.removeEventListener("mousedown", onDocDown)
  }, [settingsOpen, maxSlippage, slippageAuto, deadlineMins, mode])

  const handleToggleSettings = () => {
    if (settingsOpen) saveSettings()
    setSettingsOpen((v) => !v)
  }

  const setModeAndEmit = (next) => {
    setMode(next)
    try {
      window.dispatchEvent(new CustomEvent("monswap:mode-change", { detail: next }))
    } catch {}
  }

  const getPrice = (symbol) => {
    if (!symbol) return 0
    if (!tokenPrices) return 0
    const p = tokenPrices[symbol]
    return typeof p === 'number' ? p : 0
  }
  const getBalance = (symbol) => {
    if (!symbol || !tokenBalances) return 0
    const b = tokenBalances[symbol]
    return typeof b === 'number' ? b : 0
  }
  const formatUsd = (val) => {
    if (!val || isNaN(val)) return "$0"
    const n = Number(val)
    if (!isFinite(n)) return "$0"
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  }

  const tokens = tokenPrices ? Object.keys(tokenPrices) : []
  const sellUsd = formatUsd((Number(sellAmount || 0) || 0) * getPrice(sellToken))
  const buyUsd = formatUsd((Number(buyAmount || 0) || 0) * getPrice(buyToken))

  // Derive buy amount from sell amount using mock prices (no fees/impact)
  const deriveBuyAmount = (sellAmt, sellSym, buySym) => {
    const s = Number(sellAmt)
    if (!isFinite(s) || s <= 0) return ""
    const pSell = getPrice(sellSym)
    const pBuy = getPrice(buySym)
    if (pSell <= 0 || pBuy <= 0) return ""
    const usd = s * pSell
    const out = usd / pBuy
    return String(Number(out.toFixed(6)))
  }

  useEffect(() => {
    setBuyAmount(deriveBuyAmount(sellAmount, sellToken, buyToken))
  }, [sellAmount, sellToken, buyToken])

  return (
    <motion.div
      className="glass hairline rounded-2xl w-full max-w-lg mx-auto overflow-hidden relative"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TabBar value={tab} onChange={setTab} mode={mode} onChangeMode={setModeAndEmit} onSettingsClick={handleToggleSettings} />

      {settingsOpen && (
        <div ref={settingsRef} className="absolute right-3 top-12 z-20 w-[280px] max-w-[90vw] bg-[#141414] hairline rounded-2xl p-3 shadow-xl">
          <div className="text-sm space-y-3">
            {/* Max slippage */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Max slippage</span>
                <InfoDot text="Your transaction will revert if the price changes more than the slippage threshhold." />
              </div>
              <div className="inline-flex items-center bg-[#141414] rounded-full h-9 px-2 w-[96px] text-sm input-pill">
                <button
                  onClick={() =>
                    setSlippageAuto((v) => {
                      const next = !v
                      if (next) setMaxSlippage("5")
                      return next
                    })
                  }
                  className={`px-2 py-1 rounded-full text-[10px] font-medium mr-1 ${slippageAuto ? "bg-accent-gradient text-white" : "bg-transparent text-[--color-muted] hover:text-foreground"}`}
                >
                  Auto
                </button>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="0"
                  value={maxSlippage}
                  onChange={(e) => {
                    const val = e.target.value
                    setMaxSlippage(val)
                    setSlippageAuto(val === "5" || val === 5)
                  }}
                  className="flex-1 w-0 bg-transparent outline-none text-right px-1"
                />
                <span className="pl-1 text-[--color-muted]">%</span>
              </div>
            </div>

            {/* Swap deadline */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Swap deadline</span>
                <InfoDot text="Your transaction will revert if it is pending for more than this period of time." />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#141414] rounded-full h-9 px-2 w-[96px] text-sm input-pill">
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={deadlineMins}
                  onChange={(e) => setDeadlineMins(e.target.value)}
                  className="flex-1 w-0 bg-transparent outline-none text-right px-1"
                />
                <span className="text-[--color-muted]">min</span>
              </div>
            </div>

            {/* View toggle moved to header next to gear */}
          </div>
        </div>
      )}

      <div className="px-4 pb-4">
        <div className="relative">
          <AmountRow
            title={tab === "Sell" ? "Sell" : "Sell"}
            amount={sellAmount}
            setAmount={setSellAmount}
            token={sellToken}
            onSelectToken={() => { if (tokens.length) setTokenMenu('sell') }}
            usdPreview={sellUsd}
            isMenuOpen={tokenMenu==='sell'}
            tokens={tokens}
            onPickToken={(sym) => { setSellToken(sym); setTokenMenu(null) }}
            onCloseMenu={() => setTokenMenu(null)}
            balanceLabel={tokenBalances ? `Balance: ${getBalance(sellToken)} ${sellToken}` : undefined}
            onMax={tokenBalances ? (() => setSellAmount(String(getBalance(sellToken)))) : undefined}
          />

          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition hairline shadow-sm"
            aria-label="Switch tokens"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V4m0 0l-3.5 3.5M12 4l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M12 8v12m0 0l3.5-3.5M12 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <AmountRow
            className="mt-1"
            title={tab === "Buy" ? "Buy" : "Buy"}
            amount={buyAmount}
            setAmount={setBuyAmount}
            token={buyToken}
            onSelectToken={() => { if (tokens.length) setTokenMenu('buy') }}
            usdPreview={buyUsd}
            isMenuOpen={tokenMenu==='buy'}
            tokens={tokens}
            onPickToken={(sym) => { setBuyToken(sym); setTokenMenu(null) }}
            onCloseMenu={() => setTokenMenu(null)}
            balanceLabel={tokenBalances ? `Balance: ${getBalance(buyToken)} ${buyToken}` : undefined}
            readOnly
          />
        </div>

        {/* Token selection handled via dropdowns on each row */}

        <button className="mt-4 w-full px-4 py-3 rounded-2xl bg-accent-gradient text-white font-medium hover:opacity-90 transition">
          {buyToken ? "Review Swap" : "Select a token"}
        </button>
      </div>
    </motion.div>
  )
}


