import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import type { ContactSubmission, ContactFormData } from '@/types'
import emailjs from 'emailjs-com'

const QUERY_KEY = ['contact-submissions']

export function useContactSubmissions() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async (): Promise<ContactSubmission[]> => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data ?? []
    },
  })
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ ...formData, is_read: false }])
      if (error) throw error

      // Send email via EmailJS
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            company: formData.company ?? 'N/A',
            service: formData.service ?? 'General Inquiry',
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
      } catch (emailError) {
        // Email failure should not break the form submission
        console.warn('Email notification failed:', emailError)
      }
    },
    onSuccess: () => toast.success("Message sent! We'll get back to you soon."),
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useMarkSubmissionRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeleteSubmission() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Submission deleted')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
