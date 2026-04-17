'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Star, CheckCircle } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=90'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400&q=90'
const EDITORIAL_IMAGE = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1400&q=90'

const socialProofItems = [
  '"Honestly the best shirt I\'ve ever worn. The fabric is incredible."',
  '"Finally a shirt that fits right and lasts."',
  '"I bought 3 more after my first order. Absolute quality."',
  '"Shipped fast, packaging was premium. Shirt is even better."',
  '"Wore it to a meeting on Monday and a dinner on Friday. Perfect."',
  '"This is what a shirt should feel like."',
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setNewsletterDone(true)
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-[#fafaf9]">
        <div className="container-custom grid lg:grid-cols-2 gap-0 lg:gap-16 items-center py-16 lg:py-24">
          {/* Copy */}
          <div className="space-y-7 animate-fade-in-up order-2 lg:order-1 pt-8 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f97316]">
              New Season Collection
            </p>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-semibold leading-[1.05] tracking-tight text-[#111827]">
              Shirts Built<br />
              to <span className="italic text-[#f97316]">Last.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-md leading-relaxed font-light">
              Premium fabrics. Precise tailoring. Shirts that move from boardroom to weekend without missing a beat.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 bg-[#111827] text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#1f2937] transition-colors"
                prefetch={true}
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[#111827] text-[#111827] px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#111827] hover:text-white transition-colors"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>
            {/* Social proof micro */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-7 w-7 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1499996860823-5214fcc65f8f' : i === 2 ? '1529626455594-4ff0802cfb7e' : i === 3 ? '1507003211169-0a1dd7228f2d' : '1524504388940-b1c1722653e1'}?w=56&q=80`}
                      alt="Customer"
                      width={28}
                      height={28}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-[#f97316] text-[#f97316]" />)}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Loved by 2,400+ customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="Thread & Form — Premium Shirts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white shadow-xl px-5 py-3 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-[#111827] uppercase tracking-wide">In Stock Now</p>
                <p className="text-xs text-gray-400">Ships in 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="bg-[#111827] text-white">
        <div className="container-custom py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex items-center gap-3 justify-center py-2 md:py-0 text-center">
              <Truck className="h-4 w-4 flex-shrink-0 text-[#f97316]" strokeWidth={2} />
              <p className="text-sm font-medium">Free Shipping over &#8377;2,000</p>
            </div>
            <div className="flex items-center gap-3 justify-center py-2 md:py-0 text-center">
              <RotateCcw className="h-4 w-4 flex-shrink-0 text-[#f97316]" strokeWidth={2} />
              <p className="text-sm font-medium">30-Day Easy Returns</p>
            </div>
            <div className="flex items-center gap-3 justify-center py-2 md:py-0 text-center">
              <Shield className="h-4 w-4 flex-shrink-0 text-[#f97316]" strokeWidth={2} />
              <p className="text-sm font-medium">Secure Checkout &amp; Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Collections ─── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── Social Proof Marquee ─── */}
      <section className="py-10 bg-[#fafaf9] border-y overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee select-none">
          {[...socialProofItems, ...socialProofItems].map((quote, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-10 text-sm text-gray-600 italic">
              <Star className="h-3 w-3 fill-[#f97316] text-[#f97316] flex-shrink-0" />
              {quote}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Editorial Section ─── */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] overflow-hidden relative">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Thread & Form — Crafted with Intention"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-7 lg:max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f97316]">Our Philosophy</p>
              <h2 className="text-4xl lg:text-5xl font-heading font-semibold leading-tight text-[#111827]">
                Made to Wear Every Day.<br />
                <span className="italic">Built to Last Years.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed">
                We obsess over fabric weight, stitch count, and silhouette so you don&apos;t have to. Every shirt in our line is tested for durability, comfort, and that &quot;just right&quot; fit that keeps people asking where you got it.
              </p>
              <ul className="space-y-3">
                {['100% premium cotton & linen fabrics', 'Reinforced collar & cuff stitching', 'Pre-washed — no shrink surprises', 'Sizes XS–3XL, extended sizing available'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-[#f97316] flex-shrink-0" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#111827] border-b-2 border-[#f97316] pb-0.5 hover:text-[#f97316] transition-colors"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Editorial Image 2 ─── */}
      <section className="py-section bg-[#fafaf9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-7 lg:max-w-md order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f97316]">The Fabric Story</p>
              <h2 className="text-4xl lg:text-5xl font-heading font-semibold leading-tight text-[#111827]">
                Woven From<br />
                <span className="italic">The Best.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed">
                We source from mills with over a century of expertise. Each batch of fabric goes through a 12-point quality check before a single thread is cut. When you feel it, you&apos;ll know the difference.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div>
                  <p className="text-3xl font-heading font-semibold text-[#111827]">100%</p>
                  <p className="text-sm text-gray-500 mt-1">Natural fibres</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-semibold text-[#111827]">50+</p>
                  <p className="text-sm text-gray-500 mt-1">Wash test cycles</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-semibold text-[#111827]">12-pt</p>
                  <p className="text-sm text-gray-500 mt-1">Quality check</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-semibold text-[#111827]">2,400+</p>
                  <p className="text-sm text-gray-500 mt-1">Happy customers</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden relative order-1 lg:order-2">
              <Image
                src={EDITORIAL_IMAGE}
                alt="Thread & Form — Fabric Quality"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-section bg-[#111827] text-white">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f97316] mb-3">Join the Club</p>
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold">New drops. Early access. Members only.</h2>
          <p className="mt-3 text-gray-400 text-sm">
            Join 5,000+ subscribers who get first look at new styles and exclusive offers.
          </p>
          {newsletterDone ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-green-400 font-medium">
              <CheckCircle className="h-5 w-5" />
              You&apos;re on the list. Welcome to Thread &amp; Form.
            </div>
          ) : (
            <form className="mt-8 flex gap-0" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3.5 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#f97316] text-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
