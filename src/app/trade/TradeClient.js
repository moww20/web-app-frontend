"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SwapCard from "../components/SwapCard"

export default function TradeClient() {
  const [mode, setMode] = useState("basic")
  const swapRef = useRef(null)
  const [swapHeight, setSwapHeight] = useState(0)
  const [swapWidth, setSwapWidth] = useState(0)
  const CHART_WIDTH = 520
  const GAP = 24

  useEffect(() => {
    const onMode = (e) => setMode(e.detail)
    window.addEventListener("monswap:mode-change", onMode)
    return () => window.removeEventListener("monswap:mode-change", onMode)
  }, [])

  useEffect(() => {
    if (!swapRef.current) return
    const el = swapRef.current
    const ro = new ResizeObserver(() => {
      setSwapHeight(el.offsetHeight)
      setSwapWidth(el.offsetWidth)
    })
    ro.observe(el)
    setSwapHeight(el.offsetHeight)
    setSwapWidth(el.offsetWidth)
    const onResize = () => { setSwapHeight(el.offsetHeight); setSwapWidth(el.offsetWidth) }
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [mode])

  return (
    <div className="mx-auto" style={{ maxWidth: 1120 }}>
      <div className="relative flex">
        <AnimatePresence initial={false}>
          {mode === "pro" && (
            <motion.div
              key="chart"
              className="hidden md:block mr-6"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              style={{ width: CHART_WIDTH, height: swapHeight || undefined }}
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
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        >
          <div ref={swapRef} className="inline-block">
            <SwapCard />
          </div>
        </motion.div>
      </div>
    </div>
  )
}


