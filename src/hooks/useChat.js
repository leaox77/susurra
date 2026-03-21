import { useCallback } from 'react'
import { sendToAgent } from '@/lib/claude'
import { saveMessage, createConversation, updateConversationDiagnosis } from '@/lib/api'
import { useSessionStore } from '@/store/useSessionStore'

export function useChat() {
  const {
    activeConversationId,
    addMessage, setLoading, addDiagnosis,
    setActiveConversation, getMessagesForClaude,
  } = useSessionStore()

  const startConversation = useCallback(async () => {
    const conv = await createConversation('ayuda')
    setActiveConversation(conv.id)
    return conv.id
  }, [])

  const sendMessage = useCallback(async (text, conversationId) => {
    const convId = conversationId || activeConversationId

    const userMsg = { role: 'user', content: text, id: Date.now() }
    addMessage(userMsg)
    await saveMessage({ conversationId: convId, role: 'user', content: text })

    setLoading(true)

    try {
      const claudeMessages = [...getMessagesForClaude()]
      const response = await sendToAgent(claudeMessages, convId)

      const botMsg = {
        role: 'assistant',
        content: response.respuesta,
        options: response.opciones,
        diagnostico: response.diagnostico,
        id: Date.now() + 1,
      }
      addMessage(botMsg)

      await saveMessage({
        conversationId: convId,
        role: 'assistant',
        content: response.respuesta,
        options: response.opciones,
        diagnostico: response.diagnostico,
      })

      if (response.diagnostico) {
        addDiagnosis(response.diagnostico)
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

  return { sendMessage, startConversation }
}
