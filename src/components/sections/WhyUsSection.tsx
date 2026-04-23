import { Zap, BarChart2, Users, Shield, Monitor, TrendingUp, Search, Share2, ShoppingCart, Target, Layers, Globe, type LucideIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

const ICON_MAP: Record<string, LucideIcon> = {
  Zap, BarChart2, Users, Shield, Monitor, TrendingUp, Search, Share2, ShoppingCart, Target, Layers, Globe,
}

const FALLBACK_POINTS = [
  { id: '1', icon: 'Zap', title: 'Fast Delivery', description: 'We move at startup speed without sacrificing quality. Most projects go live in 2–4 weeks.' },
  { id: '2', icon: 'BarChart2', title: 'Data-Driven', description: 'Every decision is backed by real analytics. No guessing, no gut feelings — only evidence.' },
  { id: '3', icon: 'Users', title: 'Dedicated Team', description: 'You get a named account manager and direct Slack access — not a ticket queue.' },
  { id: '4', icon: 'Shield', title: 'No Lock-In', description: 'Month-to-month engagements. We earn your business every month because we deliver results.' },
]

export default function WhyUsSection() {
  const { data: points } = useQuery({
    queryKey: ['why-us'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('why_us_points')
        .select('*')
        .eq('is_active', true)
        .order('order_index')
      if (error) throw error
      return data
    },
  })

  const displayPoints = (!points || points.length === 0) ? FALLBACK_POINTS : points

  return (
    /* Inverted section — dark background, dramatic contrast */
    <section id="why" className="py-28 px-6 bg-foreground relative overflow-hidden">
      {/* Dot texture */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      {/* Radial glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] bg-accent opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] bg-accent-secondary opacity-[0.04] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-accent mb-6">
              <span className="badge-dot" />
              Why Choose Us
            </div>
            <h2 className="font-display text-4xl lg:text-[3.25rem] leading-[1.1] tracking-tight text-white">
              The DigiCraft{' '}
              <span className="text-gradient">Difference</span>
            </h2>
          </div>
          <p className="text-base text-white/40 leading-relaxed max-w-sm">
            Four reasons clients choose us — and stay with us year after year.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayPoints.map((point, i) => {
            const Icon = ICON_MAP[point.icon] ?? Zap
            return (
              <div
                key={point.id}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/8 hover:border-accent/30 transition-all duration-300 overflow-hidden"
              >
                {/* Ghost number */}
                <span className="absolute -top-2 -right-2 font-display text-8xl font-normal text-white/[0.03] leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon with gradient bg */}
                <div className="relative w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-accent group-hover:shadow-accent-lg transition-shadow duration-300">
                  <Icon size={22} className="text-white" strokeWidth={1.8} />
                </div>

                <h3 className="relative text-lg font-semibold text-white mb-3 tracking-tight">{point.title}</h3>
                <p className="relative text-sm text-white/50 leading-relaxed">{point.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats bar — inverted emphasis */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: '150+', label: 'Projects Shipped' },
            { num: '80+', label: 'Happy Clients' },
            { num: '8yr', label: 'Experience' },
            { num: '98%', label: 'Retention Rate' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center lg:text-left">
              <div className="font-display text-4xl text-gradient mb-1">{num}</div>
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/35">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
