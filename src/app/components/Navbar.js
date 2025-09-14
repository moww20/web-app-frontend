"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ConnectButton from "./ConnectButton"
import SearchBar from "./SearchBar"
import DonateButton from "./DonateButton"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)

  useEffect(() => {
    // Close mobile menu on route change
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const linkClass = (href) =>
    `px-3 py-1.5 rounded-full text-sm transition ${pathname.startsWith(href) ? "bg-white/10 text-foreground" : "text-foreground/90 hover:bg-white/5"}`
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm hairline-b"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
        <div className="flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => setBrandOpen(true)}
            onMouseLeave={() => setBrandOpen(false)}
          >
            <Link href="/" className="text-lg tracking-tight font-semibold inline-flex items-center gap-1 whitespace-nowrap" aria-expanded={brandOpen}>
              <span className="text-accent-gradient">Web3 DEX</span>
              <ChevronDown className={`w-4 h-4 text-foreground/80 transition-transform ${brandOpen ? "-rotate-90" : ""}`} />
            </Link>
            {/* Hover bridge to keep dropdown open across the gap */}
            <div className="absolute left-0 right-0 top-full h-2" />
            <div className={`absolute left-0 mt-2 w-64 bg-[#0b0b0f] hairline rounded-xl shadow-2xl p-1 transition ${brandOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
              <Link href="/nft" className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm">NFTs</Link>
              <a
                href="https://docs.web3dex.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
              >
                Docs
              </a>
              <DonateButton asMenuItem />
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/trade" className={`${linkClass('/trade')} max-[559px]:hidden`}>Trade</Link>
            <Link href="/pools" className={`${linkClass('/pools')} max-[767px]:hidden`}>Pools</Link>
            <Link href="/dashboard" className={`${linkClass('/dashboard')} max-[1023px]:hidden`}>Dashboard</Link>
            <Link href="/vote" className={`${linkClass('/vote')} max-[1279px]:hidden`}>Vote</Link>
          </nav>
        </div>
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end gap-6">
          <div className="hidden lg:flex items-center gap-2">
            <svg className="w-7 h-7 text-foreground/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v6l7 5 7-5V7l-7-5zM5 8.5L10 12l5-3.5V11L10 14.5 5 11V8.5z" clipRule="evenodd" />
            </svg>
            <ConnectButton />
          </div>
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 text-foreground/90"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      {mounted && createPortal(
        (
          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.button
                  aria-label="Close menu"
                  className="fixed inset-0 z-[100] bg-black/0 sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.45 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMobileOpen(false)}
                />
                <motion.div
                  className="fixed inset-y-0 right-0 z-[101] w-80 max-w-[85vw] bg-[#0b0b0b] shadow-2xl hairline-l sm:hidden p-4"
                  initial={{ x: 320 }}
                  animate={{ x: 0 }}
                  exit={{ x: 320 }}
                  transition={{ type: "spring", stiffness: 420, damping: 40 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[--color-muted]">Menu</span>
                    <button
                      aria-label="Close"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid gap-2">
                    <Link href="/trade" className={linkClass('/trade')}>Trade</Link>
                    <Link href="/pools" className={linkClass('/pools')}>Pools</Link>
                    <Link href="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
                    <Link href="/vote" className={linkClass('/vote')}>Vote</Link>
                    <DonateButton asMenuItem />
                    <Link href="/nft" className={linkClass('/nft')}>NFTs</Link>
                    <a
                      href="https://docs.web3dex.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass('/docs')}
                    >
                      Docs
                    </a>
                    <div className="pt-2">
                      <ConnectButton />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        ),
        document.body
      )}
    </motion.nav>
  )
}


