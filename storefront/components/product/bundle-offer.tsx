'use client'

import { useState } from 'react'
import { Tag, Package, Zap } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleOfferProps {
  product: {
    id: string
    title: string
    variants?: Array<{
      id: string
      options?: Array<{ option_id?: string; option?: { id: string }; value: string }>
      calculated_price?: { calculated_amount?: number; currency_code?: string } | number
    }>
  }
  selectedVariantId: string | undefined
  selectedVariantPrice: number | null
  currency: string
}

type BundleKey = 'single' | 'double' | 'triple'

const BUNDLE_OPTIONS: Array<{
  key: BundleKey
  qty: number
  label: string
  badge: string | null
  discountPct: number
  icon: React.ElementType
}> = [
  { key: 'single', qty: 1, label: '1 Shirt', badge: null, discountPct: 0, icon: Tag },
  { key: 'double', qty: 2, label: '2 Shirts', badge: 'Most Popular', discountPct: 10, icon: Package },
  { key: 'triple', qty: 3, label: '3 Shirts', badge: 'Best Value — Save 20%', discountPct: 20, icon: Zap },
]

function formatINR(paise: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(paise / 100)
}

export default function BundleOffer({ selectedVariantId, selectedVariantPrice, currency }: BundleOfferProps) {
  const [selected, setSelected] = useState<BundleKey>('single')
  const { addItem, isAddingItem } = useCart()

  const selectedBundle = BUNDLE_OPTIONS.find(b => b.key === selected)!
  const basePrice = selectedVariantPrice ?? 0
  const discountedTotal = Math.round(basePrice * selectedBundle.qty * (1 - selectedBundle.discountPct / 100))
  const originalTotal = basePrice * selectedBundle.qty

  const handleAddBundle = () => {
    if (!selectedVariantId) {
      toast.error('Please select a size and color first')
      return
    }
    // Add items one by one for the bundle quantity
    let completed = 0
    const qty = selectedBundle.qty
    const onLast = () => {
      completed++
      if (completed === qty) {
        toast.success(
          qty === 1
            ? 'Added to bag'
            : `${qty} shirts added to bag${selectedBundle.discountPct > 0 ? ` — ${selectedBundle.discountPct}% discount applied` : ''}`
        )
      }
    }
    for (let i = 0; i < qty; i++) {
      addItem({ variantId: selectedVariantId, quantity: 1 }, { onSuccess: onLast })
    }
  }

  return (
    <div className="border border-gray-200 p-5 space-y-4 bg-[#fafaf9]">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-[#f97316]" />
        <p className="text-sm font-bold uppercase tracking-wider text-[#111827]">Bundle &amp; Save</p>
      </div>

      <div className="space-y-2.5">
        {BUNDLE_OPTIONS.map((opt) => {
          const isActive = selected === opt.key
          const optTotal = Math.round(basePrice * opt.qty * (1 - opt.discountPct / 100))
          const optOriginal = basePrice * opt.qty
          const Icon = opt.icon

          return (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-left border-2 transition-all ${
                isActive
                  ? 'border-[#111827] bg-white'
                  : 'border-transparent bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isActive ? 'border-[#111827]' : 'border-gray-300'
                }`}>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#111827]" />}
                </div>
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-[#f97316]' : 'text-gray-400'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#111827]">{opt.label}</span>
                    {opt.badge && (
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${
                        opt.key === 'triple' ? 'bg-[#f97316] text-white' : 'bg-[#111827] text-white'
                      }`}>
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.discountPct > 0 && (
                    <p className="text-xs text-green-600 font-medium mt-0.5">Save {opt.discountPct}%</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#111827]">{currency === 'inr' ? formatINR(optTotal) : `$${(optTotal / 100).toFixed(2)}`}</p>
                {opt.discountPct > 0 && (
                  <p className="text-xs text-gray-400 line-through">{currency === 'inr' ? formatINR(optOriginal) : `$${(optOriginal / 100).toFixed(2)}`}</p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <button
        onClick={handleAddBundle}
        disabled={isAddingItem || !selectedVariantId}
        className="w-full bg-[#f97316] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isAddingItem
          ? 'Adding...'
          : selectedBundle.qty === 1
          ? 'Add to Bag'
          : `Add ${selectedBundle.qty} Shirts to Bag${selectedBundle.discountPct > 0 ? ` — Save ${selectedBundle.discountPct}%` : ''}`
        }
      </button>

      {selected !== 'single' && selectedBundle.discountPct > 0 && (
        <p className="text-center text-xs text-green-600 font-medium">
          You save {currency === 'inr' ? formatINR(originalTotal - discountedTotal) : `$${((originalTotal - discountedTotal) / 100).toFixed(2)}`} with this bundle
        </p>
      )}
    </div>
  )
}
