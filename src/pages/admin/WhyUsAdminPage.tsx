import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import type { WhyUsPoint, WhyUsFormData } from '@/types'
import { SERVICE_ICONS } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(2, 'Required'),
  description: z.string().min(10, 'Required'),
  icon: z.string(),
  order_index: z.coerce.number().int().min(0),
  is_active: z.boolean(),
})

const QUERY_KEY = ['why-us-admin']

function useWhyUsPoints() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('why_us_points')
        .select('*')
        .order('order_index')
      if (error) throw error
      return data as WhyUsPoint[]
    },
  })
}

function WhyUsForm({ initial, onClose }: { initial?: WhyUsPoint; onClose: () => void }) {
  const qc = useQueryClient()

  const save = useMutation({
    mutationFn: async (data: WhyUsFormData) => {
      if (initial) {
        const { error } = await supabase.from('why_us_points').update({ ...data, updated_at: new Date().toISOString() }).eq('id', initial.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('why_us_points').insert([data])
        if (error) throw error
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY })
      qc.invalidateQueries({ queryKey: ['why-us'] })
      toast.success(initial ? 'Point updated' : 'Point created')
      onClose()
    },
    onError: (err: Error) => toast.error(err.message),
  })

  const { register, handleSubmit, formState: { errors } } = useForm<WhyUsFormData>({
    resolver: zodResolver(schema),
    defaultValues: initial ?? { title: '', description: '', icon: 'Zap', order_index: 0, is_active: true },
  })

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#161616] border border-white/10 rounded-sm w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-white">{initial ? 'Edit Point' : 'New Point'}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit((d) => save.mutate(d))} className="space-y-4">
          <div>
            <label className="form-label !text-white/50">Title *</label>
            <input {...register('title')} className="form-input !bg-white/5 !border-white/10 !text-white" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="form-label !text-white/50">Description *</label>
            <textarea {...register('description')} rows={3} className="form-input !bg-white/5 !border-white/10 !text-white resize-none" />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label !text-white/50">Icon</label>
              <select {...register('icon')} className="form-input !bg-white/5 !border-white/10 !text-white">
                {SERVICE_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label !text-white/50">Order</label>
              <input {...register('order_index')} type="number" className="form-input !bg-white/5 !border-white/10 !text-white" />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input {...register('is_active')} type="checkbox" className="w-4 h-4 accent-brand-blue" />
            <span className="text-sm text-white/60">Active</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1 !py-3 !border-white/10 !text-white/60">Cancel</button>
            <button type="submit" disabled={save.isPending} className="btn-primary flex-1 !py-3 disabled:opacity-60">
              {save.isPending ? 'Saving…' : initial ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function WhyUsAdminPage() {
  const { data: points, isLoading } = useWhyUsPoints()
  const qc = useQueryClient()
  const [editing, setEditing] = useState<WhyUsPoint | null | 'new'>(null)

  const deletePoint = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('why_us_points').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Point deleted')
    },
  })

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-black text-white mb-1">Why Choose Us</h1>
          <p className="text-sm text-white/40">Manage the selling points shown on the public site.</p>
        </div>
        <button onClick={() => setEditing('new')} className="btn-primary !py-2.5 !px-5 text-xs">
          <Plus size={15} /> New Point
        </button>
      </div>

      {isLoading ? <div className="text-white/30 text-sm">Loading…</div> : (
        <div className="space-y-3">
          {(points ?? []).map((point) => (
            <div key={point.id} className="bg-white/5 border border-white/8 rounded-sm px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full ${point.is_active ? 'bg-green-400' : 'bg-white/20'}`} />
                <div>
                  <p className="text-sm font-semibold text-white">{point.title}</p>
                  <p className="text-xs text-white/35 mt-0.5 line-clamp-1">{point.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(point)} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => { if (confirm('Delete?')) deletePoint.mutate(point.id) }}
                  className="w-8 h-8 bg-white/5 hover:bg-red-500/20 rounded flex items-center justify-center text-white/50 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {(points ?? []).length === 0 && (
            <div className="text-center py-16 text-white/30 text-sm">No points yet.</div>
          )}
        </div>
      )}

      {editing && (
        <WhyUsForm initial={editing === 'new' ? undefined : editing} onClose={() => setEditing(null)} />
      )}
    </div>
  )
}
