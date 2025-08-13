export const metadata = {
  title: "Add Liquidity Tutorial — MONSWAP Docs",
  description: "How to provide liquidity to a pool on Monswap.",
  alternates: { canonical: "/docs/tutorials/add-liquidity" },
}

import DemoAddLiquidity from "../../components/demos/DemoAddLiquidity"

export default function AddLiquidityTutorialPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Add Liquidity</h1>
      <div className="docs-prose">
        <ol>
          <li>Go to Liquidity, choose Stable or Volatile.</li>
          <li>Select the pair and deposit equal value of each token.</li>
          <li>Confirm the transaction and review your position in the dashboard.</li>
        </ol>
        <h2>Interface preview</h2>
        <p>Live demo card (for illustration only):</p>
        <div className="my-4">
          <DemoAddLiquidity />
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


