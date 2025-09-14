"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import WagmiProvider to avoid SSR issues
const WagmiProvider = dynamic(() => import("./WagmiProviderClient"), {
  ssr: false,
  loading: () => <div className="sr-only">Loading wallet connection...</div>
})

export default function Web3Provider({ children }) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      setMounted(true)
      console.log('Web3 provider initialized successfully')

      // Add global error handler for unhandled promise rejections
      const handleUnhandledRejection = (event) => {
        if (event.reason && typeof event.reason.message === 'string') {
          // Only handle our app's network errors, not antivirus script errors
          if ((event.reason.message.includes('fetch') ||
               event.reason.message.includes('network') ||
               event.reason.message.includes('Failed to fetch')) &&
              !event.reason.message.includes('kaspersky') &&
              !event.reason.message.includes('kis.v2.scr') &&
              !event.reason.message.includes('avast') &&
              !event.reason.message.includes('eset')) {
            console.warn('Unhandled application network error:', event.reason.message)
            event.preventDefault() // Prevent the error from being logged as unhandled
          }
        }
      }

      window.addEventListener('unhandledrejection', handleUnhandledRejection)

      return () => {
        window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      }
    } catch (err) {
      console.error('Failed to initialize Web3 provider:', err)
      setError(err)
    }
  }, [])

  if (error) {
    console.warn('Web3 provider failed to load, continuing without wallet features')
    return <>{children}</>
  }

  if (!mounted) {
    return <div className="sr-only">Loading wallet connection...</div>
  }

  return <WagmiProvider>{children}</WagmiProvider>
}


