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
              <ChartPanel height={swapHeight || 520} useMock={true} pair="ETH/USDT" />
              {/* Controls below chart (one row) */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 hairline rounded-full px-2 py-1">
                  {[
                    { label: '1H', hours: 1 },
                    { label: '1D', hours: 24 },
                    { label: '1W', hours: 24*7 },
                    { label: '1M', hours: 24*30 },
                    { label: '1Y', hours: 24*365 },
                  ].map(r => (
                    <button key={r.label} className="px-2 py-1 rounded-full hover:bg-white/5"
                      onClick={() => window.dispatchEvent(new CustomEvent('monswap:chart-range', { detail: { hours: r.hours } }))}>
                      {r.label}
                    </button>
                  ))}
                </div>
                <div className="inline-flex items-center">
                  <div className="inline-flex items-center hairline rounded-full mr-2">
                    <button className="px-2 py-1 rounded-l-full hover:bg-white/5" title="Linear"
                      onClick={() => window.dispatchEvent(new CustomEvent('monswap:chart-scale', { detail: { mode: 'linear' } }))}>↗</button>
                    <button className="px-2 py-1 rounded-r-full hover:bg-white/5" title="Log"
                      onClick={() => window.dispatchEvent(new CustomEvent('monswap:chart-scale', { detail: { mode: 'log' } }))}>∿</button>
                  </div>
                  <div className="inline-flex items-center hairline rounded-full px-2 py-1">
                    <select className="bg-transparent text-xs outline-none" defaultValue="price"
                      onChange={(e)=> window.dispatchEvent(new CustomEvent('monswap:chart-priceMode', { detail: { kind: e.target.value } }))}>
                      <option value="price">Price</option>
                      <option value="percent">%</option>
                      <option value="index">Index</option>
                    </select>
                  </div>
                </div>
              </div>
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


