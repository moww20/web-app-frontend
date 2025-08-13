"use client"

import { useEffect } from "react"

function slugify(text) {
  return (text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function HeadingAnchors() {
  useEffect(() => {
    try {
      const headings = Array.from(document.querySelectorAll("main h2, main h3"))
      headings.forEach((h) => {
        if (!h.id) h.id = slugify(h.textContent)
        h.classList.add("group", "relative", "pr-8")
        // Avoid duplicating button
        if (h.querySelector('[data-anchor-btn]')) return
        const btn = document.createElement("button")
        btn.setAttribute("data-anchor-btn", "")
        btn.setAttribute("aria-label", "Copy link to heading")
        btn.className = "absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition text-[--color-muted] hover:text-foreground"
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14l4-4m-7 7a4 4 0 010-6l1-1m8 8a4 4 0 010-6l-1-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        btn.addEventListener("click", async (e) => {
          e.preventDefault()
          const url = `${location.origin}${location.pathname}#${h.id}`
          try { await navigator.clipboard.writeText(url) } catch {}
          history.replaceState(null, "", `#${h.id}`)
        })
        h.appendChild(btn)
      })
    } catch {}
  })
  return null
}


