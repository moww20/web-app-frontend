"use client"

export default function SearchBar() {
  return (
    <div className="w-full max-w-[20rem]">
      <div className="relative input-pill rounded-full hairline">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search tokens and pools"
          className="w-full h-10 rounded-full bg-transparent pl-9 pr-10 text-sm placeholder:text-[--color-muted] focus:outline-none"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[--color-muted]">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md hairline bg-white/5 text-[11px]">/</span>
        </span>
      </div>
    </div>
  )
}


