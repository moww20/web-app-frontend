function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold tracking-tight mb-3">{title}</h2>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </section>
  )
}

export default function DocsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">MONSWAP Docs</h1>
        <p className="text-sm text-[--color-muted] mt-2">GitBook-style internal documentation.</p>
      </div>

      <div className="glass hairline rounded-2xl p-6">
        <Section title="Welcome">
          <p>Select a topic from the sidebar to get started.</p>
        </Section>
      </div>
    </div>
  )
}


