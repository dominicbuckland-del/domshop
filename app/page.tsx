'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, categories, type Category } from '@/data/products'
import { dataSources, algorithmStats } from '@/data/algorithm'

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
          <h1 className="text-2xl font-medium tracking-tight">dom.shop</h1>
          <button
            onClick={() => setShowAlgorithm(!showAlgorithm)}
            className="text-[11px] font-mono text-muted hover:text-primary border border-border px-2.5 py-1 rounded-full transition-all hover:border-muted"
          >
            algorithm
          </button>
        </div>
        <p className="text-sm text-muted mt-3 leading-relaxed max-w-lg">
          I built this store to practice with Claude and explore hyper-personalisation for my thesis.
          It consists of things I buy, use and want to buy based on an algorithm which examines my
          own life in real time.
        </p>
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
                I photographed everything I own, catalogued it, and built a recommendation engine
                that watches my actual life. It pulls from {algorithmStats.liveSources} live data sources,
                cross-references {algorithmStats.totalDataPoints} data points, and surfaces products I
                would probably buy based on what I already own, what I do, and how I spend my time.
                The store updates itself. I just approve or reject what the algorithm finds.
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

              {/* Data sources */}
              <div className="space-y-0">
                {dataSources.map((source, i) => (
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

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[10px] font-mono text-muted leading-relaxed">
                  The algorithm runs a weighted scoring model across all sources. Products are surfaced
                  when confidence exceeds 70%. I manually approve every item before it appears here.
                  Nothing is sponsored. The data is mine. The recommendations are for me.
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
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-primary underline underline-offset-4 hover:text-accent transition-colors"
                          >
                            buy it &rarr;
                          </a>
                          <div className="flex gap-1.5">
                            {product.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-mono text-muted px-1.5 py-0.5 bg-bg border border-border rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {product.signalSource && (
                          <span className="text-[10px] font-mono text-muted">
                            via {product.signalSource}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Build your own */}
      <section className="mt-16 border border-border rounded-lg p-6 bg-surface">
        <h2 className="text-sm font-medium mb-2">Want your own?</h2>
        <p className="text-xs text-subtle leading-relaxed mb-4">
          I built this in a single session with Claude Code. The entire store -- algorithm, data pipeline
          documentation, product curation, deployment -- was built conversationally by describing what
          I wanted and having an AI build it in real time. You can do the same thing.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">01</span>
            <div>
              <p className="text-xs font-medium">Install Claude Code</p>
              <p className="text-[11px] text-muted mt-0.5">
                <code className="bg-bg px-1.5 py-0.5 rounded border border-border font-mono">npm i -g @anthropic-ai/claude-code</code> then run <code className="bg-bg px-1.5 py-0.5 rounded border border-border font-mono">claude</code> in your terminal.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">02</span>
            <div>
              <p className="text-xs font-medium">Describe your store</p>
              <p className="text-[11px] text-muted mt-0.5">
                Tell Claude what you want: your niche, your products, your aesthetic. It builds the entire Next.js site, Tailwind styling, and deploys to Vercel.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">03</span>
            <div>
              <p className="text-xs font-medium">Add your data sources</p>
              <p className="text-[11px] text-muted mt-0.5">
                Connect your Strava, Spotify, bookmarks, purchase history -- whatever signals make sense for your life. The algorithm is just a weighted scoring model you describe in plain English.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-0.5">04</span>
            <div>
              <p className="text-xs font-medium">Ship it</p>
              <p className="text-[11px] text-muted mt-0.5">
                Claude deploys to Vercel for free. Point your domain. Done. Total cost: $0 for hosting, ~$15 for a domain.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href="mailto:dom@dombuckland.com?subject=Build me a dom.shop&body=Hey Dom, I want my own curated store. Here's what I'm into:"
            className="text-xs font-mono bg-accent text-white px-4 py-2 rounded-full hover:bg-primary transition-colors"
          >
            get Dom to build yours
          </a>
          <a
            href="https://github.com/dominicbuckland-del/domshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted border border-border px-4 py-2 rounded-full hover:text-primary hover:border-muted transition-colors"
          >
            fork the repo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 pt-8 border-t border-border">
        <p className="text-xs text-muted">
          {products.length} items. Algorithm-surfaced, manually approved.
          Built with Claude Code as part of a thesis on hyper-personalised commerce.
        </p>
      </footer>
    </div>
  )
}
