import { useCallback } from 'react'
import { sendToAgent } from '@/lib/claude'
import { saveMessage, createConversation, updateConversationDiagnosis } from '@/lib/api'
import { useSessionStore } from '@/store/useSessionStore'

export function useChat() {
  const {
    activeConversationId, messages,
    addMessage, setLoading, setDiagnosis,
    setActiveConversation, getMessagesForClaude,
  } = useSessionStore()

  const startConversation = useCallback(async () => {
    const conv = await createConversation('ayuda')
    setActiveConversation(conv.id)
    return conv.id
  }, [])

  const sendMessage = useCallback(async (text, conversationId) => {
    const convId = conversationId || activeConversationId

    // 1. Agregar mensaje del usuario al store y BD
    const userMsg = { role: 'user', content: text, id: Date.now() }
    addMessage(userMsg)
    await saveMessage({ conversationId: convId, role: 'user', content: text })

    setLoading(true)

    try {
      // 2. Llamar al agente
      const claudeMessages = [...getMessagesForClaude()]
      const response = await sendToAgent(claudeMessages, convId)

      // 3. Agregar respuesta al store
      const botMsg = {
        role: 'assistant',
        content: response.respuesta,
        options: response.opciones,
        diagnostico: response.diagnostico,
        id: Date.now() + 1,
      }
      addMessage(botMsg)

      // 4. Guardar en BD
      await saveMessage({
        conversationId: convId,
        role: 'assistant',
        content: response.respuesta,
        options: response.opciones,
        diagnostico: response.diagnostico,
      })

      // 5. Si hay diagnóstico, actualizarlo en la conversación
      if (response.diagnostico) {
        setDiagnosis(response.diagnostico)
        await updateConversationDiagnosis(
          convId,
          response.diagnostico.tipo,
          response.diagnostico.nivel
        )
      }

      return response
    } finally {
      setLoading(false)
    }
  }, [activeConversationId, getMessagesForClaude])

  return { messages, sendMessage, startConversation }
}
