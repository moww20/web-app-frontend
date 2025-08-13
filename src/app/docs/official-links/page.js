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
          <li>
            Website: {" "}
            <a href="https://monswap.app" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-90">
              monswap.app
            </a>
          </li>
          <li>
            Twitter/X: {" "}
            <a href="https://x.com/monswapapp" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-90">
              @monswapapp
            </a>
          </li>
          <li>
            Discord: {" "}
            <a href="https://discord.com/invite/QnrjnCyU7Q" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-90">
              Join our Discord
            </a>
          </li>
          <li>
            GitHub: <span className="text-[--color-muted]">will open‑source soon!</span>
          </li>
        </ul>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6"></div>
    </div>
  )
}


