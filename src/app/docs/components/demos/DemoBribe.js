"use client"

import BribeCard from "../../../components/BribeCard"

export default function DemoBribe() {
  return (
    <div className="max-w-lg mx-auto">
      <BribeCard
        pair="ETH / MON"
        apr="—"
        liquidityA={{ symbol: "ETH", value: "—" }}
        liquidityB={{ symbol: "MON", value: "—" }}
        balanceA={{ symbol: "ETH", value: "—" }}
        balanceB={{ symbol: "MON", value: "—" }}
        available="—"
        initialToken="ETH"
        usdPreview="—"
        tokenPrices={{ ETH: 4750, BTC: 122492, USDT: 1, MON: 18.42 }}
        tokenBalances={{ ETH: 2.5, BTC: 0.1, USDT: 12000, MON: 350 }}
      />
    </div>
  )
}


