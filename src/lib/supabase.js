import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Faltan las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el .env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
})

/**
 * Inicia sesión anónima si no existe una activa.
 * Llama esto al arrancar la app.
 * @returns {Promise<string>} UUID del usuario anónimo
 */
export async function ensureAnonymousSession() {
  const { data: { session } } = await supabase.auth.getSession()

  if (session?.user) return session.user.id

  const { data, error } = await supabase.auth.signInAnonymously()
  if (error) throw error

  // Crear registro en tabla sessions
  await supabase.from('sessions').upsert({
    id: data.user.id,
    device_hint: window.innerWidth < 768 ? 'mobile' : 'desktop'
  }, { onConflict: 'id' })

  return data.user.id
}

/**
 * Obtiene el UUID del usuario actual desde la sesión activa.
 */
export async function getCurrentUserId() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id ?? null
}

/**
 * Elimina todos los datos del usuario (derecho al olvido).
 */
export async function deleteMyData() {
  const { error } = await supabase.rpc('delete_my_data')
  if (error) throw error
  await supabase.auth.signOut()
}
