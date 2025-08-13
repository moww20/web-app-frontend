export const metadata = {
  title: "Introduction — MONSWAP Docs",
  description: "Overview of MONSWAP and this documentation.",
  alternates: { canonical: "/docs/introduction" },
}

export default function IntroductionPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Introduction</h1>
      <div className="docs-prose">
        <p><em>Building durable liquidity and aligned incentives for Monad.</em></p>

        <h2>Overview</h2>
        <p>
          Monswap is a ve(3,3) decentralized exchange built natively on the Monad blockchain. “VE”
          refers to vote‑escrowed tokenomics, first popularized by Curve Finance, where users lock
          tokens to gain governance power and economic benefits. The “(3,3)” concept, originating from
          OlympusDAO and inspired by Nash equilibrium, models cooperative behavior: when participants
          act in the protocol’s best interest (e.g., locking, voting, providing liquidity), total value
          increases for everyone.
        </p>
        <p>
          The ve(3,3) design, introduced by Andre Cronje (creator of Yearn Finance), aligns incentives
          among liquidity providers, traders, and voters. By coupling emissions with governance and
          long‑term commitment, the system aims to sustain deep liquidity, competitive pricing, and
          durable rewards.
        </p>

        <blockquote>
          Deep liquidity and aligned incentives are the foundation of a healthy DEX. ve(3,3) is designed
          to reward those who commit capital and governance attention over time.
        </blockquote>

        <h2>Governance controls</h2>
        <p>Monswap’s ve‑governance focuses on two critical levers:</p>
        <ul>
          <li><strong>Direction of emissions</strong>: decide which liquidity pools receive incentives.</li>
          <li><strong>Total emissions level</strong>: increase or decrease protocol‑wide emissions on an epoch basis.</li>
        </ul>

        <h2>Game theory and incentives</h2>
        <h3>Pool selection and APY</h3>
        <p>
          Token holders direct emissions toward specific pools, boosting their APY. This can support new tokens,
          emerging DeFi projects, or underserved pairs on Monad by attracting liquidity where it’s most useful.
        </p>

        <h3>Dynamic emissions policy</h3>
        <p>
          Initial discussions favor aligning “tail emissions” with Monad’s growth over time. This setting is
          adjustable each epoch—up, down, or unchanged—acknowledging market cycles and enabling prudent
          incentive management during expansions or contractions.
        </p>

        <h3>Cooperative equilibrium (3,3)</h3>
        <p>
          When participants coordinate—locking, voting, and concentrating incentives—liquidity deepens,
          slippage falls, and rewards become more sustainable. The protocol evolves toward a shared objective
          that benefits all stakeholders.
        </p>

        <h3>Baseline scenario (0,0)</h3>
        <p>
          In the least cooperative case, the system functions like a standard AMM (e.g., Uniswap) with routine
          swap fees but without ve(3,3)’s incentive alignment and governance‑driven emissions.
        </p>

        <h2>Why ve(3,3) on Monad?</h2>
        <ul>
          <li><strong>Capital efficiency</strong>: emissions flow to the most useful pools, improving depth where demand is highest.</li>
          <li><strong>Long‑term alignment</strong>: lockers gain governance power and rewards for sustained commitment.</li>
          <li><strong>Composability</strong>: governance‑driven incentives guide ecosystem liquidity where it creates the most value.</li>
        </ul>

        <h2>TL; DR</h2>
        <p>
          Monswap brings vote‑escrowed, game‑theoretic incentives to Monad. By coordinating emissions and governance,
          the protocol seeks to cultivate deep, resilient liquidity and a healthier trading environment over the long run.
        </p>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6">
        {/* Next/Prev navigation */}
        <div>
          {/* injected via DocNav component in layout */}
        </div>
      </div>
    </div>
  )
}


