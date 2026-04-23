import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { useServices, useCreateService, useUpdateService, useDeleteService } from '@/hooks/useServices'
import type { Service, ServiceFormData } from '@/types'
import { SERVICE_ICONS } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(2, 'Required'),
  description: z.string().min(10, 'Required'),
  icon: z.string(),
  tags: z.string(),
  order_index: z.coerce.number().int().min(0),
  is_active: z.boolean(),
})

function ServiceForm({
  initial,
  onClose,
}: {
  initial?: Service
  onClose: () => void
}) {
  const create = useCreateService()
  const update = useUpdateService()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ServiceFormData>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? { ...initial, tags: initial.tags.join(', ') }
      : { title: '', description: '', icon: 'Monitor', tags: '', order_index: 0, is_active: true },
  })

  const onSubmit = async (data: ServiceFormData) => {
    if (initial) {
      await update.mutateAsync({ id: initial.id, data })
    } else {
      await create.mutateAsync(data)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#161616] border border-white/10 rounded-sm w-full max-w-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-white">
            {initial ? 'Edit Service' : 'New Service'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <label className="form-label !text-white/50">Order Index</label>
              <input {...register('order_index')} type="number" className="form-input !bg-white/5 !border-white/10 !text-white" />
            </div>
          </div>

          <div>
            <label className="form-label !text-white/50">Tags (comma-separated)</label>
            <input {...register('tags')} placeholder="React, Node.js, Tailwind" className="form-input !bg-white/5 !border-white/10 !text-white" />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input {...register('is_active')} type="checkbox" className="w-4 h-4 accent-brand-blue" />
            <span className="text-sm text-white/60">Active (visible on site)</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1 !py-3 !border-white/10 !text-white/60 hover:!text-white hover:!border-white/30">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 !py-3 disabled:opacity-60">
              {isSubmitting ? 'Saving…' : initial ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ServicesAdminPage() {
  const { data: services, isLoading } = useServices(false)
  const deleteService = useDeleteService()
  const [editing, setEditing] = useState<Service | null | 'new'>(null)

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-black text-white mb-1">Services</h1>
          <p className="text-sm text-white/40">Manage services shown on the public site.</p>
        </div>
        <button onClick={() => setEditing('new')} className="btn-primary !py-2.5 !px-5 text-xs">
          <Plus size={15} /> New Service
        </button>
      </div>

      {isLoading ? (
        <div className="text-white/30 text-sm">Loading…</div>
      ) : (
        <div className="space-y-3">
          {(services ?? []).map((service) => (
            <div key={service.id} className="bg-white/5 border border-white/8 rounded-sm px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full ${service.is_active ? 'bg-green-400' : 'bg-white/20'}`} />
                <div>
                  <p className="text-sm font-semibold text-white">{service.title}</p>
                  <p className="text-xs text-white/35 mt-0.5 line-clamp-1">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditing(service)}
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this service?')) deleteService.mutate(service.id)
                  }}
                  className="w-8 h-8 bg-white/5 hover:bg-red-500/20 rounded flex items-center justify-center text-white/50 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {(services ?? []).length === 0 && (
            <div className="text-center py-16 text-white/30 text-sm">
              No services yet. Create your first one.
            </div>
          )}
        </div>
      )}

      {editing && (
        <ServiceForm
          initial={editing === 'new' ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
