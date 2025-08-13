export const metadata = {
  title: "Official Links — MONSWAP Docs",
  description: "Verified official links and communities.",
  alternates: { canonical: "/docs/official-links" },
}

export default function OfficialLinksPage() {
  return (
    <div className="glass hairline rounded-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">Official Links</h1>
      <div className="docs-prose">
        <ul>
          <li>Website: <span className="text-[--color-muted]">https://monswap.app</span></li>
          <li>Twitter/X: <span className="text-[--color-muted]">@monswap</span></li>
          <li>Discord: <span className="text-[--color-muted]">invite link</span></li>
          <li>GitHub: <span className="text-[--color-muted]">github.com/your-org</span></li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


