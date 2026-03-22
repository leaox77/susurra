import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

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

export async function ensureAnonymousSession() {
  // 1. Ver si ya hay sesión activa
  const { data: { session } } = await supabase.auth.getSession()

  let userId = session?.user?.id

  // 2. Si no hay sesión, crear una nueva
  if (!userId) {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    userId = data.user.id
  }

  // 3. Esperar un tick para que el cliente tenga el token listo
  await new Promise(r => setTimeout(r, 200))

  // 4. Crear registro en sessions si no existe
  // Usamos insert con onConflict ignore para no fallar si ya existe
  const { error: sessionError } = await supabase
    .from('sessions')
    .upsert(
      { id: userId, device_hint: window.innerWidth < 768 ? 'mobile' : 'desktop' },
      { onConflict: 'id', ignoreDuplicates: false }
    )

  if (sessionError) {
    // Si falla por RLS u otro motivo, intentar una vez más
    await new Promise(r => setTimeout(r, 500))
    await supabase
      .from('sessions')
      .upsert(
        { id: userId, device_hint: window.innerWidth < 768 ? 'mobile' : 'desktop' },
        { onConflict: 'id', ignoreDuplicates: false }
      )
  }

  return userId
}

export async function getCurrentUserId() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id ?? null
}

export async function deleteMyData() {
  const { error } = await supabase.rpc('delete_my_data')
  if (error) throw error
  await supabase.auth.signOut()
  // Crear nueva sesión inmediatamente
  await supabase.auth.signInAnonymously()
}