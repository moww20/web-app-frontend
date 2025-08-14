"use client"

import { useAppKit } from "@reown/appkit/react"
import { useAccount, useDisconnect } from "wagmi"

export default function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => open?.()}
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
    <button onClick={() => open?.()} className="px-5 py-2 rounded-full bg-accent-gradient text-white hover:opacity-90 transition-opacity hover-vibrant hover-outline">
      Connect Wallet
    </button>
  )
}


