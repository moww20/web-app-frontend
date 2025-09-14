"use client"

import { useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { AnimatePresence, motion } from "framer-motion"

export default function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [isOpen, setIsOpen] = useState(false)

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-full hairline text-sm text-foreground/90 hover:bg-white/5 transition hover-tint hover-vibrant hover-outline"
        >
          {short}
        </button>
        <button
          onClick={() => disconnect()}
          className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-white/5 transition hover-tint hover-vibrant"
          title="Disconnect"
          aria-label="Disconnect"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21H7a4 4 0 01-4-4V7a4 4 0 014-4h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2 rounded-full bg-accent-gradient text-white hover:opacity-90 transition-opacity hover-vibrant hover-outline"
      >
        Connect Wallet
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-[#0b0b0f] border border-white/10 rounded-2xl p-6 z-50 max-w-sm mx-auto"
              initial={{ opacity: 0, scale: 0.95, y: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-50%" }}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Connect Wallet</h3>
              <div className="space-y-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => {
                      connect({ connector })
                      setIsOpen(false)
                    }}
                    disabled={isPending}
                    className="w-full p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-left flex items-center gap-3 disabled:opacity-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {connector.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm">{connector.name}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


