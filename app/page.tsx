'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { products, categories } from '@/data/products'
import { algorithmLevels, algorithmStats } from '@/data/algorithm'
import { createBrowserClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const statusDot: Record<string, string> = {
  live: 'bg-green-500',
  batch: 'bg-yellow-500',
  manual: 'bg-blue-500',
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

// Group products by category for carousels
const categoryGroups = categories.filter(c => c !== 'all').map(cat => ({
  name: cat,
  label: cat.charAt(0).toUpperCase() + cat.slice(1),
  items: products.filter(p => p.category === cat),
})).filter(g => g.items.length > 0)

// Category descriptions for section headers
const categoryDescriptions: Record<string, { headline: string; sub: string }> = {
  surf: { headline: 'Surf.', sub: 'Shaped by the ocean. Curated by the algorithm.' },
  cycling: { headline: 'Cycling.', sub: 'Every ride tracked. Every upgrade earned.' },
  running: { headline: 'Running.', sub: 'Data-driven distance. Algorithm-matched gear.' },
  tech: { headline: 'Tech.', sub: 'The tools that build everything else.' },
  music: { headline: 'Music.', sub: 'What the algorithm hears, translated to gear.' },
  coffee: { headline: 'Coffee.', sub: 'The ritual. Optimised.' },
  food: { headline: 'Food.', sub: 'Algorithm-surfaced. Taste-approved.' },
  grooming: { headline: 'Grooming.', sub: 'The invisible essentials.' },
  edc: { headline: 'Everyday.', sub: 'The uniform. Refined over years of data.' },
  home: { headline: 'Home.', sub: 'Where the data is generated.' },
  dog: { headline: 'Dog.', sub: 'The only user who does not read the algorithm.' },
  books: { headline: 'Books & Watch.', sub: 'The inputs that shape the outputs.' },
  games: { headline: 'Games.', sub: 'Screen time the algorithm does not judge.' },
  places: { headline: 'Places.', sub: 'Where the data says you belong.' },
  experiences: { headline: 'Experiences.', sub: 'What the algorithm cannot quantify.' },
}

function HorizontalCarousel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={scrollRef}
      className={`flex gap-5 overflow-x-auto hide-scrollbar snap-x-mandatory px-8 md:px-16 lg:px-24 pb-4 ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAlgorithm, setShowAlgorithm] = useState(false)
  const [feedbackId, setFeedbackId] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackLog, setFeedbackLog] = useState<Record<string, string>>({})
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const installPromptRef = { current: null as Event | null }

  // Auth
  useEffect(() => {
    const supabase = createBrowserClient()
    if (!supabase) { setAuthReady(true); return }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setAuthReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      installPromptRef.current = e
      setShowInstallBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  })

  const handleInstall = () => {
    const prompt = installPromptRef.current
    if (!prompt) return
    (prompt as unknown as { prompt: () => void }).prompt()
    setShowInstallBanner(false)
    installPromptRef.current = null
  }

  const handleSignOut = useCallback(async () => {
    const supabase = createBrowserClient()
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const submitFeedback = (productId: string) => {
    if (!feedbackText.trim()) return
    setFeedbackLog(prev => ({ ...prev, [productId]: feedbackText.trim() }))
    setFeedbackText('')
    setFeedbackId(null)
  }

  const visibleProducts = products.filter(p => !hiddenIds.has(p.id))

  return (
    <div className="min-h-screen bg-black">
      {/* ── Sticky Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[17px] font-medium tracking-tight text-primary">
            iDentity
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAlgorithm(!showAlgorithm)}
              className="text-[12px] text-muted hover:text-primary transition-colors"
            >
              Algorithm
            </button>
            {authReady && (
              user ? (
                <button onClick={handleSignOut} className="text-[12px] text-muted hover:text-primary transition-colors">
                  Sign Out
                </button>
              ) : (
                <Link href="/login" className="text-[12px] text-accent hover:text-accent/80 transition-colors font-medium">
                  Sign In
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-[64px] md:text-[96px] lg:text-[120px] font-bold tracking-[-0.04em] leading-[0.92] text-primary">
            {user ? user.email?.split('@')[0] : 'iDentity'}
          </h1>
          <p className="text-[21px] md:text-[28px] font-medium text-muted mt-4 tracking-tight">
            Your taste. Your data. Your store.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-accent text-white text-[17px] font-medium hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create your own
          </Link>
          <button
            onClick={() => {
              document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-[17px] text-accent font-medium hover:text-accent/80 transition-colors"
          >
            Learn more
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-muted/40 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-1.5 bg-muted/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Overview / Mission ────────────────────────────────── */}
      <section id="overview" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-8 md:px-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-primary leading-[1.2] tracking-tight"
          >
            This is both a functional app and a creative commentary on data, privacy and identity.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] md:text-[19px] text-muted mt-8 leading-[1.6] max-w-2xl mx-auto"
          >
            Having spent my career across creative and technical marketing, I thought it would be
            interesting to apply hyper-personalisation to a singular consumer -- myself. Same tools,
            same depth of data capture, but purely for my own benefit.
          </motion.p>
        </div>
      </section>

      {/* ── Stats bar (Apple spec-style) ──────────────────────── */}
      <section className="border-y border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '2,847', label: 'data points', sub: 'All yours.' },
              { value: '6', label: 'live sources', sub: 'Zero third parties.' },
              { value: String(visibleProducts.length), label: 'items curated', sub: 'Every one matched.' },
              { value: '0', label: 'brands paid', sub: 'Not one.' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`py-12 md:py-16 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}
              >
                <p className="text-[48px] md:text-[64px] font-bold tracking-tight text-primary leading-none">{stat.value}</p>
                <p className="text-[12px] text-muted mt-3 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-[14px] text-subtle mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Install banner ────────────────────────────────────── */}
      {showInstallBanner && (
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-6">
          <div className="flex items-center justify-between px-6 py-4 bg-surface rounded-2xl border border-white/10">
            <div>
              <p className="text-[15px] font-medium text-primary">Install iDentity</p>
              <p className="text-[13px] text-muted mt-0.5">Add to your home screen and build your own store.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInstallBanner(false)} className="text-[13px] text-muted px-4 py-2 hover:text-primary transition-colors">
                Later
              </button>
              <button onClick={handleInstall} className="text-[13px] font-medium bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition-colors">
                Install
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Algorithm panel ───────────────────────────────────── */}
      <AnimatePresence>
        {showAlgorithm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-12">
              <div className="bg-surface rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="flex items-baseline justify-between mb-8">
                  <h2 className="text-[28px] md:text-[36px] font-bold text-primary tracking-tight">How this works</h2>
                  <span className="text-[13px] text-muted">Updated {algorithmStats.lastUpdated}</span>
                </div>

                <p className="text-[17px] text-subtle leading-relaxed mb-10 max-w-3xl">
                  Most people&#39;s data is being used to sell them things by someone else. You are
                  using your own data to curate things for yourself. This algorithm is trained
                  exclusively on my behaviour. No brand paid for placement.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 py-8 border-y border-white/10">
                  {[
                    { value: algorithmStats.totalDataPoints, label: 'data points' },
                    { value: String(algorithmStats.liveSources), label: 'live sources' },
                    { value: String(algorithmStats.itemsScanned), label: 'items scanned' },
                    { value: algorithmStats.avgConfidence, label: 'confidence' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="text-[32px] font-bold text-primary">{s.value}</p>
                      <p className="text-[13px] text-muted mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* 3-level algorithm structure */}
                <div className="space-y-12">
                  {algorithmLevels.map((level) => (
                    <div key={level.level}>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-[13px] font-medium text-accent tracking-wide">Level {level.level}</span>
                        <h3 className="text-[22px] font-bold text-primary">{level.title}</h3>
                      </div>
                      <p className="text-[15px] text-subtle leading-relaxed mb-5">{level.subtitle}</p>

                      <div className="space-y-0">
                        {level.sources.map((source, i) => (
                          <motion.div
                            key={source.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="py-4 border-b border-white/10 last:border-0"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full ${statusDot[source.status]}`} />
                                <span className="text-[15px] font-medium text-primary">{source.name}</span>
                              </div>
                              <span className="text-[12px] text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10">{source.status}</span>
                            </div>
                            <p className="text-[14px] text-subtle leading-relaxed pl-[18px]">{source.description}</p>
                            <p className="text-[13px] text-muted mt-1.5 pl-[18px]">{source.dataPoints}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-[13px] text-muted leading-relaxed max-w-2xl">
                    Products surface when confidence exceeds 70%. I manually approve every item.
                    Nothing is sponsored. No affiliate revenue determines placement. No tracking
                    pixels. The data is mine, the code is open, and the point is to prove that
                    personalisation can serve the person -- not the platform.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hidden items bar ──────────────────────────────────── */}
      {hiddenIds.size > 0 && (
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-4">
          <div className="flex items-center justify-between px-6 py-3 bg-surface rounded-2xl border border-white/10">
            <p className="text-[13px] text-muted">
              {hiddenIds.size} item{hiddenIds.size > 1 ? 's' : ''} removed -- algorithm updated
            </p>
            <button onClick={() => setHiddenIds(new Set())} className="text-[13px] text-accent hover:text-accent/80 transition-colors">
              Restore All
            </button>
          </div>
        </div>
      )}

      {/* ── Category Carousels (Apple iPhone style) ───────────── */}
      {categoryGroups.map((group, gi) => {
        const desc = categoryDescriptions[group.name] || { headline: group.label + '.', sub: '' }
        const groupItems = group.items.filter(p => !hiddenIds.has(p.id))
        if (groupItems.length === 0) return null

        // Alternate between dark (#000) and slightly-elevated (#1d1d1f) backgrounds
        const isDark = gi % 2 === 0

        return (
          <section
            key={group.name}
            className={`py-20 md:py-28 ${isDark ? 'bg-black' : 'bg-surface'}`}
          >
            {/* Section header -- large Apple-style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="px-8 md:px-16 lg:px-24 mb-10 md:mb-14"
            >
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold tracking-[-0.03em] leading-[0.95] text-primary">
                {desc.headline}
              </h2>
              {desc.sub && (
                <p className="text-[19px] md:text-[21px] text-muted mt-3 tracking-tight font-medium">
                  {desc.sub}
                </p>
              )}
            </motion.div>

            {/* Horizontal scroll carousel */}
            <HorizontalCarousel>
              {groupItems.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-shrink-0 w-[300px] md:w-[380px] snap-start group"
                >
                  <motion.div
                    onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                    className="cursor-pointer"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={spring}
                  >
                    {/* Tall feature card with dark bg */}
                    <div className="relative rounded-3xl overflow-hidden bg-surface border border-white/[0.08]">
                      {/* Image - tall aspect ratio */}
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setHiddenIds(prev => { const next = new Set(Array.from(prev)); next.add(product.id); return next }) }}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full glass-dark text-white/80 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Not for me"
                      >
                        {'\u00D7'}
                      </button>

                      {/* Signal badge */}
                      {product.signalSource && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] text-white/80 glass-dark border border-white/10">
                          via {product.signalSource}
                        </div>
                      )}

                      {/* Card content - dark section */}
                      <div className="p-5 bg-surface">
                        <h3 className="text-[17px] font-medium text-primary leading-tight">{product.name}</h3>
                        <p className="text-[14px] text-muted mt-1.5 line-clamp-2">{product.oneLiner}</p>
                        <div className="flex items-center justify-between mt-4">
                          {product.price > 0 ? (
                            <span className="text-[15px] font-medium text-primary">
                              ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                            </span>
                          ) : (
                            <span className="text-[14px] text-muted">Free</span>
                          )}
                          <span className="text-[12px] text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {product.ownership === 'own' ? 'Own' : 'Want'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </HorizontalCarousel>
          </section>
        )
      })}

      {/* ── Detail Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {expandedId && (() => {
          const product = products.find(p => p.id === expandedId)
          if (!product) return null
          return (
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-xl"
              onClick={(e) => { if (e.target === e.currentTarget) setExpandedId(null) }}
            >
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-surface rounded-t-[32px] md:rounded-[32px] max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10"
              >
                {/* Modal image */}
                <div className="relative">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[32px] md:rounded-t-[32px]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-14 glass flex items-center justify-between px-5 rounded-t-[32px]">
                    <span className="text-[13px] font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                      {product.ownership === 'own' ? 'I own this' : 'I want this'}
                    </span>
                    <button
                      onClick={() => setExpandedId(null)}
                      className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center text-[15px] hover:bg-white/20 transition-colors"
                    >
                      {'\u00D7'}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-[24px] font-bold text-primary tracking-tight">{product.name}</h3>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-[15px] text-muted">{product.category}</span>
                    {product.price > 0 && (
                      <span className="text-[15px] text-muted">
                        ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                      </span>
                    )}
                  </div>

                  <p className="text-[15px] text-subtle leading-relaxed mt-5 mb-6">{product.whyILikeIt}</p>

                  <div className="p-4 bg-white/5 rounded-2xl mb-4 border border-white/10">
                    <p className="text-[11px] font-medium text-muted uppercase tracking-[0.15em] mb-2">Why the algorithm surfaced this</p>
                    <p className="text-[14px] text-subtle leading-relaxed">{product.recommendedBecause}</p>
                  </div>

                  {/* Feedback section */}
                  <div className="p-4 bg-white/5 rounded-2xl mb-5 border border-white/10">
                    {feedbackLog[product.id] ? (
                      <div>
                        <p className="text-[11px] font-medium text-green-400 uppercase tracking-[0.15em] mb-2">Your correction (saved)</p>
                        <p className="text-[14px] text-subtle leading-relaxed">{feedbackLog[product.id]}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); setFeedbackLog(prev => { const next = {...prev}; delete next[product.id]; return next }); setFeedbackId(product.id) }}
                          className="text-[13px] text-accent mt-2 hover:text-accent/80 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    ) : feedbackId === product.id ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        <p className="text-[11px] font-medium text-muted uppercase tracking-[0.15em] mb-2">Teach your algorithm</p>
                        <textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="e.g. Wrong pick. I tried this and the quality dropped after 3 months..."
                          className="w-full text-[14px] text-primary bg-black/40 border border-white/10 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent placeholder:text-muted/50"
                          rows={3}
                          autoFocus
                        />
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => submitFeedback(product.id)} className="text-[14px] font-medium bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition-colors">
                            Save Correction
                          </button>
                          <button onClick={() => { setFeedbackId(null); setFeedbackText('') }} className="text-[14px] text-muted px-4 py-2 hover:text-primary transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); setFeedbackId(product.id) }} className="w-full text-left">
                        <p className="text-[11px] font-medium text-muted uppercase tracking-[0.15em] mb-1">Teach your algorithm</p>
                        <p className="text-[14px] text-subtle">Wrong recommendation? Click to correct it.</p>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-[12px] text-muted px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-[16px] font-medium bg-accent text-white py-3.5 rounded-full hover:bg-accent/90 transition-colors"
                  >
                    {product.price > 0 ? 'View Product' : 'Watch / Read'}
                  </a>

                  <p className="text-[12px] text-muted text-center mt-3">
                    {product.type === 'affiliate' ? 'Links to retailer' : 'Direct purchase'} &middot; {product.signalSource}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* ── Spotify / Listening data ──────────────────────────── */}
      <section className="bg-surface">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.03em] leading-[0.95] text-primary">
              What the<br />algorithm hears.
            </h2>
            <div className="flex items-center gap-2 mt-4 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[13px] text-muted">Live signal</span>
            </div>

            <p className="text-[17px] text-subtle leading-relaxed mb-10 max-w-2xl">
              Spotify data feeds the taste graph. Listening patterns surface product
              recommendations -- late-night lo-fi sessions triggered the ambient lighting
              recommendation. High-BPM cycling playlists correlate with gear upgrades.
            </p>
          </motion.div>

          {/* Spotify embeds */}
          <div className="max-w-3xl space-y-4">
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator&theme=0"
                width="100%" height="152" frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy" className="rounded-2xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0"
                  width="100%" height="152" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy" className="rounded-2xl"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator&theme=0"
                  width="100%" height="152" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy" className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Algorithm extraction */}
          <div className="max-w-3xl mt-8 p-6 bg-black rounded-3xl border border-white/10">
            <p className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] mb-4">Algorithm extraction</p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-[28px] font-bold text-primary">6.2h</p>
                <p className="text-[13px] text-muted mt-0.5">daily avg</p>
              </div>
              <div>
                <p className="text-[28px] font-bold text-primary">73%</p>
                <p className="text-[13px] text-muted mt-0.5">instrumental</p>
              </div>
              <div>
                <p className="text-[28px] font-bold text-primary">11pm-2am</p>
                <p className="text-[13px] text-muted mt-0.5">peak hours</p>
              </div>
            </div>
            <p className="text-[14px] text-subtle leading-relaxed mt-5">
              High instrumental ratio + late-night peak = deep work pattern. The algorithm
              used this to surface noise-cancelling headphones (correct), ambient lighting
              (correct), and a meditation app (wrong -- the listening is the meditation).
            </p>
          </div>
        </div>
      </section>

      {/* ── Build yours free ──────────────────────────────────── */}
      <section className="bg-black py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold tracking-[-0.03em] leading-[0.95] text-primary">
              Build yours.
            </h2>
            <p className="text-[19px] md:text-[21px] text-muted mt-3 tracking-tight font-medium max-w-2xl">
              It runs as a website. Keep it private, use it as a personal reference for what you own and what you might want next.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {[
              { step: '01', title: 'Fork and clone', desc: 'git clone the entire codebase. MIT licensed.' },
              { step: '02', title: 'Replace the data', desc: 'Edit data/products.ts with your things. Photograph your stuff.' },
              { step: '03', title: 'Connect signals', desc: 'Start with Level 1 manual imports. Export from Spotify, Strava, Instagram, Claude.' },
              { step: '04', title: 'Deploy for free', desc: 'vercel deploy -- free hosting, free SSL, instant.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface rounded-3xl p-8 border border-white/[0.08]"
              >
                <span className="text-[48px] font-bold text-accent/40">{item.step}</span>
                <h3 className="text-[19px] font-bold text-primary mt-2">{item.title}</h3>
                <p className="text-[15px] text-muted mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-12">
            <a
              href="https://github.com/dominicbuckland-del/domshop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-accent text-white text-[17px] font-medium hover:bg-accent/90 transition-colors"
            >
              View Source on GitHub
            </a>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-accent text-[17px] font-medium hover:text-accent/80 transition-colors"
            >
              Read the Guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-12">
          <div className="text-center">
            <p className="text-[17px] text-subtle leading-relaxed max-w-xl mx-auto">
              iDentity is not an Apple product. It is what Apple promised and never delivered.
            </p>
            <p className="text-[13px] text-muted mt-4">
              {products.length} items. Algorithm-surfaced, manually approved. Open source.
            </p>
            <div className="flex justify-center gap-6 mt-5 text-[13px] text-muted">
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/guide" className="hover:text-primary transition-colors">Guide</Link>
              <a href="https://github.com/dominicbuckland-del/domshop" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
