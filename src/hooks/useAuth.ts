import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const { user, session, isLoading, isAdmin, signIn, signOut, initialize } =
    useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return { user, session, isLoading, isAdmin, signIn, signOut }
}
