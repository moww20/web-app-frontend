// Hierarchical structure used for sidebar, breadcrumbs, and next/prev
export const docsItems = [
  {
    label: "Getting Started",
    children: [
      { href: "/docs/introduction", label: "Introduction", description: "Overview of MONSWAP and this documentation." },
    ],
  },
  {
    label: "Protocol",
    children: [
      { href: "/docs/fees-and-bribes", label: "Fees and Bribes", description: "Trading fees, LP fees, protocol fees, and bribe incentives." },
      { href: "/docs/bribe-whitelist", label: "Bribe Whitelist", description: "Rules and process for allowing tokens to be used as bribes." },
      { href: "/docs/emissions", label: "Emissions", description: "Token emissions schedule and distribution." },
      { href: "/docs/liquidity-pools", label: "Liquidity Pools", description: "Providing, removing, and understanding liquidity." },
      { href: "/docs/voting", label: "Voting", description: "Governance process and using voting power." },
    ],
  },
  {
    label: "Project",
    children: [
      { href: "/docs/roadmap", label: "Roadmap", description: "Planned milestones and features." },
      { href: "/docs/official-links", label: "Official Links", description: "Verified official links and communities." },
      { href: "/docs/technical-whitepaper", label: "Technical Whitepaper", description: "Formal specification and security notes." },
    ],
  },
  {
    label: "Tutorials",
    children: [
      { href: "/docs/tutorials/swaps", label: "Swap Tutorial", description: "How to perform a swap on Monswap." },
      { href: "/docs/tutorials/add-liquidity", label: "Add Liquidity", description: "Provide liquidity to a pool." },
      { href: "/docs/tutorials/voting", label: "Voting Tutorial", description: "Cast votes and direct emissions." },
      { href: "/docs/tutorials/bribes", label: "Bribes Tutorial", description: "Post and claim bribes effectively." },
    ],
  },
]

// Flattened list for next/prev ordering
export const flatDocs = docsItems.flatMap(section => section.children)


