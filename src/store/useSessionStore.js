import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSessionStore = create(
  persist(
    (set, get) => ({
      userId: null,
      activeConversationId: null,
      messages: [],
      isLoading: false,
      diagnoses: [],   // array de diagnósticos — uno por tema detectado

      setUserId: (id) => set({ userId: id }),

      setActiveConversation: (id) => set({
        activeConversationId: id,
        messages: [],
        diagnoses: [],
      }),

      addMessage: (msg) => set((s) => ({
        messages: [...s.messages, msg]
      })),

      setLoading: (v) => set({ isLoading: v }),

      // Agrega o actualiza diagnóstico por tipo
      addDiagnosis: (d) => set((s) => {
        const exists = s.diagnoses.findIndex(x => x.tipo === d.tipo)
        if (exists >= 0) {
          const updated = [...s.diagnoses]
          updated[exists] = { ...d, timestamp: Date.now() }
          return { diagnoses: updated }
        }
        return { diagnoses: [...s.diagnoses, { ...d, timestamp: Date.now() }] }
      }),

      clearConversation: () => set({
        activeConversationId: null,
        messages: [],
        diagnoses: [],
      }),

      resetAll: () => set({
        userId: null,
        activeConversationId: null,
        messages: [],
        diagnoses: [],
      }),

      getMessagesForClaude: () =>
        get().messages.map(m => ({ role: m.role, content: m.content })),
    }),
    {
      name: 'susurra-session',
      partialize: (s) => ({ userId: s.userId }),
    }
  )
)