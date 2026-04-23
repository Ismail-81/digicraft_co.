import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { usePortfolio, useCreatePortfolioItem, useUpdatePortfolioItem, useDeletePortfolioItem } from '@/hooks/usePortfolio'
import type { PortfolioItem, PortfolioFormData } from '@/types'
import { PORTFOLIO_CATEGORIES } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(2, 'Required'),
  category: z.string(),
  description: z.string().min(10, 'Required'),
  bg_color: z.string(),
  link_url: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  order_index: z.coerce.number().int().min(0),
})

function PortfolioForm({ initial, onClose }: { initial?: PortfolioItem; onClose: () => void }) {
  const create = useCreatePortfolioItem()
  const update = useUpdatePortfolioItem()
  const [imageFile, setImageFile] = useState<File | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PortfolioFormData>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? {
          title: initial.title,
          category: initial.category,
          description: initial.description,
          bg_color: initial.bg_color,
          link_url: initial.link_url ?? '',
          is_featured: initial.is_featured,
          is_active: initial.is_active,
          order_index: initial.order_index,
        }
      : {
          title: '',
          category: 'Web Development',
          description: '',
          bg_color: '#1a1aed',
          link_url: '',
          is_featured: false,
          is_active: true,
          order_index: 0,
        },
  })

  const onSubmit: SubmitHandler<PortfolioFormData> = async (data) => {
    if (initial) {
      await update.mutateAsync({ id: initial.id, data, imageFile: imageFile ?? undefined, currentImagePath: initial.image_path })
    } else {
      await create.mutateAsync({ data, imageFile: imageFile ?? undefined })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 overflow-y-auto py-8">
      <div className="bg-[#161616] border border-white/10 rounded-sm w-full max-w-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-white">
            {initial ? 'Edit Project' : 'New Project'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label !text-white/50">Title *</label>
              <input {...register('title')} className="form-input !bg-white/5 !border-white/10 !text-white" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="form-label !text-white/50">Category</label>
              <select {...register('category')} className="form-input !bg-white/5 !border-white/10 !text-white">
                {PORTFOLIO_CATEGORIES.map((c) => <option className='bg-black' key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label !text-white/50">Description *</label>
            <textarea {...register('description')} rows={3} className="form-input !bg-white/5 !border-white/10 !text-white resize-none" />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label !text-white/50">Background Color</label>
              <div className="flex gap-2">
                <input {...register('bg_color')} type="color" className="w-12 h-10 rounded border border-white/10 bg-transparent cursor-pointer" />
                <input {...register('bg_color')} className="form-input !bg-white/5 !border-white/10 !text-white flex-1" />
              </div>
            </div>
            <div>
              <label className="form-label !text-white/50">Order Index</label>
              <input {...register('order_index')} type="number" className="form-input !bg-white/5 !border-white/10 !text-white" />
            </div>
          </div>

          <div>
            <label className="form-label !text-white/50">Project URL</label>
            <input {...register('link_url')} type="url" placeholder="https://..." className="form-input !bg-white/5 !border-white/10 !text-white" />
            {errors.link_url && <p className="text-red-400 text-xs mt-1">{errors.link_url.message}</p>}
          </div>

          <div>
            <label className="form-label !text-white/50">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-white/40 file:mr-3 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-brand-blue file:text-white file:text-xs file:font-semibold cursor-pointer"
            />
            {initial?.image_url && !imageFile && (
              <p className="text-xs text-white/30 mt-1">Current image will be kept</p>
            )}
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register('is_featured')} type="checkbox" className="w-4 h-4 accent-brand-blue" />
              <span className="text-sm text-white/60">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register('is_active')} type="checkbox" className="w-4 h-4 accent-brand-blue" />
              <span className="text-sm text-white/60">Active</span>
            </label>
          </div>

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

export default function PortfolioAdminPage() {
  const { data: items, isLoading } = usePortfolio(false)
  const deleteItem = useDeletePortfolioItem()
  const [editing, setEditing] = useState<PortfolioItem | null | 'new'>(null)

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-black text-white mb-1">Portfolio</h1>
          <p className="text-sm text-white/40">Manage portfolio projects shown on the public site.</p>
        </div>
        <button onClick={() => setEditing('new')} className="btn-primary !py-2.5 !px-5 text-xs">
          <Plus size={15} /> New Project
        </button>
      </div>

      {isLoading ? (
        <div className="text-white/30 text-sm">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(items ?? []).map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/8 rounded-sm overflow-hidden">
              <div
                className="h-28 flex items-center justify-center text-white font-serif text-xl font-bold"
                style={{ backgroundColor: item.bg_color || '#1a1aed' }}
              >
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  item.title
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-blue">{item.category}</span>
                    <p className="text-sm font-semibold text-white mt-0.5">{item.title}</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${item.is_active ? 'bg-green-400' : 'bg-white/20'}`} />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditing(item)}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded text-xs text-white/50 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this project?')) {
                        deleteItem.mutate({ id: item.id, imagePath: item.image_path })
                      }
                    }}
                    className="flex-1 py-2 bg-white/5 hover:bg-red-500/20 rounded text-xs text-white/50 hover:text-red-400 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(items ?? []).length === 0 && (
            <div className="col-span-3 text-center py-16 text-white/30 text-sm">
              No portfolio items yet.
            </div>
          )}
        </div>
      )}

      {editing && (
        <PortfolioForm
          initial={editing === 'new' ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
