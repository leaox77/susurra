import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSessionStore = create(
  persist(
    (set, get) => ({
      userId: null,
      activeConversationId: null,
      messages: [],            // mensajes en memoria de la conv. activa
      isLoading: false,
      diagnosis: null,

      setUserId: (id) => set({ userId: id }),

      setActiveConversation: (id) => set({
        activeConversationId: id,
        messages: [],
        diagnosis: null,
      }),

      addMessage: (msg) => set((s) => ({
        messages: [...s.messages, msg]
      })),

      setLoading: (v) => set({ isLoading: v }),

      setDiagnosis: (d) => set({ diagnosis: d }),

      clearConversation: () => set({
        activeConversationId: null,
        messages: [],
        diagnosis: null,
      }),

      // Devuelve el historial en formato que espera Claude API
      getMessagesForClaude: () =>
        get().messages.map(m => ({ role: m.role, content: m.content })),
    }),
    {
      name: 'susurra-session',
      partialize: (s) => ({ userId: s.userId }),  // solo persiste el userId
    }
  )
)
