import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import type { Service, ServiceFormData } from '@/types'

const QUERY_KEY = ['services']

// ─── Fetch ─────────────────────────────────────────────────────────

async function fetchServices(activeOnly = true): Promise<Service[]> {
  let query = supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })

  if (activeOnly) query = query.eq('is_active', true)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// ─── Hooks ─────────────────────────────────────────────────────────

export function useServices(activeOnly = true) {
  return useQuery({
    queryKey: [...QUERY_KEY, { activeOnly }],
    queryFn: () => fetchServices(activeOnly),
  })
}

export function useCreateService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ServiceFormData) => {
      const tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      const { error } = await supabase
        .from('services')
        .insert([{ ...data, tags }])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service created successfully')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useUpdateService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServiceFormData }) => {
      const tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      const { error } = await supabase
        .from('services')
        .update({ ...data, tags, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service updated successfully')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useDeleteService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service deleted')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
