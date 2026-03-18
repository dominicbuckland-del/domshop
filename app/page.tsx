'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { products, categories, type Category } from '@/data/products'
import { algorithmLevels, algorithmStats } from '@/data/algorithm'

const statusDot: Record<string, string> = {
  live: 'bg-green-500',
  batch: 'bg-yellow-500',
  manual: 'bg-blue-500',
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAlgorithm, setShowAlgorithm] = useState(false)

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-baseline justify-between">
          <h1 className="text-lg font-medium tracking-tight">i used my own data to advertise to myself</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAlgorithm(!showAlgorithm)}
              className="text-[11px] font-mono text-muted hover:text-primary border border-border px-2.5 py-1 rounded-full transition-all hover:border-muted"
            >
              algorithm
            </button>
            <a
              href="https://github.com/dominicbuckland-del/domshop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono bg-accent text-white px-2.5 py-1 rounded-full transition-all hover:bg-primary"
            >
              build yours free
            </a>
          </div>
        </div>
        <p className="text-sm text-muted mt-3 leading-relaxed max-w-lg">
          I built this store to explore an inversion of the global advertising model and how people
          could seek to reclaim ownership over their data and identity in an increasingly
          AI-dominated future. Nothing here is actually for sale.
        </p>
        <div className="flex gap-3 mt-4 text-[11px] font-mono text-muted">
          <Link href="/about" className="hover:text-primary transition-colors underline underline-offset-4">about</Link>
          <Link href="/guide" className="hover:text-primary transition-colors underline underline-offset-4">build your own</Link>
        </div>
      </header>

      {/* Algorithm panel */}
      <AnimatePresence>
        {showAlgorithm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-12"
          >
            <div className="border border-border rounded-lg p-6 bg-surface">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-sm font-medium">How this works</h2>
                <span className="text-[10px] font-mono text-muted">updated {algorithmStats.lastUpdated}</span>
              </div>

              <p className="text-xs text-subtle leading-relaxed mb-6">
                Most people&#39;s data is being used to sell them things by someone else. You are
                using your own data to curate things for yourself. This algorithm is trained
                exclusively on my behaviour. No brand paid for placement. It runs the same process
                as every ad platform -- just in reverse, for one person.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6 py-4 border-y border-border">
                <div>
                  <p className="text-lg font-medium">{algorithmStats.totalDataPoints}</p>
                  <p className="text-[10px] font-mono text-muted">data points</p>
                </div>
                <div>
                  <p className="text-lg font-medium">{algorithmStats.liveSources}</p>
                  <p className="text-[10px] font-mono text-muted">live sources</p>
                </div>
                <div>
                  <p className="text-lg font-medium">{algorithmStats.itemsScanned}</p>
                  <p className="text-[10px] font-mono text-muted">items scanned</p>
                </div>
                <div>
                  <p className="text-lg font-medium">{algorithmStats.avgConfidence}</p>
                  <p className="text-[10px] font-mono text-muted">confidence</p>
                </div>
              </div>

              {/* 3-level algorithm structure */}
              <div className="space-y-8">
                {algorithmLevels.map((level) => (
                  <div key={level.level}>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[10px] font-mono text-muted">level {level.level}</span>
                      <h3 className="text-xs font-medium">{level.title}</h3>
                    </div>
                    <p className="text-[11px] text-subtle leading-relaxed mb-3">{level.subtitle}</p>

                    <div className="space-y-0">
                      {level.sources.map((source, i) => (
                        <motion.div
                          key={source.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="py-3 border-b border-border last:border-0"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[source.status]}`} />
                              <span className="text-xs font-medium">{source.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-muted">{source.status}</span>
                          </div>
                          <p className="text-[11px] text-subtle leading-relaxed pl-3.5">{source.description}</p>
                          <p className="text-[10px] font-mono text-muted mt-1 pl-3.5">{source.dataPoints}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[10px] font-mono text-muted leading-relaxed">
                  Products surface when confidence exceeds 70%. I manually approve every item.
                  Nothing is sponsored. No affiliate revenue determines placement. No tracking
                  pixels. The data is mine, the code is open, and the point is to prove that
                  personalisation can serve the person -- not the platform.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category filter */}
      <nav className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all ${
              activeCategory === cat
                ? 'bg-accent text-white'
                : 'bg-transparent text-muted hover:text-primary border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Product list */}
      <div className="space-y-0">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <button
                onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                className="w-full text-left group"
              >
                <div className="flex items-center justify-between py-4 border-b border-border group-hover:border-muted transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                    {/* Product image */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-primary">{product.name}</span>
                        <span className="text-[10px] font-mono text-muted">{product.category}</span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 truncate">{product.oneLiner}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-subtle">
                      ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                    </span>
                    <svg
                      className={`w-3 h-3 text-muted transition-transform ${expandedId === product.id ? 'rotate-45' : ''}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === product.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="py-5 border-b border-border">
                      <div className="flex gap-4">
                        {/* Larger image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-subtle leading-relaxed">{product.whyILikeIt}</p>
                        </div>
                      </div>

                      {/* Why recommended signal */}
                      <div className="mt-3 p-3 bg-bg rounded border border-border">
                        <p className="text-[10px] font-mono text-muted mb-1">why recommended</p>
                        <p className="text-[11px] text-subtle leading-relaxed">{product.recommendedBecause}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          {product.type === 'affiliate' ? (
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-primary underline underline-offset-4 hover:text-accent transition-colors"
                            >
                              buy it &rarr;
                            </a>
                          ) : (
                            <span className="text-xs font-mono text-muted">
                              checkout coming soon
                            </span>
                          )}
                          <div className="flex gap-1.5">
                            {product.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-mono text-muted px-1.5 py-0.5 bg-bg border border-border rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted">
                            {product.type}
                          </span>
                          {product.signalSource && (
                            <span className="text-[10px] font-mono text-muted">
                              via {product.signalSource}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Build yours free */}
      <section className="mt-16 border border-border rounded-lg p-6 bg-surface">
        <h2 className="text-sm font-medium mb-2">Build yours free</h2>
        <p className="text-xs text-subtle leading-relaxed mb-4">
          This is open source because the interesting part is the idea, not the store. The code
          does not matter. What matters is the inversion: what happens when you stop letting
          algorithms sell to you and start building algorithms that understand you? Every
          platform captures your signal and sells it back to you as ads. This runs the same
          process in reverse. Fork the repo, point it at your own data, and find out what your
          algorithm recommends when it is working for you instead of against you.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">01</span>
            <div>
              <p className="text-xs font-medium">Fork and clone</p>
              <p className="text-[11px] text-muted mt-0.5">
                <code className="bg-bg px-1.5 py-0.5 rounded border border-border font-mono">git clone github.com/dominicbuckland-del/domshop</code> -- the entire codebase is yours. MIT licensed.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">02</span>
            <div>
              <p className="text-xs font-medium">Replace the data with your life</p>
              <p className="text-[11px] text-muted mt-0.5">
                Edit <code className="bg-bg px-1.5 py-0.5 rounded border border-border font-mono">data/products.ts</code> with things you own. Photograph your stuff. Be honest about what you actually use versus what you bought and forgot about.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">03</span>
            <div>
              <p className="text-xs font-medium">Connect your signals</p>
              <p className="text-[11px] text-muted mt-0.5">
                Start with Level 1 manual imports. Export your data from Spotify, Strava, Instagram, Claude, email receipts. The <Link href="/guide" className="underline underline-offset-4 hover:text-primary">guide</Link> walks through every step.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">04</span>
            <div>
              <p className="text-xs font-medium">Deploy for free</p>
              <p className="text-[11px] text-muted mt-0.5">
                <code className="bg-bg px-1.5 py-0.5 rounded border border-border font-mono">vercel deploy</code> -- free hosting, free SSL, instant. Or use Claude Code to build and deploy the whole thing conversationally.
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/dominicbuckland-del/domshop"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono bg-accent text-white px-4 py-2 rounded-full hover:bg-primary transition-colors inline-block"
        >
          view source on github
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-10 pt-8 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          {products.length} items. Algorithm-surfaced, manually approved. Open source.
          An algorithm trained on one person&#39;s data, recommending things for that person only.
          No brand paid for placement.
        </p>
        <div className="flex gap-3 mt-3 text-[10px] font-mono text-muted">
          <Link href="/about" className="hover:text-primary transition-colors">about</Link>
          <Link href="/guide" className="hover:text-primary transition-colors">guide</Link>
          <a href="https://github.com/dominicbuckland-del/domshop" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">github</a>
        </div>
      </footer>
    </div>
  )
}
