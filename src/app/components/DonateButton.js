"use client"

import { useMemo, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { useAppKit } from "@reown/appkit/react"
import { Coffee, Wallet2 } from "lucide-react"
import { motion } from "framer-motion"

export default function DonateButton({ to = "0xA34Ac2472648925BBC12208f87573A318aa9b4EF", asMenuItem = false }) {
  const { isConnected } = useAccount()
  const { open } = useAppKit()
  const { data: txHash, sendTransaction, isPending } = useSendTransaction()

  const [isOpen, setIsOpen] = useState(false)
  const quick = ["0.01", "0.1", "1", "10", "25", "50"]
  const [selected, setSelected] = useState("1")
  const [custom, setCustom] = useState("")

  const effectiveAmount = custom && Number(custom) > 0 ? custom : selected

  const value = useMemo(() => {
    try {
      return parseEther(effectiveAmount)
    } catch {
      return 0n
    }
  }, [effectiveAmount])

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash })

  const busy = isPending || isConfirming

  const onConfirm = async () => {
    if (!effectiveAmount || value <= 0n) return
    if (!isConnected) {
      open?.()
      return
    }
    sendTransaction({ to, value })
  }

  if (isConfirmed && isOpen) {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === "Escape" && !busy) setIsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, busy])

  const modal = (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4">
      <button
        aria-label="Close donate"
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => { if (!busy) setIsOpen(false) }}
      />
      <motion.div
        className="relative w-full max-w-sm bg-[#0b0b0f] hairline rounded-2xl p-4 shadow-2xl"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5">
                <Coffee className="w-5 h-5" />
              </span>
              <div className="text-base font-medium">Buy us a coffee</div>
            </div>
          </div>

          {/* To */}
          <div className="mb-4">
            <div className="flex items-center justify-between hairline rounded-xl bg-white/5 px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-[--color-muted]">
                <Wallet2 className="w-5 h-5" />
                <span>To</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm">monswap devs</div>
                  <div className="text-xs text-[--color-muted]">{shortAddr(to)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick amounts */}
          <div className="mb-4">
            <div className="text-xs text-[--color-muted] mb-1">Quick Amounts</div>
            <div className="grid grid-cols-3 gap-2">
              {quick.map((amt) => {
                const active = !custom && selected === amt
                return (
                  <button
                    key={amt}
                    type="button"
                    className={`h-10 rounded-lg hairline text-sm hover:bg-white/5 ${active ? "bg-white/10 ring-1 ring-[--color-accent]" : ""}`}
                    onClick={() => {
                      setSelected(amt)
                      setCustom("")
                    }}
                  >
                    {amt} MON
                  </button>
                )
              })}
            </div>
          </div>

          {/* Custom amount */}
          <div className="mb-4">
            <div className="text-xs text-[--color-muted] mb-1">Custom Amount</div>
            <div className="relative">
              <input
                inputMode="decimal"
                type="number"
                min="0"
                step="0.0001"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onConfirm() }}
                placeholder="Enter custom amount..."
                className="w-full bg-[#141414] hairline rounded-xl pr-14 pl-3 py-2 outline-none"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[--color-muted]">MON</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className="h-11 rounded-xl bg-white/5 hairline hover:bg-white/10 w-full disabled:opacity-50"
              onClick={() => setIsOpen(false)}
              disabled={busy}
            >
              Cancel
            </button>
            <button
              className="h-11 rounded-xl bg-accent-gradient text-white disabled:opacity-50 w-full inline-flex items-center justify-center gap-2"
              onClick={onConfirm}
              disabled={busy || value <= 0n}
            >
              {busy && (
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              <span>Tip {effectiveAmount || "0"} MON</span>
            </button>
          </div>
      </motion.div>
    </div>
  )

  const trigger = asMenuItem ? (
    <button
      type="button"
      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
      onClick={() => setIsOpen(true)}
    >
      <span>Buy us a coffee</span>
    </button>
  ) : (
    <button
      type="button"
      title="Donate"
      aria-label="Donate"
      className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 text-foreground/90 hover-tint hover-vibrant"
      onClick={() => setIsOpen(true)}
    >
      <Coffee className="w-5 h-5" />
    </button>
  )

  return (
    <>
      {trigger}
      {isOpen && createPortal(modal, document.body)}
    </>
  )
}

function shortAddr(addr) {
  if (!addr) return ""
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}


