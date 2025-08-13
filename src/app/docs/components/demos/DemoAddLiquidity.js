"use client"

import AddLiquidityCard from "../../../components/AddLiquidityCard"

export default function DemoAddLiquidity() {
  return (
    <div className="max-w-lg mx-auto">
      <AddLiquidityCard tokenPrices={{ ETH: 4750, BTC: 122492, USDT: 1, MON: 18.42 }} tokenBalances={{ ETH: 2.5, BTC: 0.1, USDT: 12000, MON: 350 }} defaultTokenA="ETH" defaultTokenB="USDT" />
    </div>
  )
}


