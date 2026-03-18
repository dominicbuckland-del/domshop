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
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-3 text-[11px] font-mono text-muted">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> own</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> want</span>
          </div>
          <div className="flex gap-3 text-[11px] font-mono text-muted">
            <Link href="/about" className="hover:text-primary transition-colors underline underline-offset-4">about</Link>
            <Link href="/guide" className="hover:text-primary transition-colors underline underline-offset-4">build your own</Link>
          </div>
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

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="group"
            >
              {/* Product card */}
              <div
                onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                className="cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Ownership badge */}
                  <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono text-white ${product.ownership === 'own' ? 'bg-emerald-600/90' : 'bg-amber-500/90'}`}>
                    {product.ownership === 'own' ? 'own' : 'want'}
                  </div>
                  {/* Signal source */}
                  {product.signalSource && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono text-white/80 bg-black/50 backdrop-blur-sm">
                      via {product.signalSource}
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="mt-2.5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-medium text-primary truncate pr-2">{product.name}</h3>
                    {product.price > 0 && (
                      <span className="text-[11px] font-mono text-muted flex-shrink-0">
                        ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted mt-0.5 line-clamp-2 leading-relaxed">{product.oneLiner}</p>
                  <span className="text-[10px] font-mono text-muted/60 mt-1 block">{product.category}</span>
                </div>
              </div>

              {/* Expanded detail modal */}
              <AnimatePresence>
                {expandedId === product.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) setExpandedId(null) }}
                  >
                    <motion.div
                      initial={{ scale: 0.95, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 10 }}
                      className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                    >
                      {/* Modal image */}
                      <div className="aspect-video w-full overflow-hidden rounded-t-xl relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => setExpandedId(null)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm hover:bg-black/70 transition-colors"
                        >
                          &times;
                        </button>
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-mono text-white ${product.ownership === 'own' ? 'bg-emerald-600/90' : 'bg-amber-500/90'}`}>
                          {product.ownership === 'own' ? 'i own this' : 'i want this'}
                        </div>
                      </div>

                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-baseline justify-between mb-1">
                          <h3 className="text-base font-medium text-neutral-900">{product.name}</h3>
                          {product.price > 0 && (
                            <span className="text-sm font-mono text-neutral-500">
                              ${(product.price / 100).toFixed(product.price % 100 === 0 ? 0 : 2)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 font-mono mb-3">{product.category}</p>

                        {/* Why I like it */}
                        <p className="text-sm text-neutral-700 leading-relaxed mb-4">{product.whyILikeIt}</p>

                        {/* Why recommended */}
                        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 mb-4">
                          <p className="text-[10px] font-mono text-neutral-400 mb-1">why the algorithm surfaced this</p>
                          <p className="text-[12px] text-neutral-600 leading-relaxed">{product.recommendedBecause}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 bg-neutral-100 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center text-sm font-medium bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
                        >
                          {product.price > 0 ? 'view product' : 'watch / read'} &rarr;
                        </a>

                        <p className="text-[10px] font-mono text-neutral-400 text-center mt-2">
                          {product.type === 'affiliate' ? 'links to retailer' : 'direct purchase'} &middot; {product.signalSource}
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

      {/* Spotify / Listening data */}
      <section className="mt-16 mb-16">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <h2 className="text-sm font-medium">what the algorithm hears</h2>
          </div>
          <span className="text-[10px] font-mono text-muted">live signal</span>
        </div>

        <p className="text-xs text-subtle leading-relaxed mb-4">
          Spotify data feeds the taste graph. Listening patterns surface product
          recommendations -- late-night lo-fi sessions triggered the ambient lighting
          recommendation. High-BPM cycling playlists correlate with gear upgrades.
          The algorithm does not understand music. It understands patterns.
        </p>

        {/* Spotify embeds */}
        <div className="space-y-3">
          <div className="border border-border rounded-lg overflow-hidden">
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-border rounded-lg overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* What the algorithm extracts */}
        <div className="mt-4 p-3 bg-bg rounded border border-border">
          <p className="text-[10px] font-mono text-muted mb-2">algorithm extraction</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-medium">6.2h</p>
              <p className="text-[10px] font-mono text-muted">daily avg</p>
            </div>
            <div>
              <p className="text-sm font-medium">73%</p>
              <p className="text-[10px] font-mono text-muted">instrumental</p>
            </div>
            <div>
              <p className="text-sm font-medium">11pm-2am</p>
              <p className="text-[10px] font-mono text-muted">peak hours</p>
            </div>
          </div>
          <p className="text-[11px] text-subtle leading-relaxed mt-3">
            High instrumental ratio + late-night peak = deep work pattern. The algorithm
            used this to surface noise-cancelling headphones (correct), ambient lighting
            (correct), and a meditation app (wrong -- the listening is the meditation).
          </p>
        </div>
      </section>

      {/* Build yours free */}
      <section className="border border-border rounded-lg p-6 bg-surface">
        <h2 className="text-sm font-medium mb-2">Build yours free</h2>
        <p className="text-xs text-subtle leading-relaxed mb-4">
          It runs as a website. You can keep it private, use it as a personal reference
          for what you own and what you might want next. Maybe one day you can share it
          with friends.
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
