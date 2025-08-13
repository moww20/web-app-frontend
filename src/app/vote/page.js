export const metadata = {
  title: "Voting — MONSWAP",
  description: "Participate in protocol governance on MONSWAP.",
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
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">Voting</h1>
      </div>

      <div className="origin-top opacity-0 translate-y-3 animate-[fadein_500ms_ease_forwards]">
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
      <style jsx global>{`
        @keyframes fadein {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}


