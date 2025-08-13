export const metadata = {
  title: "Bribe Whitelist — MONSWAP Docs",
  description: "Rules and process for allowing tokens to be used as bribes.",
  alternates: { canonical: "/docs/bribe-whitelist" },
}

export default function BribeWhitelistPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Bribe Whitelist</h1>
      <div className="docs-prose">
        <p><em>Which tokens can be used to bribe voters, and how new tokens are added.</em></p>

        <h2>Overview</h2>
        <ul>
          <li>Pools are <strong>auto‑whitelisted</strong> to accept bribes in their two underlying tokens.</li>
          <li>To bribe a pool with any other token, that token must be on the <strong>Bribe Whitelist</strong>.</li>
          <li>At launch, bribes begin with <strong>MON</strong> and the protocol token; more tokens can be added over time.</li>
        </ul>

        <h2>Rationale</h2>
        <p>
          Curating bribe tokens helps keep the protocol healthy and the interface usable by avoiding spam and illiquid assets.
          Projects should propose tokens that improve liquidity depth and trading quality across the ecosystem.
        </p>

        <h2>How to request a token</h2>
        <ol>
          <li>Join our <a href="https://discord.com/invite/QnrjnCyU7Q" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-90">Discord</a>.</li>
          <li>Provide token details (contract, chain info, liquidity sources) and the target pool(s).</li>
          <li>Explain the intended incentive plan (amount, cadence) and expected impact on liquidity and volume.</li>
        </ol>

        <h2>Guidelines</h2>
        <ul>
          <li>Prefer tokens with sufficient circulating liquidity and reliable price discovery.</li>
          <li>Align bribes with pools that benefit users (depth, spreads, routing efficiency).</li>
          <li>We may remove tokens that create excessive fragmentation or unhealthy incentives.</li>
        </ul>

        <h2>TL; DR</h2>
        <ul>
          <li>Pools can always be bribed with their own two tokens.</li>
          <li>Other tokens require whitelist approval; launch set includes MON and the protocol token.</li>
          <li>Request additions via Discord with token and plan details.</li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


