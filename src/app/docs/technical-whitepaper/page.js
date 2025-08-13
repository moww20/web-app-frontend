export const metadata = {
  title: "Technical Whitepaper — MONSWAP Docs",
  description: "Formal specification and security notes.",
  alternates: { canonical: "/docs/technical-whitepaper" },
}

export default function TechnicalWhitepaperPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Technical Whitepaper</h1>
      <div className="docs-prose">
        <p>Formal specification of the protocol, core algorithms, and security considerations.</p>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


