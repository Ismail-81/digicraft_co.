import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { supabase, uploadPortfolioImage, deletePortfolioImage, getPublicUrl } from '@/lib/supabase'
import type { PortfolioItem, PortfolioFormData } from '@/types'

const QUERY_KEY = ['portfolio']

async function fetchPortfolio(activeOnly = true): Promise<PortfolioItem[]> {
  let query = supabase
    .from('portfolio')
    .select('*')
    .order('order_index', { ascending: true })

  if (activeOnly) query = query.eq('is_active', true)

  const { data, error } = await query
  if (error) throw error

  return (data ?? []).map((item) => ({
    ...item,
    image_url: item.image_path ? getPublicUrl(item.image_path) : null,
  }))
}

export function usePortfolio(activeOnly = true) {
  return useQuery({
    queryKey: [...QUERY_KEY, { activeOnly }],
    queryFn: () => fetchPortfolio(activeOnly),
  })
}

export function useCreatePortfolioItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      data,
      imageFile,
    }: {
      data: PortfolioFormData
      imageFile?: File
    }) => {
      const { data: inserted, error } = await supabase
        .from('portfolio')
        .insert([data])
        .select()
        .single()
      if (error) throw error

      if (imageFile && inserted) {
        const imagePath = await uploadPortfolioImage(imageFile, inserted.id)
        await supabase
          .from('portfolio')
          .update({ image_path: imagePath })
          .eq('id', inserted.id)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Portfolio item created')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useUpdatePortfolioItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      data,
      imageFile,
      currentImagePath,
    }: {
      id: string
      data: PortfolioFormData
      imageFile?: File
      currentImagePath?: string | null
    }) => {
      let imagePath = currentImagePath

      if (imageFile) {
        if (currentImagePath) await deletePortfolioImage(currentImagePath)
        imagePath = await uploadPortfolioImage(imageFile, id)
      }

      const { error } = await supabase
        .from('portfolio')
        .update({ ...data, image_path: imagePath, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Portfolio item updated')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useDeletePortfolioItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, imagePath }: { id: string; imagePath?: string | null }) => {
      if (imagePath) await deletePortfolioImage(imagePath)
      const { error } = await supabase.from('portfolio').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Portfolio item deleted')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
