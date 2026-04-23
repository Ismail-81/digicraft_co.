import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const signIn = useAuthStore((s) => s.signIn)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials'
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 bg-brand-blue rounded flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
              <rect x="2" y="2" width="7" height="7" fill="white" />
              <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.5" />
              <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.5" />
              <rect x="11" y="11" width="7" height="7" fill="white" />
            </svg>
          </div>
          <span className="font-serif font-black text-xl text-white">
            Digi<span className="text-brand-blue">Craft</span> Co.
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-sm p-8">
          <h1 className="font-serif text-2xl font-bold text-white mb-1">Admin Login</h1>
          <p className="text-sm text-white/40 mb-8">Sign in to manage your site content.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-white/50 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="admin@digicraft.co"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/25 outline-none focus:border-brand-blue transition-colors"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-white/50 mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/25 outline-none focus:border-brand-blue transition-colors"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-blue text-white py-3.5 rounded-sm text-sm font-semibold tracking-wide hover:bg-brand-blue-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          DigiCraft Co. Admin Panel · Secured by Supabase Auth
        </p>
      </div>
    </div>
  )
}
