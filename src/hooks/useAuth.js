import { useEffect, useState } from 'react'
import { ensureAnonymousSession } from '@/lib/supabase'
import { useSessionStore } from '@/store/useSessionStore'

export function useAuth() {
  const { setUserId } = useSessionStore()
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    ensureAnonymousSession()
      .then(id => {
        setUserId(id)
        setAuthReady(true)
      })
      .catch(err => {
        console.error('Error iniciando sesión anónima:', err)
        // Intentar de nuevo una vez más
        setTimeout(() => {
          ensureAnonymousSession()
            .then(id => { setUserId(id); setAuthReady(true) })
            .catch(() => setAuthReady(true)) // último recurso — dejar pasar
        }, 1000)
      })
  }, [])

  return { authReady }
}