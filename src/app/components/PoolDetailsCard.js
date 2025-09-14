"use client"

export default function PoolDetailsCard({ pool = {} }) {
  const {
    pair = "RAWR / TOKEN",
    tvl = "$—",
    marketCap = "$—",
    fdv = "$—",
    volume24h = "$—",
    feesCollected = "$—",
    lpApr = "—",
    bribes = "$—",
    votingApy = "—",
    yourPosition = "$—",
  } = pool

  const Item = ({ label, value }) => (
    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
      <span className="text-[--color-muted] text-sm">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  )

  return (
    <div className="glass hairline rounded-2xl w-full max-w-lg mx-auto overflow-hidden">
      <div className="p-4">
        <div className="mb-4">
          <div className="text-xl font-medium">{pair}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Item label="TVL" value={tvl} />
          <Item label="Market Cap" value={marketCap} />
          <Item label="FDV" value={fdv} />
          <Item label="24H Volume" value={volume24h} />
          <Item label="Fees Collected (0.30%)" value={feesCollected} />
          <Item label="LP APR" value={lpApr} />
          <Item label="Bribes" value={bribes} />
          <Item label="Voting APR" value={votingApy} />
          <Item label="Your Position" value={yourPosition} />
        </div>
      </div>
    </div>
  )
}


