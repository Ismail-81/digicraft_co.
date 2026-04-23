import { Award, CheckCircle2 } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

const HIGHLIGHTS = [
  'Results-focused approach',
  'Transparent reporting',
  'Dedicated account managers',
  'Agile & fast delivery',
  'No lock-in contracts',
  'Proven track record',
]

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 bg-background relative overflow-hidden">
      {/* Ambient glow left */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] bg-accent opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">

        {/* Text — left side intentionally dominant */}
        <div>
          <div className="section-badge mb-6">
            <span className="badge-dot" />
            About Us
          </div>
          <h2 className="section-title mb-6">
            We're a Full-Stack{' '}
            <span className="text-gradient">Digital Partner</span>
          </h2>

          <p className="text-base text-muted-foreground leading-[1.8] mb-5">
            DigiCraft Co. was founded with a single mission: to help ambitious businesses grow through smart, honest, and effective digital strategy. We combine the analytical rigour of a marketing consultancy with the creative firepower of a design studio.
          </p>
          <p className="text-base text-muted-foreground leading-[1.8] mb-10">
            Whether you're a startup ready to launch or an established business looking to scale, we have the team, tools, and track record to make it happen.
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-accent flex-shrink-0" strokeWidth={2} />
                <span className="text-sm font-medium text-foreground">{h}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary group">
            Work With Us
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        {/* Visual stack — right */}
        <div className="relative h-[440px] order-last lg:order-last">
          {/* Main blue block */}
          <div className="absolute left-0 top-0 w-[240px] h-[300px] gradient-bg rounded-2xl flex flex-col justify-end p-7 shadow-accent-lg">
            {/* Decorative dots inside */}
            <div className="absolute top-5 right-5 grid grid-cols-3 gap-2 opacity-25">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-white" />
              ))}
            </div>
            <div className="font-display text-3xl text-white leading-snug mb-2">
              8 Years of<br />Excellence
            </div>
            <p className="text-sm text-white/60">Building digital futures since 2016</p>
          </div>

          {/* Stat card — gradient border */}
          <div className="absolute right-0 top-8 w-[175px]">
            <div className="gradient-border shadow-accent">
              <div className="card-featured bg-card p-6 text-center">
                <div className="font-display text-5xl text-foreground leading-none mb-2">
                  150<span className="text-gradient">+</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">Projects delivered globally</p>
              </div>
            </div>
          </div>

          {/* Dark bottom bar */}
          <div className="absolute left-12 bottom-0 right-0 h-[120px] bg-foreground rounded-2xl flex items-center px-6 gap-4">
            {/* Dot pattern texture */}
            <div className="absolute inset-0 rounded-2xl dot-pattern" />
            <div className="relative w-10 h-10 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0 shadow-accent">
              <Award size={17} className="text-white" />
            </div>
            <p className="relative text-sm text-white/80 leading-snug">
              Trusted by 80+ companies across India, UAE & UK
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
