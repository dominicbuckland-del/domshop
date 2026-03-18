'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { products, categories, type Category } from '@/data/products'
import { algorithmLevels, algorithmStats } from '@/data/algorithm'
import { createBrowserClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const statusDot: Record<string, string> = {
  live: 'bg-green-500',
  batch: 'bg-yellow-500',
  manual: 'bg-blue-500',
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
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

  // Auth -- gracefully degrade if Supabase is not configured
  useEffect(() => {
    const supabase = createBrowserClient()
    if (!supabase) {
      setAuthReady(true)
      return
    }
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

  const filtered = (activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)
  ).filter(p => !hiddenIds.has(p.id))

  const isDemo = !user

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Sticky Nav ──────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[17px] font-semibold tracking-tight text-primary">
              iDentity
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAlgorithm(!showAlgorithm)}
              className="text-[13px] text-muted hover:text-primary transition-colors"
            >
              Algorithm
            </button>
            {authReady && (
              <>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="text-[13px] text-muted hover:text-primary transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="text-[13px] text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-tight leading-[1.05] text-primary">
            {user ? `${user.email?.split('@')[0]}'s` : 'Your data.'}<br />
            {user ? 'Store.' : 'Your store.'}
          </h1>
          <p className="text-[19px] md:text-[21px] text-muted mt-5 leading-relaxed max-w-lg mx-auto font-light">
            An inversion of the global advertising model. Algorithm-curated, manually approved.
            Nothing here is for sale.
          </p>
          {isDemo && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-accent text-white text-[15px] font-medium hover:bg-accent/90 transition-colors"
              >
                Create Your Own
              </Link>
              <a
                href="https://github.com/dominicbuckland-del/domshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full text-accent text-[15px] font-medium hover:text-accent/80 transition-colors"
              >
                View Source
              </a>
            </div>
          )}
          {isDemo && (
            <p className="text-[13px] text-muted/60 mt-4">
              Viewing Dom&#39;s store as a demo
            </p>
          )}
        </div>
      </section>

      {/* ── Install banner ──────────────────────────────────── */}
      {showInstallBanner && (
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between px-5 py-4 bg-card rounded-2xl shadow-sm border border-border/40">
            <div>
              <p className="text-[15px] font-medium text-primary">Install iDentity</p>
              <p className="text-[13px] text-muted mt-0.5">Add to your home screen for instant access</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-[13px] text-muted px-4 py-2 hover:text-primary transition-colors"
              >
                Later
              </button>
              <button
                onClick={handleInstall}
                className="text-[13px] font-medium bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Algorithm panel ─────────────────────────────────── */}
      <AnimatePresence>
        {showAlgorithm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-5xl mx-auto px-6 pb-8">
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/40">
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-[22px] font-semibold text-primary">How this works</h2>
                  <span className="text-[13px] text-muted">Updated {algorithmStats.lastUpdated}</span>
                </div>

                <p className="text-[15px] text-subtle leading-relaxed mb-8 max-w-2xl">
                  Most people&#39;s data is being used to sell them things by someone else. You are
                  using your own data to curate things for yourself. This algorithm is trained
                  exclusively on my behaviour. No brand paid for placement.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-6 border-y border-border/40">
                  <div className="text-center">
                    <p className="text-[28px] font-semibold text-primary">{algorithmStats.totalDataPoints}</p>
                    <p className="text-[13px] text-muted mt-1">data points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[28px] font-semibold text-primary">{algorithmStats.liveSources}</p>
                    <p className="text-[13px] text-muted mt-1">live sources</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[28px] font-semibold text-primary">{algorithmStats.itemsScanned}</p>
                    <p className="text-[13px] text-muted mt-1">items scanned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[28px] font-semibold text-primary">{algorithmStats.avgConfidence}</p>
                    <p className="text-[13px] text-muted mt-1">confidence</p>
                  </div>
                </div>

                {/* 3-level algorithm structure */}
                <div className="space-y-10">
                  {algorithmLevels.map((level) => (
                    <div key={level.level}>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-[13px] font-medium text-accent">Level {level.level}</span>
                        <h3 className="text-[17px] font-semibold text-primary">{level.title}</h3>
                      </div>
                      <p className="text-[15px] text-subtle leading-relaxed mb-4">{level.subtitle}</p>

                      <div className="space-y-0">
                        {level.sources.map((source, i) => (
                          <motion.div
                            key={source.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="py-4 border-b border-border/40 last:border-0"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full ${statusDot[source.status]}`} />
                                <span className="text-[15px] font-medium text-primary">{source.name}</span>
                              </div>
                              <span className="text-[13px] text-muted bg-surface px-3 py-1 rounded-full">{source.status}</span>
                            </div>
                            <p className="text-[14px] text-subtle leading-relaxed pl-[18px]">{source.description}</p>
                            <p className="text-[13px] text-muted mt-1.5 pl-[18px]">{source.dataPoints}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/40">
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

      {/* ── Category pills (horizontal scroll) ──────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 text-[14px] rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-surface text-subtle hover:bg-border/60'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Hidden items bar ────────────────────────────────── */}
      {hiddenIds.size > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between px-5 py-3 bg-surface rounded-2xl">
            <p className="text-[13px] text-muted">
              {hiddenIds.size} item{hiddenIds.size > 1 ? 's' : ''} removed -- algorithm updated
            </p>
            <button
              onClick={() => setHiddenIds(new Set())}
              className="text-[13px] text-accent hover:text-accent/80 transition-colors"
            >
              Restore All
            </button>
          </div>
        </div>
      )}

      {/* ── Product grid ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ ...spring, delay: i * 0.02 }}
                className="group"
              >
                <motion.div
                  onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                  className="cursor-pointer"
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                >
                  {/* Image */}
                  <div className="aspect-square rounded-apple overflow-hidden bg-surface relative shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Remove button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setHiddenIds(prev => { const next = new Set(Array.from(prev)); next.add(product.id); return next }) }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full glass-dark text-white/90 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Not for me"
                    >
                      {'\u00D7'}
                    </button>
                    {/* Signal source */}
                    {product.signalSource && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] text-white/90 glass-dark">
                        via {product.signalSource}
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="mt-3 px-0.5">
                    <h3 className="text-[14px] font-medium text-primary truncate">{product.name}</h3>
                    {product.price > 0 && (
                      <p className="text-[14px] text-muted mt-0.5">
                        ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* ── Detail Modal ──────────────────────────────── */}
                <AnimatePresence>
                  {expandedId === product.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
                      onClick={(e) => { if (e.target === e.currentTarget) setExpandedId(null) }}
                    >
                      <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-card rounded-t-[28px] md:rounded-[28px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                      >
                        {/* Modal image */}
                        <div className="relative">
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[28px] md:rounded-t-[28px]">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          {/* Frosted glass header bar */}
                          <div className="absolute top-0 left-0 right-0 h-14 glass flex items-center justify-between px-5 rounded-t-[28px]">
                            <span className={`text-[13px] font-medium px-3 py-1 rounded-full ${
                              product.ownership === 'own' ? 'bg-surface text-subtle' : 'bg-surface text-subtle'
                            }`}>
                              {product.ownership === 'own' ? 'I own this' : 'I want this'}
                            </span>
                            <button
                              onClick={() => setExpandedId(null)}
                              className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center text-[15px] hover:bg-black/30 transition-colors"
                            >
                              {'\u00D7'}
                            </button>
                          </div>
                        </div>

                        <div className="p-6">
                          {/* Header */}
                          <div className="mb-1">
                            <h3 className="text-[22px] font-semibold text-primary">{product.name}</h3>
                            <div className="flex items-baseline gap-3 mt-1">
                              <span className="text-[15px] text-muted">{product.category}</span>
                              {product.price > 0 && (
                                <span className="text-[15px] text-muted">
                                  ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Why I like it */}
                          <p className="text-[15px] text-subtle leading-relaxed mt-4 mb-5">{product.whyILikeIt}</p>

                          {/* Why recommended */}
                          <div className="p-4 bg-surface rounded-2xl mb-4">
                            <p className="text-[12px] font-medium text-muted uppercase tracking-wider mb-1.5">Why the algorithm surfaced this</p>
                            <p className="text-[14px] text-subtle leading-relaxed">{product.recommendedBecause}</p>
                          </div>

                          {/* Feedback section */}
                          <div className="p-4 bg-surface rounded-2xl mb-5">
                            {feedbackLog[product.id] ? (
                              <div>
                                <p className="text-[12px] font-medium text-green-600 uppercase tracking-wider mb-1.5">Your correction (saved)</p>
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
                                <p className="text-[12px] font-medium text-muted uppercase tracking-wider mb-2">Teach your algorithm</p>
                                <textarea
                                  value={feedbackText}
                                  onChange={(e) => setFeedbackText(e.target.value)}
                                  placeholder="e.g. Wrong pick. I tried this and the quality dropped after 3 months..."
                                  className="w-full text-[14px] text-primary bg-card border border-border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent placeholder:text-muted/50"
                                  rows={3}
                                  autoFocus
                                />
                                <div className="flex gap-2 mt-3">
                                  <button
                                    onClick={() => submitFeedback(product.id)}
                                    className="text-[14px] font-medium bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition-colors"
                                  >
                                    Save Correction
                                  </button>
                                  <button
                                    onClick={() => { setFeedbackId(null); setFeedbackText('') }}
                                    className="text-[14px] text-muted px-4 py-2 hover:text-primary transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); setFeedbackId(product.id) }}
                                className="w-full text-left"
                              >
                                <p className="text-[12px] font-medium text-muted uppercase tracking-wider mb-1">Teach your algorithm</p>
                                <p className="text-[14px] text-subtle">Wrong recommendation? Click to correct it.</p>
                              </button>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {product.tags.map(tag => (
                              <span key={tag} className="text-[12px] text-muted px-3 py-1.5 bg-surface rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
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
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Spotify / Listening data ────────────────────────── */}
      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <h2 className="text-[22px] font-semibold text-primary">What the algorithm hears</h2>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[13px] text-muted">Live signal</span>
            </div>

            <p className="text-[15px] text-subtle leading-relaxed mb-6">
              Spotify data feeds the taste graph. Listening patterns surface product
              recommendations -- late-night lo-fi sessions triggered the ambient lighting
              recommendation. High-BPM cycling playlists correlate with gear upgrades.
            </p>

            {/* Spotify embeds */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden shadow-sm">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-2xl"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Algorithm extraction */}
            <div className="mt-6 p-5 bg-card rounded-2xl shadow-sm border border-border/40">
              <p className="text-[12px] font-medium text-muted uppercase tracking-wider mb-3">Algorithm extraction</p>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-[22px] font-semibold text-primary">6.2h</p>
                  <p className="text-[13px] text-muted mt-0.5">daily avg</p>
                </div>
                <div>
                  <p className="text-[22px] font-semibold text-primary">73%</p>
                  <p className="text-[13px] text-muted mt-0.5">instrumental</p>
                </div>
                <div>
                  <p className="text-[22px] font-semibold text-primary">11pm-2am</p>
                  <p className="text-[13px] text-muted mt-0.5">peak hours</p>
                </div>
              </div>
              <p className="text-[14px] text-subtle leading-relaxed mt-4">
                High instrumental ratio + late-night peak = deep work pattern. The algorithm
                used this to surface noise-cancelling headphones (correct), ambient lighting
                (correct), and a meditation app (wrong -- the listening is the meditation).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Build yours free ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/40">
            <h2 className="text-[22px] font-semibold text-primary mb-2">Build yours free</h2>
            <p className="text-[15px] text-subtle leading-relaxed mb-8">
              It runs as a website. You can keep it private, use it as a personal reference
              for what you own and what you might want next.
            </p>

            <div className="space-y-6 mb-8">
              {[
                { step: '01', title: 'Fork and clone', desc: 'git clone github.com/dominicbuckland-del/domshop -- the entire codebase is yours. MIT licensed.' },
                { step: '02', title: 'Replace the data with your life', desc: 'Edit data/products.ts with things you own. Photograph your stuff.' },
                { step: '03', title: 'Connect your signals', desc: 'Start with Level 1 manual imports. Export your data from Spotify, Strava, Instagram, Claude.' },
                { step: '04', title: 'Deploy for free', desc: 'vercel deploy -- free hosting, free SSL, instant.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-[13px] font-medium text-accent w-8 flex-shrink-0 pt-0.5">{item.step}</span>
                  <div>
                    <p className="text-[15px] font-medium text-primary">{item.title}</p>
                    <p className="text-[14px] text-muted mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/dominicbuckland-del/domshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-accent text-white text-[15px] font-medium hover:bg-accent/90 transition-colors"
              >
                View Source on GitHub
              </a>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full text-accent text-[15px] font-medium hover:text-accent/80 transition-colors"
              >
                Read the Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border/40 bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-[13px] text-muted leading-relaxed max-w-lg mx-auto">
              {products.length} items. Algorithm-surfaced, manually approved. Open source.
              No brand paid for placement.
            </p>
            <div className="flex justify-center gap-6 mt-4 text-[13px] text-muted">
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
