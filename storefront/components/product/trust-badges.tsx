import { ShieldCheck, RotateCcw, Truck, Award } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    desc: 'Genuine quality guaranteed',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    desc: 'No questions asked',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On orders over ₹2,000',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    desc: 'Or your money back',
  },
]

export default function TrustBadges() {
  return (
    <div className="border-t pt-6">
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <div key={badge.title} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#111827]/5 flex items-center justify-center">
                <Icon className="h-4 w-4 text-[#111827]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">{badge.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{badge.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 py-3 bg-gray-50 border border-gray-100">
        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
        <p className="text-xs text-gray-500">Secure checkout — 256-bit SSL encrypted</p>
      </div>
    </div>
  )
}
