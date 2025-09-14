"use client"

import { useEffect, useState } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import Link from "next/link"
import Image from "next/image"
import collections from "./collections"


// Common mint signature for ERC721A-style contracts: mint(uint256 quantity) payable
const contractAbi = [
  {
    type: "function",
    name: "mint",
    stateMutability: "payable",
    inputs: [{ name: "quantity", type: "uint256" }],
    outputs: [],
  },
]

export default function NftMintPage() {
  const { isConnected } = useAccount()
  const [selected, setSelected] = useState(null)
  const [quantity] = useState(1)
  const [monValue, setMonValue] = useState("")

  const { writeContract, data: txHash, error: writeError, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash })

  useEffect(() => {
    if (!selected) return
    setMonValue(selected.priceMon || "")
  }, [selected])

  const onMint = async () => {
    if (!isConnected) return
    if (!selected?.address) return
    const qty = 1
    let value
    try {
      value = monValue ? parseEther(monValue) : undefined
    } catch (_) {
      value = undefined
    }
    try {
      await writeContract({
        address: selected.address,
        abi: contractAbi,
        functionName: "mint",
        args: [BigInt(qty)],
        value,
      })
    } catch (_) {}
  }

  const closeModal = () => {
    setSelected(null)
    setMonValue("")
  }

  return (
    <>
      <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16">
        <div className="overflow-hidden">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight">NFT Collections</h1>
            <p className="text-sm text-[--color-muted]">Choose a testnet collection to mint.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((c) => (
              <div key={c.id} className="group relative h-full">
                <div className="text-left glass hairline rounded-2xl overflow-hidden transition-transform duration-300 h-full flex flex-col group-hover:-translate-y-0.5 group-hover:scale-[1.01]">
                  <Link href={`/nft/${c.id}`} className="block">
                    <div className="relative aspect-video w-full bg-white/5 overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={true}
                      />
                    </div>
                  </Link>
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base md:text-lg font-medium tracking-tight">{c.name}</h3>
                      <span className="text-[10px] md:text-xs text-[--color-muted]">{c.priceMon} MON</span>
                    </div>
                    <div className="mt-1.5 flex items-start justify-between gap-3">
                      <p className="text-xs md:text-sm text-[--color-muted] line-clamp-2 pr-2">{c.description}</p>
                      <button
                        onClick={() => setSelected(c)}
                        className="shrink-0 inline-flex items-center justify-center rounded-full bg-accent-gradient text-white px-3 py-1.5 text-xs md:text-sm transition-transform duration-200 hover:scale-[1.02] hover:opacity-95 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.18),0_0_16px_4px_rgba(90,168,255,0.25)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        Mint
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center">
          <button aria-label="Close" onClick={closeModal} className="absolute inset-0 bg-black/50" />
          <div className="relative z-[101] w-full max-w-lg glass hairline rounded-2xl p-4 md:p-5 mt-24 md:mt-28">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{selected.name}</h2>
                  <a
                    href="https://etherscan.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open blockchain explorer"
                    className="inline-flex items-center justify-center w-7 h-7 rounded hairline hover:bg-white/5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17l10-10M17 7H7m10 0v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <div className="mt-1 text-xs text-[--color-muted]">On Ethereum Mainnet</div>
                {!selected.address && (
                  <p className="text-xs text-yellow-300 mt-1">Contract not configured. Set env var for this collection and reload.</p>
                )}
              </div>
              <button
                aria-label="Close"
                onClick={closeModal}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Top grid: image + meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="relative rounded-xl overflow-hidden h-56 md:h-56">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-[--color-muted]">Total Mints</div>
                    <div className="text-lg font-medium">{selected.totalMints ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-[--color-muted]">Max Supply</div>
                    <div className="text-lg font-medium">{selected.maxSupply ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-[--color-muted]">Mint Progress</div>
                    <div className="text-lg font-medium">{selected.totalMints != null && selected.maxSupply ? `${Math.min(100, Math.round((selected.totalMints / selected.maxSupply) * 100))}%` : "—"}</div>
                  </div>
                  <div>
                    <div className="text-[--color-muted]">Ends In</div>
                    <div className="text-lg font-medium">{selected.endsIn ?? "—"}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/nft/${selected.id}`} className="inline-flex items-center justify-center rounded-full hairline px-4 py-2 text-sm hover:bg-white/5">
                    Explore Collection
                    <svg className="w-3.5 h-3.5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17l10-10M17 7H7m10 0v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>

                {/* Inline mint controls below Explore */}
                <div className="mt-4 hairline-t pt-3">
                  <div className="grid grid-cols-1 gap-3 items-center">
                    <div>
                      <div className="text-[--color-muted] text-sm">Price</div>
                      <div className="text-xl font-semibold">{selected.priceMon} MON</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[--color-muted] text-sm">Quantity</div>
                      <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1.5 text-sm opacity-60">
                        <button disabled className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-white/5 cursor-not-allowed">–</button>
                        <span className="min-w-[2ch] text-center">1</span>
                        <button disabled className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-white/5 cursor-not-allowed">+</button>
                      </div>
                    </div>
                    <div className="justify-self-start md:justify-self-end">
                      <button
                        disabled={!isConnected || !selected.address || isPending}
                        onClick={onMint}
                        className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-accent-gradient text-white px-5 py-2.5 disabled:opacity-50 transition-transform duration-200 hover:scale-[1.02] hover:opacity-95 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.18),0_0_16px_4px_rgba(90,168,255,0.25)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        {isPending ? "Confirm in wallet…" : isConfirming ? "Waiting for confirmation…" : "Mint"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      )}
    </>
  )
}


