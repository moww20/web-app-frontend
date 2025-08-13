"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SwapCard from "../components/SwapCard"
import dynamic from "next/dynamic"
const ChartPanel = dynamic(() => import("./ChartPanel"), { ssr: false })

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
      <motion.div layout className={`relative flex ${mode === 'pro' ? 'justify-center md:justify-start' : 'justify-center'}`}>
        <AnimatePresence initial={false}>
          {mode === "pro" && (
            <motion.div
              key="chart"
              className="hidden md:block"
              initial={{ opacity: 0, width: 0, marginRight: 0 }}
              animate={{ opacity: 1, width: CHART_WIDTH, marginRight: 24 }}
              exit={{ opacity: 0, width: 0, marginRight: 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            >
              <ChartPanel height={(swapHeight || 520) - 20} useMock={true} pair="ETH/USDT" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          key="swap"
          layout
          transition={{ type: "spring", stiffness: 170, damping: 26 }}
        >
          <div ref={swapRef} className="inline-block">
            <SwapCard />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}


