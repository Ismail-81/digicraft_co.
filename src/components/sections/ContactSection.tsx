import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, MapPin, Linkedin, Twitter, Instagram, Github, Send } from 'lucide-react'
import { useSubmitContact } from '@/hooks/useContactSubmissions'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const SERVICES = [
  'Web Development', 'Digital Marketing', 'SEO',
  'Social Media Marketing', 'E-Commerce', 'General Inquiry',
]

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X' },
  { icon: Instagram, href: 'https://instagram.com/ismail._.gheewala', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/Ismail-81', label: 'GitHub' },
]

export default function ContactSection() {
  const { mutate: submitContact, isPending } = useSubmitContact()

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: ContactFormData) => {
    submitContact(data, { onSuccess: () => reset() })
  }

  return (
    /* Inverted section for dramatic CTA */
    <section id="contact" className="py-28 px-6 bg-foreground relative overflow-hidden">
      {/* Dot texture */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      {/* Radial glow centre */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[160px] bg-accent opacity-[0.06] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left info */}
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-accent mb-6">
            <span className="badge-dot" />
            Get In Touch
          </div>
          <h2 className="font-display text-4xl lg:text-[3.25rem] leading-[1.1] tracking-tight text-white mb-6">
            Let's Build{' '}
            <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-base text-white/50 leading-[1.75] max-w-md mb-10">
            Ready to take your digital presence to the next level? Drop us a message and we'll get back to you within one business day.
          </p>

          {/* Contact details */}
          <div className="flex flex-col gap-5 mb-10">
            {[
              { icon: Mail, label: 'Email', value: 'digicraft.co.in@gmail.com', href: 'mailto:digicraft.co.in@gmail.com' },
              { icon: MapPin, label: 'Location', value: 'Bharuch, Gujarat, India', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0 shadow-accent">
                  <Icon size={17} className="text-white" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/30 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-white hover:text-accent transition-colors no-underline">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-white/80">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:gradient-bg hover:border-transparent hover:text-white hover:shadow-accent transition-all duration-200 no-underline group"
              >
                <Icon size={17} className="group-hover:scale-110 transition-transform duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* Right form card — sits on inverted bg */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-xl">
          <h3 className="font-display text-2xl text-foreground mb-7">Send a Message</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Name *</label>
                <input {...register('name')} placeholder="Your name" className="form-input" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input {...register('email')} type="email" placeholder="you@company.com" className="form-input" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Company</label>
                <input {...register('company')} placeholder="Your company" className="form-input" />
              </div>
              <div>
                <label className="form-label">Service</label>
                <select {...register('service')} className="form-input">
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Message *</label>
              <textarea
                {...register('message')}
                placeholder="Tell us about your project..."
                rows={5}
                className="form-input !h-auto resize-none"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? 'Sending…' : (
                <>
                  Send Message
                  <Send size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
