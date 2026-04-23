import { useServices } from '@/hooks/useServices'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useContactSubmissions } from '@/hooks/useContactSubmissions'
import { Layers, Image, Inbox, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { data: services } = useServices(false)
  const { data: portfolio } = usePortfolio(false)
  const { data: submissions } = useContactSubmissions()

  const unreadCount = submissions?.filter((s) => !s.is_read).length ?? 0

  const stats = [
    { label: 'Total Services', value: services?.length ?? 0, icon: Layers, color: 'bg-brand-blue' },
    { label: 'Portfolio Items', value: portfolio?.length ?? 0, icon: Image, color: 'bg-brand-black' },
    { label: 'Total Inquiries', value: submissions?.length ?? 0, icon: TrendingUp, color: 'bg-brand-blue' },
    { label: 'Unread Messages', value: unreadCount, icon: Inbox, color: unreadCount > 0 ? 'bg-red-500' : 'bg-brand-black' },
  ]

  return (
    <div className="p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-sm text-white/40">Welcome back. Here's what's happening with your site.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/5 border border-white/8 rounded-sm p-6">
            <div className={`w-10 h-10 ${color} rounded flex items-center justify-center mb-4`}>
              <Icon size={18} className="text-white" />
            </div>
            <div className="font-serif text-4xl font-black text-white mb-1">{value}</div>
            <div className="text-xs text-white/40 font-medium tracking-wide">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent submissions */}
      <div className="bg-white/5 border border-white/8 rounded-sm">
        <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-white">Recent Inquiries</h2>
          <a href="/admin/inbox" className="text-xs text-brand-blue font-semibold hover:underline">
            View all →
          </a>
        </div>
        <div className="divide-y divide-white/5">
          {(submissions ?? []).slice(0, 5).map((sub) => (
            <div key={sub.id} className="px-6 py-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {!sub.is_read && (
                  <span className="w-2 h-2 bg-brand-blue rounded-full mt-1.5 flex-shrink-0" />
                )}
                <div className={sub.is_read ? 'ml-5' : ''}>
                  <p className="text-sm font-medium text-white">{sub.name}</p>
                  <p className="text-xs text-white/40">{sub.email} · {sub.service ?? 'General'}</p>
                </div>
              </div>
              <span className="text-xs text-white/30 whitespace-nowrap">{formatDate(sub.created_at)}</span>
            </div>
          ))}
          {(!submissions || submissions.length === 0) && (
            <div className="px-6 py-8 text-center text-sm text-white/30">No inquiries yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
