'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductAccordionProps {
  description?: string | null
  details?: Record<string, string>
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[#111827]">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-gray-500 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProductAccordion({ description, details }: ProductAccordionProps) {
  return (
    <div className="border-t border-gray-100 mt-2">
      {description && (
        <AccordionItem title="Description" defaultOpen>
          <div className="prose prose-sm max-w-none text-gray-500 [&_ul]:space-y-1.5 [&_li]:text-gray-500" dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionItem>
      )}

      <AccordionItem title="Size Guide">
        <div className="space-y-2">
          <p className="mb-3">All measurements in centimetres (chest / length):</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-mono">
            <span>XS — 86 / 70</span>
            <span>S — 92 / 72</span>
            <span>M — 98 / 74</span>
            <span>L — 104 / 76</span>
            <span>XL — 112 / 78</span>
            <span>XXL — 120 / 80</span>
          </div>
          <p className="mt-3 text-xs text-gray-400">When in doubt, size up for a more relaxed fit.</p>
        </div>
      </AccordionItem>

      <AccordionItem title="Shipping & Returns">
        <ul className="space-y-2">
          <li>Free standard shipping on orders over &#8377;2,000</li>
          <li>Express shipping available at checkout</li>
          <li>Free returns within 30 days of delivery</li>
          <li>Items must be unworn with original tags attached</li>
          <li>Ships within 24 hours on weekdays</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Care Instructions">
        <ul className="space-y-2">
          <li>Machine wash cold on gentle cycle</li>
          <li>Tumble dry low or lay flat to dry</li>
          <li>Warm iron if needed — avoid collar area</li>
          <li>Do not bleach</li>
          <li>Pre-washed — minimal shrinkage expected</li>
        </ul>
      </AccordionItem>

      {details && Object.keys(details).length > 0 && (
        <AccordionItem title="Additional Details">
          <dl className="space-y-2">
            {Object.entries(details).map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <dt className="font-medium capitalize text-[#111827]">{key}:</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
        </AccordionItem>
      )}
    </div>
  )
}
