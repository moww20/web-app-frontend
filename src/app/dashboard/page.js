export const metadata = {
  title: "Dashboard — MONSWAP",
  description: "Overview of your MONSWAP account and portfolio.",
}

export default function DashboardPage() {
  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8">Dashboard</h1>
      <div className="origin-top opacity-0 translate-y-3 animate-[fadein_500ms_ease_forwards]">

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass hairline rounded-2xl p-6">
          <div className="text-sm text-[--color-muted] mb-1">Portfolio Value</div>
          <div className="text-2xl">—</div>
        </div>
        <div className="glass hairline rounded-2xl p-6">
          <div className="text-sm text-[--color-muted] mb-1">24h PnL</div>
          <div className="text-2xl">—</div>
        </div>
        <div className="glass hairline rounded-2xl p-6">
          <div className="text-sm text-[--color-muted] mb-1">Open Positions</div>
          <div className="text-2xl">—</div>
        </div>
      </div>

      {/* Deposited & Staked Liquidity helper */}
      <section className="glass hairline rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Deposited & Staked Liquidity</h2>
        <p className="text-sm text-[--color-muted]">
          To receive emissions <a className="underline hover:opacity-90">deposit and stake</a> your liquidity first.
        </p>
      </section>

      {/* Staked RAWR Token table */}
      <section className="glass hairline rounded-2xl overflow-hidden mb-8">
        <div className="px-4 py-3 text-sm text-[--color-muted] hairline-b">Staked RAWR Token</div>
        <div className="grid grid-cols-7 px-4 py-2 text-sm text-[--color-muted] hairline-b bg-white/5">
          <div className="col-span-2">Lock</div>
          <div>APR</div>
          <div>Rebase</div>
          <div>Locked</div>
          <div>Voting Power</div>
          <div>Unlock Date</div>
        </div>
        {/* Example row placeholder */}
        <div className="grid grid-cols-7 items-start px-4 py-4 text-sm">
          <div className="col-span-2 flex items-center gap-3 self-center">
            <div className="w-6 h-6 rounded-full bg-white/10" />
            <div className="font-medium">Locked #—</div>
          </div>
          <div className="self-center">0.00%</div>
          <div className="flex flex-col items-start leading-tight">
            <div>0.0 RAWR</div>
            <button className="text-xs mt-1 underline text-[--color-muted] tracking-wide hover:opacity-90">
              Claim
            </button>
          </div>
          <div className="flex flex-col items-start leading-tight">
            <div>—</div>
            <button className="text-xs mt-1 underline text-[--color-muted] tracking-wide hover:opacity-90">
              Withdraw
            </button>
          </div>
          <div className="self-center">—</div>
          <div className="text-right md:text-left self-center">—</div>
        </div>
        {/* actions row (removed extra actions for now) */}
      </section>

      {/* Voting Rewards */}
      <section className="glass hairline rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-3">Voting Rewards</h2>
        <div className="text-sm text-[--color-muted]">No rewards found.</div>
      </section>
      </div>
      <style jsx global>{`
        @keyframes fadein {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}


