import DocsShell from "./DocsShell"

export const metadata = {
  title: "Docs — MONSWAP",
  description: "Documentation for MONSWAP.",
  openGraph: {
    title: "MONSWAP Docs",
    description: "Documentation for MONSWAP.",
    url: "/docs",
    siteName: "MONSWAP",
    images: [
      { url: "/mon-2.svg", width: 1200, height: 630, alt: "MONSWAP" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MONSWAP Docs",
    description: "Documentation for MONSWAP.",
    images: ["/mon-2.svg"],
  },
}

export default function DocsLayout({ children }) {
  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16" role="main">
      <DocsShell>{children}</DocsShell>
    </main>
  )
}


