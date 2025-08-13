"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import DocsSidebar from "./toc/DocsSidebar"
import RightToc from "./toc/RightToc"
import DocNav from "./components/DocNav"
import Breadcrumbs from "./components/Breadcrumbs"
import HeadingAnchors from "./components/HeadingAnchors"
import ScrollRestorer from "./components/ScrollRestorer"

export default function DocsShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div>
      <a href="#docs-main" className="fixed left-2 -top-10 focus:top-2 z-[100] px-3 py-2 rounded-full bg-white/10 backdrop-blur hairline">Skip to content</a>
      <ScrollRestorer />
      <div className="flex gap-8">
        <div className="hidden xl:block sticky top-[9rem] self-start max-h-[calc(100vh-9rem)] overflow-auto"><DocsSidebar /></div>
        <div className="flex-1 min-w-0">
          <div className="xl:hidden mb-4">
            <button className="px-3 py-2 rounded-full hairline hover:bg-white/5" onClick={() => setMobileOpen(true)}>Docs menu</button>
          </div>
          <Breadcrumbs />
          <HeadingAnchors />
          <div id="docs-main" className="origin-top animate-fadein-500">
            {children}
          </div>
          <div className="border-t border-white/10 mt-8 pt-6">
            <DocNav />
          </div>
        </div>
        <div className="hidden xl:block sticky top-[9rem] self-start max-h-[calc(100vh-9rem)] overflow-auto"><RightToc /></div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] xl:hidden">
          <button className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Close" onClick={()=>setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[#0b0b0b] shadow-2xl hairline-r overflow-auto p-2">
            <DocsSidebar />
          </div>
        </div>
      )}
    </div>
  )
}


