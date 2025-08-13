export const metadata = {
  title: "Swap Tutorial — MONSWAP Docs",
  description: "Step‑by‑step guide to swapping on Monswap.",
  alternates: { canonical: "/docs/tutorials/swaps" },
}

import DemoSwap from "../../components/demos/DemoSwap"

export default function SwapTutorialPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Swap Tutorial</h1>
      <div className="docs-prose">
        <p><em>Follow these steps to execute a swap safely and efficiently.</em></p>
        <ol>
          <li>Open the Trade page and connect your wallet.</li>
          <li>Select the token you’re selling and the token you’re buying.</li>
          <li>Enter the amount, review price impact and fees, then click <strong>Review Swap</strong>.</li>
          <li>Confirm the transaction in your wallet.</li>
        </ol>
        <p>
          Tip: Use the settings menu to adjust slippage and deadlines according to market conditions.
        </p>
        <h2>Interface preview</h2>
        <p>Live demo card (for illustration only):</p>
        <div className="my-4">
          <DemoSwap />
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


