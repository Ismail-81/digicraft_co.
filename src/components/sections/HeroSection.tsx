import { ArrowRight, TrendingUp, Users } from 'lucide-react'

function AnimatedHeroGraphic() {
  return (
    <div className="hidden lg:block relative h-[520px] w-full">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[440px] h-[440px] rounded-full border-2 border-dashed border-accent/20 animate-spin-slow"
          style={{ animationDuration: '60s' }}
        />
      </div>
      {/* Inner ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[280px] h-[280px] rounded-full border border-accent/10" />
      </div>

      {/* Radial glow behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] bg-accent opacity-[0.07] pointer-events-none" />

      {/* Main floating card — SEO */}
      <div className="absolute left-4 top-16 w-72 bg-card border border-border rounded-2xl p-6 shadow-xl animate-float-slow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
            <TrendingUp size={14} className="text-white" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">SEO Performance</span>
        </div>
        <div className="font-display text-4xl text-foreground mb-1">+284%</div>
        <p className="text-xs text-muted-foreground mb-5">Organic traffic growth, Q4 2024</p>
        {[
          { label: 'Desktop', pct: 87 },
          { label: 'Mobile', pct: 74 },
          { label: 'Backlinks', pct: 60 },
        ].map(({ label, pct }) => (
          <div key={label} className="flex items-center gap-2 mt-2.5">
            <span className="text-xs text-muted-foreground w-16 flex-shrink-0">{label}</span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-bg rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground w-8 text-right">{pct}%</span>
          </div>
        ))}
      </div>

      {/* Top-right stat card */}
      <div className="absolute right-0 top-8 w-52 animate-float-mid" style={{ animationDelay: '0.5s' }}>
        <div className="gradient-border shadow-accent">
          <div className="card-featured bg-card p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-2">Conversion Rate</div>
            <div className="font-display text-3xl text-foreground mb-1">4.7x</div>
            <p className="text-xs text-muted-foreground">Avg. ROAS this year</p>
          </div>
        </div>
      </div>

      {/* Bottom card */}
      <div className="absolute left-20 bottom-4 right-0 bg-foreground rounded-2xl p-5 animate-float-slow" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
            <Users size={16} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">Active Campaign</span>
            </div>
            <div className="font-display text-base text-white">E-Commerce Scale-Up</div>
            <p className="text-xs text-white/50 mt-0.5">12 channels · 3 markets</p>
          </div>
        </div>
      </div>

      {/* Decorative dots grid */}
      <div className="absolute top-1/2 right-16 -translate-y-1/2 grid grid-cols-3 gap-3 opacity-30 pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />
        ))}
      </div>

      {/* Corner accent block */}
      <div className="absolute bottom-24 right-4 w-10 h-10 gradient-bg rounded-xl shadow-accent opacity-80" />
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-8 pb-20 relative overflow-hidden bg-background">
      {/* Ambient glow top-right */}
      <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full blur-[160px] bg-accent opacity-[0.06] pointer-events-none" />
      <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full blur-[120px] bg-accent-secondary opacity-[0.04] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

        {/* Left content */}
        <div className="animate-slide-up">
          {/* Section badge */}
          <div className="section-badge mb-8">
            <span className="badge-dot" />
            Digital Growth Agency
          </div>

          {/* Headline */}
          <h1 className="hero-title mb-6">
            We Build Brands That{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Dominate</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 rounded-sm bg-gradient-to-r from-accent/15 to-accent-secondary/10" />
            </span>
            {' '}Online
          </h1>

          <p className="section-desc mb-10">
            DigiCraft Co. combines cutting-edge web development with data-driven
            digital marketing to grow your business and outshine the competition.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#contact" className="btn-primary group">
              Start a Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a href="#portfolio" className="btn-outline">
              View Our Work
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-border">
            {[
              { num: '150+', label: 'Projects Delivered' },
              { num: '8yr', label: 'In Business' },
              { num: '98%', label: 'Client Retention' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display text-4xl text-foreground leading-none mb-1.5">
                  {num}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: animated graphic */}
        <AnimatedHeroGraphic />
      </div>
    </section>
  )
}
