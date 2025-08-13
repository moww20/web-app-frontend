export const metadata = {
  title: "Liquidity Pools — MONSWAP Docs",
  description: "Providing, removing, and understanding liquidity.",
  alternates: { canonical: "/docs/liquidity-pools" },
}

export default function LiquidityPoolsPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Liquidity Pools</h1>
      <div className="docs-prose">
        <p><em>Provide depth, earn fees, and participate in governance‑directed incentives on Monad.</em></p>

        <h2>Providing liquidity</h2>
        <p>
          To add liquidity, deposit equal <strong>value</strong> of each token into a pool (Stable or Volatile) from the
          Liquidity section. Your position appears on your dashboard and begins accruing swap fees as trades occur.
          Where emissions are enabled via governance, rewards accrue continuously through each epoch.
        </p>
        <p>
          Any token pair can have liquidity provided to it (and generate trading fees). Pools and tokens may be <strong>whitelisted</strong>
          for additional features like bribes and emissions, which we review and update as needed.
        </p>

        <h2>Pool types</h2>
        <h3>Stable pools</h3>
        <p>
          Designed for assets that are expected to move in tandem (e.g., stablecoin‑to‑stablecoin) or for assets aiming
          to maintain a soft peg. These pools target lower slippage around the peg. Using highly volatile assets here will
          not yield the intended results.
        </p>
        <p>
          Stable pools charge a reduced trading fee of <strong>0.03%</strong> to reflect their lower expected price variance.
        </p>
        <pre><code>x^3·y + y^3·x ≥ k</code></pre>

        <h3>Volatile pools</h3>
        <p>
          Conventional constant‑product pools for assets that move independently (e.g., ETH/MON). Liquidity is provided
          as ~50% of each asset by value, and swaps follow the standard price curve across the range.
        </p>
        <pre><code>x · y ≥ k</code></pre>

        <p>The router automatically selects the most efficient route and pool type for each trade.</p>

        <h2>Whitelisting, bribes, and emissions</h2>
        <p>
          Pools that are eligible for <strong>emissions</strong> and <strong>bribes</strong> are curated to keep the interface and protocol
          healthy. By default, a pool can accept bribes in its own two tokens. To bribe a pool with other tokens, those
          tokens must be on the <strong>Bribe Whitelist</strong>. At launch, bribes will begin with <strong>MON</strong> and the protocol token. See
          <a href="/docs/fees-and-bribes"> Fees and Bribes</a> for details.
        </p>
        <p>
          Stable pool creation is temporarily <strong>team‑curated</strong> to ensure correct configuration. If you need a
          stable pool or bribe token whitelisted, please reach out on our
          {" "}
          <a href="https://discord.com/invite/QnrjnCyU7Q" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-90">Discord</a>.
        </p>

        <h2>Just remember</h2>
        <ul>
          <li>Volatile pools will account for the majority of pairs on the DEX.</li>
          <li>Stable pools offer low slippage around the peg and are currently created on a request basis.</li>
          <li>Any pair can earn fees; eligibility for emissions and bribes depends on curation and whitelists.</li>
        </ul>

        <h2>TL; DR</h2>
        <ul>
          <li>Add equal value of both tokens; fees accrue immediately on trades.</li>
          <li>Router chooses the best path; use Stable for like‑pegged assets, Volatile for everything else.</li>
          <li>Pools are curated for emissions and bribes; pool tokens are auto‑eligible to bribe their own pool, others require whitelist approval.</li>
          <li>Fees: Stable pools <strong>0.03%</strong>, Volatile pools <strong>0.30%</strong>.</li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


