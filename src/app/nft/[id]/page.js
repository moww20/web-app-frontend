import collections from "../collections"

export default function CollectionDetailPage({ params }) {
  const { id } = params
  const col = collections.find((c) => c.id === id)
  if (!col) {
    return (
      <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">Collection Not Found</h1>
        <p className="text-[--color-muted]">The collection you are looking for does not exist.</p>
      </main>
    )
  }

  return (
    <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden glass hairline">
          <div className="aspect-[4/3] bg-white/5">
            <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">{col.name}</h1>
          <p className="mt-2 text-[--color-muted] max-w-prose">{col.description}</p>
          <div className="mt-4 text-sm text-[--color-muted]">Mint price: {col.priceMon} MON</div>
        </div>
      </div>
    </main>
  )
}


