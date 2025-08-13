"use client"

import { useEffect, useMemo, useRef } from "react"
import { createChart, CrosshairMode, AreaSeries, PriceScaleMode } from "lightweight-charts"

export default function ChartPanel({ height, useMock = true, pair = "ETH/USDT" }) {
  const wrapperRef = useRef(null)
  const chartRef = useRef(null)
  const innerRef = useRef(null)
  const plotHeight = useMemo(() => Math.max(260, (height || 520) - 48), [height])
  const seriesRef = useRef(null)

  useEffect(() => {
    if (!innerRef.current) return
    const chart = createChart(innerRef.current, {
      layout: {
        background: { color: "transparent" },
        textColor: "#c8c8c8",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "transparent" },
        horzLines: { color: "transparent" },
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
    seriesRef.current = areaSeries

    function generateMock24hHourly() {
      // End at the current local hour (e.g., 04:00), then step back hourly
      const endDate = new Date()
      endDate.setMinutes(0, 0, 0)
      const endTs = Math.floor(endDate.getTime() / 1000)
      const points = []
      let price = 4269.98
      const target = 4621.85
      // Produce exactly 24 hourly points ending at the current local hour
      for (let i = 23; i >= 0; i--) {
        const t = endTs - i * 3600
        const progress = (24 - i) / 24
        const drift = (target - price) * 0.03 * progress
        const noise = (Math.sin(i / 1.7) + Math.sin(i / 3.3) * 0.6) * 1.2
        price = price + drift + noise
        points.push({ time: t, value: Math.max(4200, price) })
      }
      return points
    }

    const load = async () => {
      if (useMock) {
        const pts = generateMock24hHourly()
        areaSeries.setData(pts)
        // Default to 1D visible range (last 24h ending at the current local hour)
        chart.priceScale('right').applyOptions({ mode: PriceScaleMode.Normal })
        const lastTs = pts[pts.length - 1]?.time || Math.floor(Date.now() / 1000)
        chart.timeScale().applyOptions({
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time) => {
            let d
            if (typeof time === 'number') {
              d = new Date(time * 1000)
            } else if (time && typeof time === 'object' && 'year' in time) {
              d = new Date(time.year, (time.month || 1) - 1, time.day || 1)
            } else {
              return ''
            }
            const minutes = d.getMinutes()
            if (minutes !== 0) return ''
            const hoursLocal = d.getHours()
            if (hoursLocal === 0) {
              return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
            }
            return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
          },
        })
        chart.timeScale().setVisibleRange({ from: lastTs - 24 * 3600, to: lastTs })
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
        // Apply 1D formatting and range by default for real data
        chart.priceScale('right').applyOptions({ mode: PriceScaleMode.Normal })
        chart.timeScale().applyOptions({
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time) => {
            let d
            if (typeof time === 'number') {
              d = new Date(time * 1000)
            } else if (time && typeof time === 'object' && 'year' in time) {
              d = new Date(time.year, (time.month || 1) - 1, time.day || 1)
            } else {
              return ''
            }
            const minutes = d.getMinutes()
            if (minutes !== 0) return ''
            const hoursLocal = d.getHours()
            if (hoursLocal === 0) {
              return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
            }
            return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
          },
        })
        const tsNow = Math.floor(Date.now() / 1000)
        const tzOffsetSec = new Date().getTimezoneOffset() * 60
        const endAlignedLocal = Math.floor((tsNow - tzOffsetSec) / 3600) * 3600 + tzOffsetSec
        chart.timeScale().setVisibleRange({ from: endAlignedLocal - 24 * 3600, to: endAlignedLocal })
      } catch {}
    }
    load()

    chart.applyOptions({ height: plotHeight })

    const onRange = (ev) => {
      const { hours } = ev.detail || {}
      if (!hours) return
      const ts = Math.floor(Date.now() / 1000)
      // Switch x-axis label style based on intraday vs multi-day
      if (hours === 24) {
        chart.timeScale().applyOptions({
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time) => {
            let d
            if (typeof time === 'number') {
              d = new Date(time * 1000)
            } else if (time && typeof time === 'object' && 'year' in time) {
              d = new Date(time.year, (time.month || 1) - 1, time.day || 1)
            } else {
              return ''
            }
            const minutes = d.getMinutes()
            // For 1D view, show whole-hour labels and date at midnight
            if (minutes !== 0) return ''
            const hoursLocal = d.getHours()
            if (hoursLocal === 0) {
              return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
            }
            return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
          },
        })
      } else if (hours <= 6) {
        chart.timeScale().applyOptions({
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time /* Time */, tickMarkType, locale) => {
            // Support both UTCTimestamp (number) and BusinessDay ({ year, month, day })
            let d
            if (typeof time === 'number') {
              d = new Date(time * 1000)
            } else if (time && typeof time === 'object' && 'year' in time) {
              d = new Date(Date.UTC(time.year, (time.month || 1) - 1, time.day || 1))
            } else {
              return ''
            }
            const minutesLocal = d.getMinutes()
            if (minutesLocal !== 0) return ''
            return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: false })
          },
        })
      } else {
        chart.timeScale().applyOptions({
          timeVisible: false,
          secondsVisible: false,
          tickMarkFormatter: (time /* Time */) => {
            // Fallback to short date labels for multi-day ranges
            if (typeof time === 'number') {
              const d = new Date(time * 1000)
              return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
            }
            if (time && typeof time === 'object' && 'year' in time) {
              return `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Math.max(0, (time.month || 1) - 1)]} ${time.day}`
            }
            return ''
          },
        })
      }
      // Align intraday ranges to local whole-hour boundaries for cleaner ticks
      if (hours === 24) {
        // For 1D, align to the current local hour and show last 24 full hours
        const tzOffsetSec = new Date().getTimezoneOffset() * 60
        const endAlignedLocal = Math.floor((ts - tzOffsetSec) / 3600) * 3600 + tzOffsetSec
        chart.timeScale().setVisibleRange({ from: endAlignedLocal - hours * 3600, to: endAlignedLocal })
      } else if (hours <= 6) {
        const tzOffsetSec = new Date().getTimezoneOffset() * 60
        const endAlignedLocal = Math.floor((ts - tzOffsetSec) / 3600) * 3600 + tzOffsetSec
        chart.timeScale().setVisibleRange({ from: endAlignedLocal - hours * 3600, to: endAlignedLocal })
      } else {
        chart.timeScale().setVisibleRange({ from: ts - hours * 3600, to: ts })
      }
    }
    const onScale = (ev) => {
      const { mode } = ev.detail || {}
      const ps = chart.priceScale('right')
      if (mode === 'linear') ps.applyOptions({ mode: PriceScaleMode.Normal })
      if (mode === 'log') ps.applyOptions({ mode: PriceScaleMode.Logarithmic })
    }
    const onPriceMode = (ev) => {
      const { kind } = ev.detail || {}
      const ps = chart.priceScale('right')
      if (kind === 'price') ps.applyOptions({ mode: PriceScaleMode.Normal })
      if (kind === 'percent') ps.applyOptions({ mode: PriceScaleMode.Percentage })
      if (kind === 'index') ps.applyOptions({ mode: PriceScaleMode.IndexedTo100 })
    }
    window.addEventListener('monswap:chart-range', onRange)
    window.addEventListener('monswap:chart-scale', onScale)
    window.addEventListener('monswap:chart-priceMode', onPriceMode)

    return () => {
      window.removeEventListener('monswap:chart-range', onRange)
      window.removeEventListener('monswap:chart-scale', onScale)
      window.removeEventListener('monswap:chart-priceMode', onPriceMode)
      chart.remove()
    }
  }, [plotHeight])

  return (
    <div ref={wrapperRef} className="glass hairline rounded-2xl overflow-hidden relative" style={{ height: height || 520, width: "100%" }}>
      <div className="px-3 pt-3 pb-1 text-sm text-[--color-muted]">{pair}</div>
      <div ref={innerRef} className="px-3 pb-3" style={{ height: plotHeight }} />
    </div>
  )
}


