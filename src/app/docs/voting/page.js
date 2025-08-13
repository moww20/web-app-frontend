export const metadata = {
  title: "Voting — MONSWAP Docs",
  description: "Governance process and using voting power.",
  alternates: { canonical: "/docs/voting" },
}

export default function VotingDocsPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Voting</h1>
      <div className="docs-prose">
        <p><em>Lock to gain vote power, direct emissions to pools, and earn aligned rewards on Monad.</em></p>

        <h2>Overview</h2>
        <p>
          Locking the protocol token (single stake) mints a vote‑escrowed position (&quot;ve‑lock&quot;) that carries
          <strong> voting power</strong>. Each epoch, you can allocate this power across pools to decide where emissions flow.
          Longer lock durations grant more power; your current power is shown on the dashboard and in the voting UI.
        </p>

        <h2>Vote power and decay</h2>
        <p>
          Vote power <strong>decays over time</strong> as the lock approaches its unlock date. You can extend the lock to
          restore or increase power. Locks can also be merged, and additional tokens can be added.
        </p>

        <h2>How voting works</h2>
        <ul>
          <li>You may split a single ve‑lock’s power across multiple pools within the same epoch.</li>
          <li>Votes do <strong>not</strong> carry over; you must re‑vote each epoch. Unused power for an epoch is simply not applied.</li>
          <li>Voting rewards (fees/bribes/rebases attributable to votes) are realized in the <strong>next epoch</strong>, not instantly.</li>
        </ul>

        <h3>“Poke” after changing your lock</h3>
        <p>
          If you add to, merge, or extend your lock after already casting votes, you should “<strong>Poke</strong>” the lock.
          Poking re‑evaluates vote power so you can vote again using the updated amount. After claiming a rebase, poking
          ensures the new balance is reflected in your voting power.
        </p>

        <h2>veNFT receipt</h2>
        <p>
          Your lock is represented by a transferable <strong>veNFT</strong> (vote‑escrowed NFT). This NFT is the on‑chain receipt
          of your position and is used by the app to associate voting power and rewards with your lock.
        </p>

        <h2>Best practices</h2>
        <ul>
          <li>Choose a consistent time each week to cast votes and perform claims for smoother operations.</li>
          <li>Review pool pages and the bribe board each epoch; attractive bribes may change your allocation.</li>
          <li>Extend or consolidate locks to maintain effective power if your strategy is long‑term.</li>
        </ul>

        <h2>TL; DR</h2>
        <ul>
          <li>Lock the protocol token to gain vote power; longer locks = more power.</li>
          <li>Vote power decays over time; extend or add to locks to refresh power.</li>
          <li>Split one lock’s power across multiple pools; re‑vote every epoch.</li>
          <li>“Poke” after changing or claiming from your lock to update voting power.</li>
          <li>Voting rewards settle in the next epoch; your lock is represented by a veNFT.</li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


