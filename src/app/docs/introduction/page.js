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
        <p>Welcome to the MONSWAP documentation. This guide explains how the protocol works and how to use it.</p>
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


