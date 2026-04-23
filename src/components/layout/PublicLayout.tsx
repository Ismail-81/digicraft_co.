import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  Info, 
  CheckCircle2, 
  Briefcase,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', href: '#services', icon: Layers },
  { label: 'About', href: '#about', icon: Info },
  { label: 'Why Us', href: '#why', icon: CheckCircle2 },
  { label: 'Portfolio', href: '#portfolio', icon: Briefcase },
]

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 no-underline group">
      {/* <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 shadow-accent group-hover:shadow-accent-lg transition-shadow duration-300">
        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
          <rect x="2" y="2" width="7" height="7" fill="white" />
          <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.6" />
          <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.6" />
          <rect x="11" y="11" width="7" height="7" fill="white" />
        </svg>
      </div> */}
      <span className={`font-display text-xl font-normal tracking-tight ${light ? 'text-white' : 'text-foreground'}`}>
        Digi<span className="text-gradient">Craft</span> Co.
      </span>
    </Link>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="btn-primary !py-2.5 !px-5 text-xs group">
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer menu */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${mobileOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/40 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        
        {/* Drawer content */}
        <div className={`absolute top-0 right-0 bottom-0 w-[280px] bg-card shadow-2xl border-l border-border flex flex-col transition-transform duration-500 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="h-16 px-6 border-b border-border flex items-center justify-between bg-card sticky top-0 z-10">
            <Logo />
            <button
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-4 mb-4">Navigation</p>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 no-underline group"
                  style={{ 
                    transitionDelay: `${i * 40}ms`,
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(10px)'
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <link.icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-10 px-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4">Get in Touch</p>
              <div className="space-y-4">
                <a href="mailto:hello@digicraft.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent no-underline transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent">
                    <Mail size={14} />
                  </div>
                  digicraft.co.in@gmail.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent no-underline transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent">
                    <Phone size={14} />
                  </div>
                  +91 95747 95108
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/30">
            <a href="#contact" className="btn-primary w-full justify-center mb-6" onClick={() => setMobileOpen(false)}>
              Get Started <ArrowRight size={16} />
            </a>
            
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="p-2 text-muted-foreground hover:text-accent transition-colors"><Twitter size={18} /></a>
              <a href="https://www.instagram.com/ismail._.gheewala" className="p-2 text-muted-foreground hover:text-accent transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 text-muted-foreground hover:text-accent transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-foreground relative overflow-hidden pt-20 pb-10 px-6">
      {/* Dot texture */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] bg-accent opacity-5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10 mb-8">
          <div className="md:col-span-2">
            <Logo light />
            <p className="mt-5 text-sm text-white/40 leading-relaxed max-w-xs">
              We build brands that dominate online through smart web development and data-driven digital marketing.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/30 mb-5">Services</p>
            <ul className="space-y-3 list-none">
              {['Web Development', 'Digital Marketing', 'SEO', 'Social Media'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/30 mb-5">Company</p>
            <ul className="space-y-3 list-none">
              {['About Us', 'Portfolio', 'Contact', 'Admin'].map((s, i) => (
                <li key={s}>
                  <a
                    href={i === 3 ? '/admin' : `#${s.toLowerCase().replace(' ', '')}`}
                    className="text-sm text-white/50 hover:text-white transition-colors no-underline"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25">
            © {year} <span className="text-gradient">DigiCraft Co.</span> All rights reserved.
          </p>
          <p className="text-xs text-white/25">Crafted with precision in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
