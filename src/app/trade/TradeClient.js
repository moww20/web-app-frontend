"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SwapCard from "../components/SwapCard"

export default function TradeClient() {
  const [mode, setMode] = useState("basic")

  useEffect(() => {
    const onMode = (e) => setMode(e.detail)
    window.addEventListener("monswap:mode-change", onMode)
    return () => window.removeEventListener("monswap:mode-change", onMode)
  }, [])

  return (
    <div className="mx-auto" style={{ maxWidth: 1120 }}>
      <div className="relative min-h-[520px]">
        <AnimatePresence initial={false}>
          {mode === "pro" && (
            <motion.div
              key="chart"
              className="absolute left-0 top-0 bottom-0 hidden md:block"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              style={{ width: 520 }}
            >
              <div className="glass hairline rounded-2xl p-4 h-full text-sm text-[--color-muted]">
                Chart (placeholder)
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          key="swap"
          initial={false}
          animate={mode === "pro" ? { x: 540 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        >
          <SwapCard />
        </motion.div>
      </div>
    </div>
  )
}


