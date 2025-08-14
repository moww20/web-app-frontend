export const collections = [
  {
    id: "genesis",
    name: "Genesis Mons",
    description: "Early collection for protocol supporters.",
    image: "/pixelmonsters.png",
    address: (process.env.NEXT_PUBLIC_NFT_GENESIS_ADDRESS || "").trim(),
    priceEth: "0.01",
  },
  {
    id: "founders",
    name: "Founders Set",
    description: "Limited founders series on testnet.",
    image: "/pixelmonsters.png",
    address: (process.env.NEXT_PUBLIC_NFT_FOUNDERS_ADDRESS || "").trim(),
    priceEth: "0.02",
  },
  {
    id: "testers",
    name: "Testnet Explorers",
    description: "Mint to support testing and QA.",
    image: "/pixelmonsters.png",
    address: (process.env.NEXT_PUBLIC_NFT_TESTERS_ADDRESS || "").trim(),
    priceEth: "0.00",
  },
]

export default collections


