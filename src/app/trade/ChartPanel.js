"use client"

import { useEffect, useRef } from "react"
import { createChart, CrosshairMode, AreaSeries } from "lightweight-charts"

export default function ChartPanel({ height, useMock = true }) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: "#111114" },
        textColor: "#c8c8c8",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.06)" },
        horzLines: { color: "rgba(255,255,255,0.06)" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      timeScale: { borderColor: "rgba(255,255,255,0.08)" },
      handleScroll: true,
      handleScale: true,
      autoSize: true,
    })
    chartRef.current = chart

    const areaSeries = chart.addSeries(AreaSeries, {
      topColor: "rgba(106,168,255,0.4)",
      bottomColor: "rgba(106,168,255,0.05)",
      lineColor: "#6aa8ff",
      lineWidth: 2,
    })

    function generateMock24h() {
      const now = Math.floor(Date.now() / 1000)
      const start = now - 24 * 60 * 60
      const steps = 240 // ~6 min interval
      const points = []
      let price = 4269.98 // starting value close to screenshot
      const target = 4621.85
      for (let i = 0; i <= steps; i++) {
        const t = start + Math.floor((i * 24 * 60 * 60) / steps)
        const progress = i / steps
        // Upward drift towards target
        const drift = (target - price) * 0.01
        // Noise
        const noise = (Math.sin(i / 6) + Math.sin(i / 17) * 0.5) * 2
        price = price + drift + noise
        // Add a jump around 75% of the way to mimic breakout
        if (i === Math.floor(steps * 0.72)) price += 120
        points.push({ time: t, value: Math.max(4200, price) })
      }
      return points
    }

    const load = async () => {
      if (useMock) {
        const pts = generateMock24h()
        areaSeries.setData(pts)
        chart.timeScale().fitContent()
        return
      }
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&interval=hourly",
          { cache: "no-store" }
        )
        const data = await res.json()
        const points = (data?.prices || []).map(([ts, price]) => ({ time: Math.floor(ts / 1000), value: price }))
        areaSeries.setData(points)
        chart.timeScale().fitContent()
      } catch {}
    }
    load()

    chart.applyOptions({ height: height || 520 })

    return () => {
      chart.remove()
    }
  }, [height])

  return (
    <div
      ref={containerRef}
      className="glass hairline rounded-2xl overflow-hidden relative p-3"
      style={{ height, width: "100%" }}
    />
  )
}


