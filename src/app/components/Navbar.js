"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ConnectButton from "./ConnectButton"
import SearchBar from "./SearchBar"

export default function Navbar() {
  const pathname = usePathname()
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
          <Link href="/" className="text-lg tracking-tight font-semibold text-accent-gradient">monswap</Link>
          <nav className="hidden sm:flex items-center gap-2">
            <Link href="/trade" className={linkClass('/trade')}>Trade</Link>
            <Link href="/pools" className={linkClass('/pools')}>Pools</Link>
            <Link href="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
            <Link href="/vote" className={linkClass('/vote')}>Vote</Link>
          </nav>
        </div>
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end gap-6">
          <button className="hidden md:inline-flex px-4 py-2 rounded-full text-sm text-foreground/90 hover:text-foreground transition-colors">Docs</button>
          <div className="hidden md:block">
            <ConnectButton />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}


