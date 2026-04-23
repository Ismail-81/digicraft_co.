import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// ─── Storage helpers ───────────────────────────────────────────────

export const STORAGE_BUCKET = 'portfolio-images'

export const getPublicUrl = (path: string): string => {
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export const uploadPortfolioImage = async (
  file: File,
  portfolioId: string
): Promise<string> => {
  const ext = file.name.split('.').pop()
  const fileName = `${portfolioId}-${Date.now()}.${ext}`
  const filePath = `portfolio/${fileName}`

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, { upsert: true })

  if (error) throw error
  return filePath
}

export const deletePortfolioImage = async (path: string): Promise<void> => {
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path])
  if (error) throw error
}
