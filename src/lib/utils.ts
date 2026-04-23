import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '…'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const PORTFOLIO_CATEGORIES = [
  'Web Development',
  'Digital Marketing',
  'SEO',
  'Social Media',
  'E-Commerce',
  'Branding',
] as const

export const SERVICE_ICONS = [
  'Monitor',
  'TrendingUp',
  'Search',
  'Share2',
  'ShoppingCart',
  'BarChart2',
  'Globe',
  'Zap',
  'Target',
  'Layers',
] as const
