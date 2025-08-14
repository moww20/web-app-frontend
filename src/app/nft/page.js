"use client"

import { useEffect, useState } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import Link from "next/link"
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
  const { isConnected, address } = useAccount()
  const [selected, setSelected] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [ethValue, setEthValue] = useState("")

  const { writeContract, data: txHash, error: writeError, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash })

  useEffect(() => {
    if (!selected) return
    setEthValue(selected.priceEth || "")
  }, [selected])

  const onMint = async () => {
    if (!isConnected) return
    if (!selected?.address) return
    const qty = Math.max(1, Number(quantity) || 1)
    let value
    try {
      value = ethValue ? parseEther(ethValue) : undefined
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
    setQuantity(1)
    setEthValue("")
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
              <div
                key={c.id}
                className="text-left glass hairline rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-transform h-full flex flex-col"
              >
                <Link href={`/nft/${c.id}`} className="block">
                  <div className="aspect-video w-full bg-white/5 overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="p-3 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base md:text-lg font-medium tracking-tight">{c.name}</h3>
                    <span className="text-[10px] md:text-xs text-[--color-muted]">{c.priceEth} ETH</span>
                  </div>
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <p className="text-xs md:text-sm text-[--color-muted] line-clamp-2 pr-2">{c.description}</p>
                    <button
                      onClick={() => setSelected(c)}
                      className="shrink-0 inline-flex items-center justify-center rounded-full bg-accent-gradient text-white px-3 py-1.5 text-xs md:text-sm"
                    >
                      Mint
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <button aria-label="Close" onClick={closeModal} className="absolute inset-0 bg-black/50" />
          <div className="relative z-[101] w-full max-w-md glass hairline rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Mint {selected.name}</h2>
                {!selected.address && (
                  <p className="text-xs text-yellow-300 mt-1">
                    Contract not configured. Set env var for this collection and reload.
                  </p>
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

            <div className="rounded-xl overflow-hidden mb-4">
              <img src={selected.image} alt={selected.name} className="w-full h-40 object-cover" />
            </div>

            <div className="grid gap-4">
              <label className="grid gap-1 text-sm">
                <span className="text-[--color-muted]">Quantity</span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-lg bg-white/5 px-3 py-2 outline-none border border-white/10 focus:border-white/20"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="text-[--color-muted]">ETH value (optional per tx)</span>
                <input
                  type="text"
                  placeholder="e.g. 0.02"
                  value={ethValue}
                  onChange={(e) => setEthValue(e.target.value)}
                  className="w-full rounded-lg bg-white/5 px-3 py-2 outline-none border border-white/10 focus:border-white/20"
                />
              </label>

              <button
                disabled={!isConnected || !selected.address || isPending}
                onClick={onMint}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-accent-gradient text-white px-5 py-2.5 disabled:opacity-50"
              >
                {isPending ? "Confirm in wallet…" : isConfirming ? "Waiting for confirmation…" : "Mint"}
              </button>
            </div>

            <div className="mt-4 text-sm">
              {writeError && <p className="text-red-400">{writeError.shortMessage || writeError.message}</p>}
              {txHash && <p className="text-[--color-muted] break-all">Tx: {txHash}</p>}
              {isConfirmed && <p className="text-green-400">Mint confirmed!</p>}
            </div>

            <div className="mt-6 text-xs text-[--color-muted]">
              <p>Connected: {isConnected ? address : "Not connected"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


