export const metadata = {
  title: "Emissions — MONSWAP Docs",
  description: "Token emissions schedule and distribution.",
  alternates: { canonical: "/docs/emissions" },
}

export default function EmissionsPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Emissions</h1>
      <div className="docs-prose">
        <p><em>How emissions are allocated to voters and liquidity providers, and how rebases protect long‑term lockers.</em></p>

        <h2>Initial supply and tail emissions</h2>
        <p>
          Monswap will launch with an initial supply that will be disclosed soon (final tokenomics),
          aligned with Monad’s broader tokenomics and ecosystem goals. After genesis, the protocol
          transitions to <strong>tail emissions</strong>—a gradual, ongoing issuance designed to sustain
          liquidity and governance over time without excessive inflation.
        </p>

        <h2>Emission split</h2>
        <p>
          Emissions are shared between <strong>liquidity providers (LPs)</strong> and <strong>single stakers (voters)</strong>.
          To keep the system balanced, the voter share is capped so that the split does not exceed 50:50 at any time.
        </p>
        <p>
          Voter (rebase) emissions scale with the ratio of vote‑escrowed supply to total token supply:
        </p>
        <pre><code>Rebase = weeklyEmissions × (1 − veTotalSupply ÷ tokenTotalSupply)^2 × 0.5</code></pre>
        <p>
          Intuition: when ve‑locking participation drops, the rebase share rises (within the cap), attracting
          more lockers; when ve participation is high, the rebase share naturally tapers. This makes the DEX a
          dynamic incentive machine, nudging the system toward healthy equilibrium.
        </p>

        <h2>Rebase explained</h2>
        <p>
          Rebases help protect long‑term holders from dilution. As weekly emissions increase token supply to pay
          LP rewards, a portion is redirected to ve‑lock holders. Combined with trading fees and bribes, ve‑lock
          holders can offset or even fully neutralize net dilution over time (outcomes vary by market conditions).
        </p>
        <p>This rebase accrues linearly throughout each epoch and can be claimed by lockers.</p>

        <h2>Emission rewards to LPs</h2>
        <p>
          Each epoch, emissions for LPs are allocated <strong>proportionally to votes</strong>. If Pool A receives 50% of
          votes, it earns 50% of that epoch’s LP emissions.
        </p>
        <ul>
          <li>Rewards accrue continuously and are claimable throughout the epoch.</li>
        </ul>

        <h2>TL; DR</h2>
        <ul>
          <li>Initial supply will be disclosed soon and is aligned with Monad’s tokenomics; ongoing <em>tail emissions</em> follow.</li>
          <li>Emissions split between LPs and voters; voter share scales with ve/total supply and is capped to ≤ 50%.</li>
          <li>Rebase formula: <code>weeklyEmissions × (1 − veTotalSupply ÷ tokenTotalSupply)^2 × 0.5</code>.</li>
          <li>Rebases accrue linearly during the epoch and help offset dilution for ve‑lock holders.</li>
          <li>LP emissions are distributed by votes; stake LP tokens to earn and claim rewards.</li>
          <li><strong>Staking and voting</strong> are foundational: earn via fees, bribes, and rebases while maintaining exposure to your principal and keeping capital working in‑protocol.</li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


