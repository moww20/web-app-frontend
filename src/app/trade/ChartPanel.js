"use client"

import { useEffect, useRef } from "react"
import { createChart, CrosshairMode } from "lightweight-charts"

export default function ChartPanel({ height }) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: "#111114" },
        textColor: "#c8c8c8",
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
    })
    chartRef.current = chart

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(106,168,255,0.4)",
      bottomColor: "rgba(106,168,255,0.05)",
      lineColor: "#6aa8ff",
      lineWidth: 2,
    })

    async function load() {
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

    const onResize = () => {
      chart.applyOptions({ height: height || 520, width: containerRef.current?.clientWidth || 520 })
    }
    onResize()
    const ro = new ResizeObserver(onResize)
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      chart.remove()
    }
  }, [height])

  return <div ref={containerRef} className="glass hairline rounded-2xl p-3" style={{ height }} />
}


