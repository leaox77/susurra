import { supabase } from './supabase'

// ─── CONVERSATIONS ───────────────────────────────────────────

export async function createConversation(module = 'ayuda') {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ module })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateConversationDiagnosis(id, type, level) {
  const { error } = await supabase
    .from('conversations')
    .update({ diagnosis_type: type, diagnosis_level: level })
    .eq('id', id)
  if (error) throw error
}

export async function markPdfGenerated(id) {
  const { error } = await supabase
    .from('conversations')
    .update({ pdf_generated: true, closed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function getMyConversations() {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, messages(count)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// ─── MESSAGES ────────────────────────────────────────────────

export async function saveMessage({ conversationId, role, content, options = null, diagnostico = null }) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, role, content, options, diagnostico })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function deleteConversationMessages(conversationId) {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('conversation_id', conversationId)
  if (error) throw error
}

// ─── SERVICES ────────────────────────────────────────────────

export async function getServices(category = null) {
  let query = supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('priority', { ascending: false })

  if (category && category !== 'todos') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

// ─── CONTENT ─────────────────────────────────────────────────

export async function getArticles(category = null) {
  let query = supabase
    .from('content')
    .select('id, title, slug, category, summary, tags, read_time')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getArticle(slug) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (error) throw error

  // Incrementar vistas
  supabase.rpc('increment_content_views', { content_id: data.id })

  return data
}

// ─── GAME ────────────────────────────────────────────────────

export async function getGameQuestions(limit = 8) {
  const { data, error } = await supabase
    .from('game_questions')
    .select('*')
    .eq('is_active', true)
    .limit(limit)
  if (error) throw error

  // Mezclar aleatoriamente
  return data.sort(() => Math.random() - 0.5)
}
