"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
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
  const [activeRange, setActiveRange] = useState('1D')
  const [scaleMode, setScaleMode] = useState('linear')
  const [priceMode, setPriceMode] = useState('price')

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
      <motion.div className={`relative flex justify-center`}>
        {/* Absolute chart anchored to the swap card center; width grows leftward */}
        <motion.div
          key="chart-abs"
          className="hidden md:block absolute top-0 overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: mode === 'pro' ? 1 : 0, width: mode === 'pro' ? CHART_WIDTH : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            right: '50%',
            marginRight: GAP / 2,
            pointerEvents: mode === 'pro' ? 'auto' : 'none',
          }}
        >
          <div style={{ width: CHART_WIDTH }}>
            <ChartPanel height={swapHeight || 520} useMock={true} pair="ETH/USDT" />
          </div>
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
                <button key={r.label}
                  className={`px-2 py-1 rounded-full hover:bg-white/5 ${activeRange===r.label ? 'bg-white/10' : ''}`}
                  onClick={() => { setActiveRange(r.label); window.dispatchEvent(new CustomEvent('monswap:chart-range', { detail: { hours: r.hours } })) }}>
                  {r.label}
                </button>
              ))}
            </div>
            <div className="inline-flex items-center">
              <div className="inline-flex items-center hairline rounded-full mr-2">
                <button className={`px-2 py-1 rounded-l-full hover:bg-white/5 ${scaleMode==='linear'?'bg-white/10':''}`} title="Linear"
                  onClick={() => { setScaleMode('linear'); window.dispatchEvent(new CustomEvent('monswap:chart-scale', { detail: { mode: 'linear' } }))}}>↗</button>
                <button className={`px-2 py-1 rounded-r-full hover:bg-white/5 ${scaleMode==='log'?'bg-white/10':''}`} title="Log"
                  onClick={() => { setScaleMode('log'); window.dispatchEvent(new CustomEvent('monswap:chart-scale', { detail: { mode: 'log' } }))}}>∿</button>
              </div>
              <div className="relative inline-flex items-center hairline rounded-full bg-white/5 hover:bg-white/10 transition">
                <select
                  className="appearance-none text-xs outline-none bg-transparent rounded-full px-3 py-1 pr-6"
                  value={priceMode}
                  onChange={(e)=> { setPriceMode(e.target.value); window.dispatchEvent(new CustomEvent('monswap:chart-priceMode', { detail: { kind: e.target.value } })) }}
                >
                  <option value="price">Price</option>
                  <option value="percent">%</option>
                  <option value="index">Index</option>
                </select>
                <svg className="pointer-events-none absolute right-2 w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          key="swap"
          transition={{ type: "spring", stiffness: 170, damping: 26 }}
          animate={{ x: mode === 'pro' ? (CHART_WIDTH + GAP) / 2 : 0 }}
          initial={false}
          style={{ willChange: 'transform' }}
        >
          <div ref={swapRef} className="inline-block">
            <SwapCard />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}


