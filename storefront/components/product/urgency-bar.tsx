'use client'

import { useEffect, useState } from 'react'
import { Flame, Users } from 'lucide-react'

interface UrgencyBarProps {
  inventoryQuantity?: number | null
  manageInventory?: boolean
}

export default function UrgencyBar({ inventoryQuantity, manageInventory }: UrgencyBarProps) {
  const [viewerCount] = useState(() => Math.floor(Math.random() * 8) + 4)
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 47, seconds: 22 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1
        if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 }
        return {
          hours: Math.floor(total / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60,
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  const isLowStock = manageInventory && inventoryQuantity != null && inventoryQuantity > 0 && inventoryQuantity <= 8

  return (
    <div className="space-y-2">
      {/* Sale countdown */}
      <div className="flex items-center justify-between bg-orange-50 border border-orange-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-[#f97316] flex-shrink-0" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#111827]">Sale Ends In</p>
        </div>
        <div className="flex items-center gap-1 font-mono text-sm font-bold text-[#f97316]">
          <span>{pad(timeLeft.hours)}</span>
          <span className="opacity-60">:</span>
          <span>{pad(timeLeft.minutes)}</span>
          <span className="opacity-60">:</span>
          <span>{pad(timeLeft.seconds)}</span>
        </div>
      </div>

      {/* Viewers + stock */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Users className="h-3.5 w-3.5 text-[#f97316]" />
          <span><strong className="text-[#111827]">{viewerCount} people</strong> viewing this right now</span>
        </div>
        {isLowStock && inventoryQuantity != null && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-xs font-semibold text-red-600">Only {inventoryQuantity} left</p>
          </div>
        )}
      </div>
    </div>
  )
}
