import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

// Public
import PublicLayout from '@/components/layout/PublicLayout'
import HomePage from '@/pages/public/HomePage'

// Admin
import AdminLayout from '@/components/layout/AdminLayout'
import LoginPage from '@/pages/admin/LoginPage'
import DashboardPage from '@/pages/admin/DashboardPage'
import ServicesAdminPage from '@/pages/admin/ServicesAdminPage'
import PortfolioAdminPage from '@/pages/admin/PortfolioAdminPage'
import WhyUsAdminPage from '@/pages/admin/WhyUsAdminPage'
import ContactInboxPage from '@/pages/admin/ContactInboxPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* ── Admin ── */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="services" element={<ServicesAdminPage />} />
        <Route path="portfolio" element={<PortfolioAdminPage />} />
        <Route path="why-us" element={<WhyUsAdminPage />} />
        <Route path="inbox" element={<ContactInboxPage />} />
      </Route>

      {/* ── Fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
