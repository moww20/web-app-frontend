"use client"

import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function VoteCard({
  tokenSymbol = "RAWR",
  available = "—",
  veBalance = "0",
}) {
  const [amount, setAmount] = useState("")
  const [token] = useState(tokenSymbol)
  // Slider uses epochs of 7 days (weeks). Range: 1 epoch (1 week) to 26 epochs (~6 months)
  const [slider, setSlider] = useState(13)

  const durationDays = useMemo(() => slider * 7, [slider])

  const unlockDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + durationDays)
    return d.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [durationDays])

  const veAmount = useMemo(() => {
    const a = parseFloat(amount || "0")
    const ratio = slider / 26 // linear scaling up to 6 months (26 epochs)
    return (a * ratio).toFixed(2)
  }, [amount, slider])

  const aprEstimate = useMemo(() => {
    // naive illustrative APR model
    const base = 0.12
    const bonus = (slider / 26) * 0.2
    return ((base + bonus) * 100).toFixed(2) + "%"
  }, [slider])

  return (
    <motion.div
      className="glass hairline rounded-2xl w-full max-w-lg mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 pt-3">
        <div className="text-sm text-[--color-muted] mb-2">Step 1</div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-base">Stake RAWR to Vote</div>
          <div className="text-sm text-[--color-muted]">Available {available} {token}</div>
        </div>
      </div>

      {/* Amount to lock */}
      <div className="px-4">
        <div className="bg-[#141414] hairline rounded-xl px-3 py-3 flex items-center justify-between input-pill">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full hairline bg-white/5">
              <div className="w-5 h-5 rounded-full bg-white/10" />
              <span className="text-sm font-medium">{token}</span>
            </span>
          </div>
          <input
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent outline-none text-2xl text-right w-full ml-3"
          />
        </div>
      </div>

      {/** divider removed for a tighter layout */}

      {/* Info */}
      <div className="px-4 text-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div>
              Locked for {slider === 1 ? "1 week" : slider === 13 ? "3 months" : slider === 26 ? "6 months" : `${slider} weeks`}
            </div>
            <div className="mt-1">Receiving <span className="font-medium">{veAmount} ve{token}</span> voting power</div>
            <div className="mt-1">Estimated Rebase APR <span className="font-medium">{aprEstimate}</span></div>
          </div>
          <div className="text-right">
            <div className="text-[--color-muted]">Unlocks</div>
            <div>{unlockDate}</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="px-4">
        <input
          type="range"
          min={1}
          max={26}
          step={1}
          value={slider}
          onChange={(e) => setSlider(parseInt(e.target.value))}
          className="w-full accent-[var(--color-accent)]"
          aria-label="Lock duration (epochs of 7 days)"
        />
        <div className="mt-1 flex justify-between text-sm text-[--color-muted]">
          <span>1 week</span>
          <span>3 months</span>
          <span>6 months</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <button className="w-full h-11 rounded-2xl bg-accent-gradient text-white font-medium hover:opacity-90 transition">
          Stake
        </button>
      </div>

      {/* Step 2: Vote for the Pool */}
      <div className="px-4 pb-4">
        <div className="text-sm text-[--color-muted] mb-2">Step 2</div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-base">Vote for the Pool</div>
          <div className="text-sm text-[--color-muted]">
            veRAWR Available: <span className="text-foreground font-medium">{veBalance}</span>
          </div>
        </div>

        {/* Voting Power input with quick percent buttons */}
        <VotePowerInput maxValue={veBalance} token={token} veBalance={veBalance} />
      </div>
    </motion.div>
  )
}

function VotePowerInput({ maxValue, token, veBalance }) {
  const max = Number(maxValue || 0)
  const [amount, setAmount] = useState("")
  const inputRef = useRef(null)

  const setPct = (pct) => {
    const v = ((max * pct) / 100).toFixed(4)
    setAmount(v)
  }

  return (
    <div>
      <div className="bg-[#141414] hairline rounded-xl px-3 py-3 flex items-center justify-between input-pill">
        <div className="text-sm">
          <div className="text-[--color-muted]">ve{token}</div>
          <div className="text-base">{veBalance}</div>
        </div>
        <input
          ref={inputRef}
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent outline-none text-2xl text-right w-full ml-3"
        />
      </div>

      <div className="mt-2 grid grid-cols-5 gap-2">
        {[
          { label: "25%", pct: 25 },
          { label: "33%", pct: 33 },
          { label: "50%", pct: 50 },
          { label: "75%", pct: 75 },
          { label: "100%", pct: 100 },
        ].map(({ label, pct }) => (
          <button
            key={label}
            className="h-9 rounded-lg hairline hover:bg-white/5 text-sm"
            onClick={() => setPct(pct)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <button className="mt-4 w-full h-11 rounded-2xl bg-accent-gradient text-white font-medium hover:opacity-90 transition">
        Vote
      </button>
    </div>
  )
}


