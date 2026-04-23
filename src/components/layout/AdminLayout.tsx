import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Layers,
  Image,
  CheckSquare,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

const SIDEBAR_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Services', href: '/admin/services', icon: Layers, end: false },
  { label: 'Portfolio', href: '/admin/portfolio', icon: Image, end: false },
  { label: 'Why Us', href: '/admin/why-us', icon: CheckSquare, end: false },
  { label: 'Inbox', href: '/admin/inbox', icon: Inbox, end: false },
]

export default function AdminLayout() {
  const signOut = useAuthStore((s) => s.signOut)
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-brand-black border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand-blue rounded flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
              <rect x="2" y="2" width="7" height="7" fill="white" />
              <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.5" />
              <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.5" />
              <rect x="11" y="11" width="7" height="7" fill="white" />
            </svg>
          </div>
          <span className="font-serif font-black text-base text-white">
            Digi<span className="text-brand-blue">Craft</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-brand-black border-r border-white/5 flex flex-col
          transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo (Desktop only) */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand-blue rounded flex items-center justify-center">
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
                <rect x="2" y="2" width="7" height="7" fill="white" />
                <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.5" />
                <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.5" />
                <rect x="11" y="11" width="7" height="7" fill="white" />
              </svg>
            </div>
            <span className="font-serif font-black text-base text-white">
              Digi<span className="text-brand-blue">Craft</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {SIDEBAR_LINKS.map(({ label, href, icon: Icon, end }) => (
            <NavLink
              key={href}
              to={href}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + actions */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar-link"
          >
            <ExternalLink size={16} />
            View Site
          </a>
          <button
            onClick={handleSignOut}
            className="admin-sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Sign Out
          </button>
          <div className="px-4 pt-3 border-t border-white/5 mt-2">
            <p className="text-xs text-white/25 truncate">{user?.email}</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
