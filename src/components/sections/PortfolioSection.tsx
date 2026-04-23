import { useState } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'

const FALLBACK_ITEMS = [
  { id: '1', title: 'NovaMart', category: 'Web Development', description: 'Full e-commerce build with custom checkout flow, boosting conversion by 38%.', bg_color: '#0052FF', image_url: null, link_url: null },
]

const ALL_CATEGORIES = ['All', 'Web Development', 'Digital Marketing', 'SEO', 'Social Media']

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { data: portfolioItems } = usePortfolio()

  const items = (!portfolioItems || portfolioItems.length === 0) ? FALLBACK_ITEMS : portfolioItems

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-badge mb-6">
              <span className="badge-dot" />
              Our Work
            </div>
            <h2 className="section-title">
              Selected{' '}
              <span className="text-gradient">Projects</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'gradient-bg border-transparent text-white shadow-accent'
                    : 'bg-card border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="card-base overflow-hidden group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Thumbnail */}
              <div
                className="h-52 relative overflow-hidden flex items-center justify-center"
                style={{ background: item.bg_color || '#0052FF' }}
              >
                {/* Subtle dot pattern overlay */}
                <div className="absolute inset-0 dot-pattern" />

                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 border-b-2 border-border"
                  />
                ) : (
                  <span className="relative font-display text-4xl text-white/90 tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {item.title}
                  </span>
                )}

                {/* Category pill on image */}
                <div className="absolute top-3 right-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-0.1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                {item.link_url ? (
                  <a
                    href={item.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-5 group/link"
                  >
                    View Project
                    <ExternalLink size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-muted-foreground/50">
                    Case Study Available on Request
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
