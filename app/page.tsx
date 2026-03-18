'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, categories, type Category } from '@/data/products'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <header className="mb-16">
        <h1 className="text-2xl font-medium tracking-tight">dom.shop</h1>
        <p className="text-sm text-muted mt-2 leading-relaxed max-w-md">
          Things I actually buy, use, and would buy again.
          No sponsorships. No affiliate games. Just stuff that works.
        </p>
      </header>

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
                <div className="flex items-baseline justify-between py-4 border-b border-border group-hover:border-muted transition-colors">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-medium text-primary">{product.name}</span>
                      <span className="text-xs font-mono text-muted">{product.category}</span>
                    </div>
                    <p className="text-xs text-muted mt-0.5 truncate">{product.oneLiner}</p>
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
                    <div className="py-4 border-b border-border">
                      <p className="text-sm text-subtle leading-relaxed">{product.whyILikeIt}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-primary underline underline-offset-4 hover:text-accent transition-colors"
                        >
                          buy it
                        </a>
                        <div className="flex gap-1.5">
                          {product.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-muted px-1.5 py-0.5 bg-bg border border-border rounded">
                              {tag}
                            </span>
                          ))}
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

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <p className="text-xs text-muted">
          {products.length} items curated by Dom. Updated when something earns its spot or loses it.
        </p>
      </footer>
    </div>
  )
}
