// ─── Database Types ────────────────────────────────────────────────

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image_url: string | null
  image_path: string | null
  bg_color: string
  link_url: string | null
  is_featured: boolean
  is_active: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface WhyUsPoint {
  id: string
  title: string
  description: string
  icon: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  author_name: string
  author_role: string
  author_company: string
  content: string
  rating: number
  is_active: boolean
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string | null
  service: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  key: string
  value: string
  updated_at: string
}

// ─── Form Types ────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  message: string
}

export interface ServiceFormData {
  title: string
  description: string
  icon: string
  tags: string
  order_index: number
  is_active: boolean
}

export interface PortfolioFormData {
  title: string
  category: string
  description: string
  bg_color: string
  link_url?: string
  is_featured: boolean
  is_active: boolean
  order_index: number
}

export interface WhyUsFormData {
  title: string
  description: string
  icon: string
  order_index: number
  is_active: boolean
}

// ─── Auth Types ────────────────────────────────────────────────────

export interface AdminUser {
  id: string
  email: string
  role: 'admin'
}

// ─── UI Types ─────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface NavLink {
  label: string
  href: string
}
