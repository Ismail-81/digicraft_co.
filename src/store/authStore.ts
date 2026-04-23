import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAdmin: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: true,
      isAdmin: false,

      setUser: (user) => set({ user, isAdmin: !!user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),

      signIn: async (email: string, password: string) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          set({ isLoading: false })
          throw error
        }
        set({
          user: data.user,
          session: data.session,
          isAdmin: !!data.user,
          isLoading: false,
        })
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, session: null, isAdmin: false })
      },

      initialize: async () => {
        set({ isLoading: true })
        const { data: { session } } = await supabase.auth.getSession()
        set({
          user: session?.user ?? null,
          session,
          isAdmin: !!session?.user,
          isLoading: false,
        })

        supabase.auth.onAuthStateChange((_event, session) => {
          set({
            user: session?.user ?? null,
            session,
            isAdmin: !!session?.user,
          })
        })
      },
    }),
    {
      name: 'digicraft-auth',
      partialize: (state) => ({ user: state.user, session: state.session }),
    }
  )
)
