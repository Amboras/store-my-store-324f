'use client'

import { useState } from 'react'
import { X, Tag } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[#111827] text-white">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase">
        <Tag className="h-3 w-3 opacity-70 flex-shrink-0" />
        <p className="font-medium">Free shipping on all orders over &#8377;2,000 &nbsp;&mdash;&nbsp; Use code <span className="font-bold underline underline-offset-2">WELCOME10</span> for 10% off your first order</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
