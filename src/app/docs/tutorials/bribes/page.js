export const metadata = {
  title: "Bribes Tutorial — MONSWAP Docs",
  description: "How to post bribes and claim rewards.",
  alternates: { canonical: "/docs/tutorials/bribes" },
}

import DemoBribe from "../../components/demos/DemoBribe"

export default function BribesTutorialPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Bribes Tutorial</h1>
      <div className="docs-prose">
        <ol>
          <li>Open the target pool and review current votes and APR.</li>
          <li>Choose a bribe token (must be whitelisted) and amount; set the epoch.</li>
          <li>Post the bribe and monitor participation; unclaimed bribes roll forward until an epoch completes with votes.</li>
        </ol>
        <p>
          See <a href="/docs/bribe-whitelist">Bribe Whitelist</a> for token eligibility and request process.
        </p>
        <h2>Interface preview</h2>
        <p>Live demo card (for illustration only):</p>
        <div className="my-4">
          <DemoBribe />
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


