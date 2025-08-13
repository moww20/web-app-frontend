export const metadata = {
  title: "Fees and Bribes — MONSWAP Docs",
  description: "Trading fees, LP fees, protocol fees, and bribe incentives.",
  alternates: { canonical: "/docs/fees-and-bribes" },
}

export default function FeesAndBribesPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Fees and Bribes</h1>
      <div className="docs-prose">
        <p><em>How Monswap aligns incentives between traders, liquidity providers, and voters on Monad.</em></p>

        <h2>Overview</h2>
        <p>
          Monswap distributes value to participants through two primary mechanisms:
          trading <strong>fees</strong> and governance‑driven <strong>bribes</strong>. Fees reward liquidity provision
          and voting, while bribes allow protocols and users to influence emissions toward specific pools by
          incentivizing voters.
        </p>

        <h2>Trading fees</h2>
        <p>
          Swaps on Monswap incur a <strong>fixed 0.30%</strong> trading fee.
        </p>
        <ul>
          <li><strong>Distribution</strong>: 50% to voters (holders of vote‑escrowed locks), 50% to LPs in the pool.</li>
          <li><strong>Accrual timing</strong>: Fees collected in the previous epoch accrue to voters in the current epoch.</li>
          <li><strong>Fee assets</strong>: Fees are paid in the same tokens as the underlying pair (e.g., <code>TOKENA/TOKENB</code> pays out TOKENA and TOKENB).</li>
          <li><strong>LP availability</strong>: LP fee rewards accrue in real time. A dashboard view allows providers to monitor earnings and claim when convenient.</li>
        </ul>

        <h2>Bribes</h2>
        <p>
          Any Monad project or individual can <strong>bribe</strong> Monswap voters to direct emissions toward a target pool.
          Bribes can be paid in <em>any</em> allowed token, creating flexible, market‑based incentives for voters each epoch.
        </p>
        <p>
          Example: a project team behind <code>JOHN</code> may post a bribe of <code>500 JOHN</code> on the <code>JOHN/TOKENB</code>
          pool to attract votes from ve‑lock holders. If no votes are cast, the bribe remains posted until votes arrive and an
          epoch completes. Active voters should periodically review pools to avoid missing attractive bribes.
        </p>

        <h3>Bribe whitelist rules</h3>
        <ul>
          <li>Each pool is <strong>auto‑whitelisted</strong> to accept bribes in its own two tokens.</li>
          <li>To bribe a pool using a different token, that token must be on the <strong>Bribe Whitelist</strong>.</li>
          <li>For details on pools and provisioning, see <a href="/docs/liquidity-pools">Liquidity Pools</a>.</li>
        </ul>

        <h2>Rewards claim and rebases</h2>
        <p>
          Rebase rewards act as a dilution‑protection mechanism: a significant portion of weekly inflation is routed to
          voters, offsetting dilution of vote‑escrowed positions. Additional upside can come from trading fees and bribes.
        </p>
        <ul>
          <li><strong>Accrual</strong>: Rebase rewards accrue to your active ve‑locks.</li>
          <li><strong>Claiming</strong>: Rebase rewards must be <strong>claimed</strong> manually. Upon unlock, all accrued amounts are added to the tokens withdrawn from your ve‑lock.</li>
        </ul>

        <h2>TL; DR</h2>
        <ul>
          <li>Swaps charge a fixed 0.30% fee; fees split 50% to voters and 50% to LPs.</li>
          <li>Fees are paid in the pool’s tokens; voters receive prior‑epoch fees in the current epoch.</li>
          <li>Bribes let anyone pay voters (in allowed tokens) to steer emissions toward specific pools.</li>
          <li>Pools accept bribes in their own tokens by default; other tokens require whitelist approval.</li>
          <li>Rebases help protect ve‑lock holders from dilution; they accrue and must be claimed.</li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


