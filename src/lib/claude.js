import { supabase } from './supabase'

/**
 * Llama a la Supabase Edge Function que conecta con Claude API.
 * Nunca expone la API key al frontend.
 *
 * @param {Array} messages - Historial de mensajes { role, content }[]
 * @param {string} conversationId - ID de la conversación actual
 * @returns {Promise<{ respuesta, opciones, diagnostico }>}
 */
export async function sendToAgent(messages, conversationId) {
  const { data, error } = await supabase.functions.invoke('susurra-chat', {
    body: { messages, conversation_id: conversationId }
  })

  if (error) throw error

  // Validar estructura del JSON
  if (!data?.respuesta || !Array.isArray(data?.opciones)) {
    throw new Error('Respuesta inválida del agente')
  }

  return {
    respuesta:   data.respuesta,
    opciones:    data.opciones.slice(0, 3),
    diagnostico: data.diagnostico ?? null,
  }
}
