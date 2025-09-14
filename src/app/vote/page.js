export const metadata = {
  title: "Voting — Web3 DEX",
  description: "Participate in protocol governance on Web3 DEX.",
}

export default function VotingPage() {
  const rows = Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="grid grid-cols-6 items-center px-4 py-3 hairline-b last:hairline-b-0">
      <div className="col-span-3">Proposal #{i + 1} — Title TBD</div>
      <div className="text-[--color-muted]">Status: Pending</div>
      <div className="text-[--color-muted]">Ends: —</div>
      <div>
        <button className="px-3 py-1.5 rounded-lg hairline hover:bg-white/5">View</button>
      </div>
    </div>
  ))

  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">Voting</h1>
      </div>

      <div className="origin-top animate-fadein-500">
        <section className="glass hairline rounded-2xl overflow-hidden">
          <div className="grid grid-cols-6 px-4 py-3 text-sm text-[--color-muted] hairline-b">
            <div className="col-span-3">Proposal</div>
            <div>Status</div>
            <div>End Time</div>
            <div>Action</div>
          </div>
          {rows}
        </section>
      </div>
    </main>
  )
}


