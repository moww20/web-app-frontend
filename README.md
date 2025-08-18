This is a [Next.js](https://nextjs.org) project that runs exclusively with [Bun](https://bun.sh/).

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
