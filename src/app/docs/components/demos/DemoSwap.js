"use client"

import SwapCard from "../../../components/SwapCard"

export default function DemoSwap() {
  return (
    <div className="max-w-lg mx-auto">
      <SwapCard tokenPrices={{ ETH: 4750, BTC: 122492, USDT: 1, MON: 18.42 }} tokenBalances={{ ETH: 2.5, BTC: 0.1, USDT: 12000, MON: 350 }} defaultSellToken="ETH" defaultBuyToken="USDT" />
    </div>
  )
}


