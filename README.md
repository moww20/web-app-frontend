This is a forkable Web3 DEX frontend built with [Next.js](https://nextjs.org) and runs exclusively with [Bun](https://bun.sh/).

## Prerequisites

- Bun 1.2 or newer. Install:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting Started

Install dependencies (uses `bun.lock`):

```bash
bun install
```

Start the development server (Bun only):

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

To change the port:

```bash
bun run dev -- -p 3001
```

## Scripts

- `bun run dev`: Start Next.js dev server with Turbopack
- `bun run build`: Production build
- `bun run start`: Start production server
- `bun run lint`: Lint

## Notes

- This repo enforces Bun for `dev` via a predev check. Use `bun run ...` for scripts.
- Remove legacy lockfiles if present (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`). Bun uses `bun.lock`.

## Configuration

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL`: Base URL used during SSR/prerender (optional)
- Optional NFT contract addresses: `NEXT_PUBLIC_NFT_GENESIS_ADDRESS`, `NEXT_PUBLIC_NFT_FOUNDERS_ADDRESS`, `NEXT_PUBLIC_NFT_TESTERS_ADDRESS`

**Note:** This project no longer requires external wallet connection services. Wallet connections work directly with browser wallets (MetaMask, Coinbase Wallet, etc.) without needing API keys or external services.

## Customization

This frontend is designed to be easily customizable for your own DEX:

1. **Branding**: Update the brand name in `src/app/components/Navbar.js` and `src/app/components/SplashPage.js`
2. **Colors**: Modify CSS variables in `src/app/globals.css` for theming
3. **Contracts**: Update contract addresses in environment variables
4. **Features**: Add or remove features in the respective component files
5. **Documentation**: Update docs links to point to your own documentation

## Features

- ⚡ Lightning fast trading interface
- 🏦 Deep liquidity pool management
- 🌾 Yield farming incentives
- 🏛️ Governance voting system
- 🎨 NFT marketplace integration
- 🔗 Multi-chain wallet connectivity (MetaMask, Coinbase Wallet, injected wallets)
- 🛡️ No external dependencies - works with browser wallets directly
