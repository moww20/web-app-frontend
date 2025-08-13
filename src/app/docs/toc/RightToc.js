"use client"

import { useEffect, useState } from "react"

export default function RightToc() {
  const [headings, setHeadings] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("main h2, main h3"))
    const mapped = nodes.map(n => ({ id: n.id || n.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "", text: n.textContent || "" }))
    // Ensure IDs exist
    nodes.forEach((n, i) => { if (!n.id) n.id = mapped[i].id })
    setHeadings(mapped)

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] })
    nodes.forEach(n => observer.observe(n))

    const onHash = () => {
      const id = location.hash.replace('#','')
      if (!id) return
      setActive(id)
    }
    window.addEventListener('hashchange', onHash)
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <aside className="w-64 max-xl:hidden">
      <div className="sticky top-20">
        <div className="mb-2 text-sm text-[--color-muted]">On this page</div>
        <nav className="grid gap-1 text-sm">
          {headings.map((h) => (
            <a key={h.id} href={`#${h.id}`} className={`px-2 py-1 rounded-full hover:bg-white/5 ${active===h.id? 'bg-white/10' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(h.id)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                history.replaceState(null, '', `#${h.id}`)
                setActive(h.id)
              }}
            >{h.text}</a>
          ))}
        </nav>
      </div>
    </aside>
  )
}


