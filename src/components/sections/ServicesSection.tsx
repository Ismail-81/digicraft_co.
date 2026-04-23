import { Monitor, TrendingUp, Search, Share2, ShoppingCart, BarChart2, Globe, Zap, Target, Layers, ArrowRight } from 'lucide-react'
import { useServices } from '@/hooks/useServices'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Monitor, TrendingUp, Search, Share2, ShoppingCart, BarChart2, Globe, Zap, Target, Layers,
}

const FALLBACK_SERVICES = [
  { id: '1', title: 'Web Development', icon: 'Monitor', order_index: 1,
    description: 'Custom websites and web apps built for performance, scalability, and conversions. Pixel-perfect, lightning-fast, and built to last.',
    tags: ['React / Next.js', 'E-Commerce', 'CMS'] },
  { id: '2', title: 'Digital Marketing', icon: 'TrendingUp', order_index: 2,
    description: 'Full-funnel marketing strategies that attract, convert, and retain customers across every digital touchpoint.',
    tags: ['PPC', 'Email Marketing', 'Analytics'] },
  { id: '3', title: 'Search Engine Optimisation', icon: 'Search', order_index: 3,
    description: 'Rank higher, drive qualified traffic, and own your niche with our technical and content-driven SEO strategies.',
    tags: ['Technical SEO', 'Link Building', 'Local SEO'] },
  { id: '4', title: 'Social Media', icon: 'Share2', order_index: 4,
    description: 'Build an engaged community and grow your brand presence across every relevant social platform.',
    tags: ['Content Creation', 'Paid Social', 'Community'] },
]

export default function ServicesSection() {
  const { data: services, isLoading } = useServices()
  const displayServices = (isLoading || !services?.length) ? FALLBACK_SERVICES : services

  return (
    <section id="services" className="py-28 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-badge mb-5">
              <span className="badge-dot" />
              What We Do
            </div>
            <h2 className="section-title">
              Services That{' '}
              <span className="text-gradient">Move the Needle</span>
            </h2>
          </div>
          <p className="section-desc md:max-w-sm md:text-right">
            Every service we offer is built around measurable outcomes — not vanity metrics.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayServices.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Monitor
            const isFeatured = i === 0

            return isFeatured ? (
              /* Featured first card — gradient border */
              <div key={service.id} className="gradient-border shadow-accent-lg">
                <div className="card-featured h-full bg-card p-8 flex flex-col group cursor-default">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-accent group-hover:shadow-accent-lg transition-shadow duration-300">
                    <Icon size={22} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-1">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(service.tags ?? []).map((tag: string) => (
                      <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Standard card */
              <div
                key={service.id}
                className="card-base p-8 flex flex-col group cursor-default"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-accent group-hover:shadow-accent-lg transition-shadow duration-300">
                  <Icon size={22} className="text-white" strokeWidth={1.8} />
                </div>

                <div className="relative font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  0{i + 1}
                </div>
                <h3 className="relative text-xl font-semibold text-foreground mb-3 leading-snug tracking-tight">
                  {service.title}
                </h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>
                <div className="relative flex flex-wrap gap-1.5">
                  {(service.tags ?? []).map((tag: string) => (
                    <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full group-hover:text-accent group-hover:border-accent/20 group-hover:bg-accent/5 transition-colors duration-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
