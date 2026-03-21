import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '@/hooks/useChat'
import { useSessionStore } from '@/store/useSessionStore'
import DiagnosisCard from '@/components/chat/DiagnosisCard'

const INITIAL_MESSAGE = {
  id: 'init',
  role: 'assistant',
  content: 'Hola. Todo lo que me cuentes aquí es anónimo y confidencial. Estoy aquí para escucharte. ¿Qué está pasando?',
  options: ['Algo me está pasando en redes', 'Tengo dudas sobre salud sexual', 'Solo quiero información'],
}

export default function Chat() {
  const navigate = useNavigate()
  const { sendMessage, startConversation } = useChat()
  const { messages, isLoading, diagnosis, activeConversationId } = useSessionStore()
  const [input, setInput] = useState('')
  const [convId, setConvId] = useState(activeConversationId)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Iniciar conversación al montar
  useEffect(() => {
    if (!convId) {
      startConversation().then(id => setConvId(id))
    }
  }, [])

  // Scroll automático al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async (text) => {
    const t = (text || input).trim()
    if (!t || isLoading || !convId) return
    setInput('')
    await sendMessage(t, convId)
    inputRef.current?.focus()
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-blanco">

      {/* Header del chat */}
      <header className="bg-noche px-4 py-3 flex items-center gap-3 safe-top flex-shrink-0">
        <button onClick={() => navigate(-1)} className="text-lavanda p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-purpura rounded-full flex items-center justify-center flex-shrink-0">
          <BotAvatar />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm text-blanco">Susurra</p>
          <p className="text-[10px] text-menta flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-menta rounded-full animate-pulse-soft" />
            en línea contigo
          </p>
        </div>
        <span className="text-[10px] bg-purpura text-lav-l px-2.5 py-1 rounded-full">anónimo</span>
      </header>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scroll flex flex-col gap-3">

        {/* Mensaje inicial */}
        <BotBubble message={INITIAL_MESSAGE} onOptionClick={handleSend} isFirst />

        {/* Mensajes de la conversación */}
        <AnimatePresence initial={false}>
          {messages.map((msg) =>
            msg.role === 'user'
              ? <UserBubble key={msg.id} message={msg} />
              : <BotBubble key={msg.id} message={msg} onOptionClick={handleSend} />
          )}
        </AnimatePresence>

        {/* Indicador de escritura */}
        <AnimatePresence>
          {isLoading && <TypingIndicator />}
        </AnimatePresence>

        {/* Tarjeta de diagnóstico */}
        <AnimatePresence>
          {diagnosis && <DiagnosisCard diagnosis={diagnosis} convId={convId} />}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-noche px-3 py-3 safe-bottom flex items-center gap-2 flex-shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escribe aquí..."
          className="flex-1 bg-white/10 text-blanco placeholder-white/30 rounded-full
                     px-4 py-2.5 text-sm outline-none focus:bg-white/15 transition-colors"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 bg-purpura rounded-full flex items-center justify-center
                     flex-shrink-0 disabled:opacity-40 transition-opacity"
        >
          <SendIcon className="w-4 h-4 text-blanco" />
        </motion.button>
      </div>
    </div>
  )
}

// ── Componentes internos ─────────────────────────────────────

function BotBubble({ message, onOptionClick, isFirst = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 items-start"
    >
      <div className="bubble-bot px-3.5 py-2.5">
        <p className="text-sm leading-relaxed"
           dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-violeta">$1</strong>') }}
        />
      </div>
      {message.options?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 pl-1"
        >
          {message.options.map((opt, i) => (
            <button key={i} onClick={() => onOptionClick(opt)} className="option-pill">
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

function UserBubble({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <div className="bubble-user px-3.5 py-2.5">
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1.5 px-3.5 py-3 bg-lav-l rounded-[4px_18px_18px_18px] w-fit"
    >
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-lavanda rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  )
}

function BotAvatar() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
      <circle cx="4.5" cy="4.5" r="2.5" stroke="#F4F2FF" strokeWidth="1"/>
      <circle cx="11.5" cy="5.5" r="2" stroke="#B8AEED" strokeWidth="1"/>
      <path d="M8 9Q6 12 6 15" stroke="#F4F2FF" strokeWidth=".9" strokeLinecap="round"/>
      <path d="M8 9Q10 12 10 15" stroke="#B8AEED" strokeWidth=".9" strokeLinecap="round"/>
      <path d="M7.5 8.5Q8.5 7.5 9.5 8.5" stroke="#E8D8FF" strokeWidth=".7" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronLeft({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M13 4l-6 6 6 6"/></svg>
}
function SendIcon({ className }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8h12M8.5 3.5L14 8l-5.5 4.5"/></svg>
}
