import { useEffect } from 'react'
import { ensureAnonymousSession } from '@/lib/supabase'
import { useSessionStore } from '@/store/useSessionStore'

/**
 * Hook que garantiza una sesión anónima activa al montar la app.
 */
export function useAuth() {
  const { userId, setUserId } = useSessionStore()

  useEffect(() => {
    if (userId) return  // ya tenemos sesión

    ensureAnonymousSession()
      .then(id => setUserId(id))
      .catch(err => console.error('Error iniciando sesión anónima:', err))
  }, [])

  return { userId }
}
