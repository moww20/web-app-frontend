"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsItems } from "./items"
import { useEffect, useState } from "react"

export default function DocsSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState({})

  // Restore persisted state on mount (client-only) to avoid SSR mismatch
  useEffect(() => {
    try {
      const raw = localStorage.getItem('monswap.docs.open')
      if (raw) setOpen(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('monswap.docs.open', JSON.stringify(open)) } catch {}
  }, [open])

  // Auto-open the section containing the current page
  useEffect(() => {
    setOpen(prev => {
      const next = { ...prev }
      for (const section of docsItems) {
        const has = (section.children || []).some(c => pathname.startsWith(c.href))
        if (has) next[section.label] = true
      }
      return next
    })
  }, [pathname])

  return (
    <aside className="w-64 max-w-[70vw] shrink-0">
      <div className="sticky top-20">
        <div className="mb-4 text-sm text-[--color-muted]">Docs</div>
        <div className="grid gap-2">
          {docsItems.map((section) => (
            <div key={section.label}>
              <button
                onClick={() => setOpen(o => ({ ...o, [section.label]: !o[section.label] }))}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 flex items-center justify-between"
                aria-expanded={open[section.label] ? 'true' : 'false'}
              >
                <span className="text-[13px] tracking-wide text-foreground/90">{section.label}</span>
                <svg className={`w-3 h-3 transition ${open[section.label] ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {open[section.label] && (
                <nav className="mt-1 pl-2 grid gap-1">
                  {(section.children || []).map((item) => {
                    const active = pathname.startsWith(item.href)
                    return (
                      <Link key={item.href} href={item.href}
                        className={`px-3 py-1.5 rounded-full text-sm transition ${active ? "bg-white/10 text-foreground" : "text-foreground/90 hover:bg-white/5"}`}>
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}


