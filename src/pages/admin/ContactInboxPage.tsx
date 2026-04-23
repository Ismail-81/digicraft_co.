import { useState } from 'react'
import { Mail, Trash2, Eye, EyeOff } from 'lucide-react'
import { useContactSubmissions, useMarkSubmissionRead, useDeleteSubmission } from '@/hooks/useContactSubmissions'
import { formatDate } from '@/lib/utils'
import type { ContactSubmission } from '@/types'

function SubmissionModal({ sub, onClose }: { sub: ContactSubmission; onClose: () => void }) {
  const markRead = useMarkSubmissionRead()

  const handleOpen = () => {
    if (!sub.is_read) markRead.mutate(sub.id)
  }

  // Mark as read on mount
  useState(() => { handleOpen() })

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#161616] border border-white/10 rounded-sm w-full max-w-lg p-8">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-white">{sub.name}</h2>
            <p className="text-sm text-white/40 mt-0.5">{sub.email} · {formatDate(sub.created_at)}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="space-y-3 mb-6">
          {sub.company && (
            <div className="flex gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white/30 w-20 pt-0.5">Company</span>
              <span className="text-sm text-white/70">{sub.company}</span>
            </div>
          )}
          {sub.service && (
            <div className="flex gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white/30 w-20 pt-0.5">Service</span>
              <span className="text-sm text-brand-blue font-medium">{sub.service}</span>
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-sm p-4 mb-6">
          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
        </div>

        <div className="flex gap-3">
          <a
            href={`mailto:${sub.email}`}
            className="btn-primary flex-1 !py-3 text-center justify-center"
          >
            <Mail size={15} /> Reply via Email
          </a>
          <button onClick={onClose} className="btn-outline flex-1 !py-3 !border-white/10 !text-white/60">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ContactInboxPage() {
  const { data: submissions, isLoading } = useContactSubmissions()
  const markRead = useMarkSubmissionRead()
  const deleteSubmission = useDeleteSubmission()
  const [viewing, setViewing] = useState<ContactSubmission | null>(null)

  const unread = (submissions ?? []).filter((s) => !s.is_read).length

  return (
    <div className="p-8 lg:p-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-serif text-3xl font-black text-white">Inbox</h1>
          {unread > 0 && (
            <span className="bg-brand-blue text-white text-xs font-bold px-2.5 py-1 rounded-sm">
              {unread} unread
            </span>
          )}
        </div>
        <p className="text-sm text-white/40">Contact form submissions from your site.</p>
      </div>

      {isLoading ? (
        <div className="text-white/30 text-sm">Loading…</div>
      ) : (
        <div className="space-y-2">
          {(submissions ?? []).map((sub) => (
            <div
              key={sub.id}
              className={`bg-white/5 border rounded-sm px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/8 transition-colors ${
                !sub.is_read ? 'border-brand-blue/40' : 'border-white/8'
              }`}
              onClick={() => setViewing(sub)}
            >
              {/* Unread dot */}
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${!sub.is_read ? 'bg-brand-blue' : 'bg-transparent'}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className={`text-sm font-semibold ${!sub.is_read ? 'text-white' : 'text-white/60'}`}>
                    {sub.name}
                  </span>
                  {sub.service && (
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-blue">
                      {sub.service}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/30 truncate mt-0.5">
                  {sub.email} · {sub.message.slice(0, 80)}…
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-white/25">{formatDate(sub.created_at)}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    markRead.mutate(sub.id)
                  }}
                  className="w-7 h-7 bg-white/5 hover:bg-white/15 rounded flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  title={sub.is_read ? 'Mark unread' : 'Mark read'}
                >
                  {sub.is_read ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Delete this submission?')) deleteSubmission.mutate(sub.id)
                  }}
                  className="w-7 h-7 bg-white/5 hover:bg-red-500/20 rounded flex items-center justify-center text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {(submissions ?? []).length === 0 && (
            <div className="text-center py-20 text-white/25 text-sm">
              <Mail size={32} className="mx-auto mb-3 opacity-20" />
              No messages yet
            </div>
          )}
        </div>
      )}

      {viewing && (
        <SubmissionModal sub={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  )
}
