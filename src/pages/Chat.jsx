import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '@/hooks/useChat'
import { useSessionStore } from '@/store/useSessionStore'
import { getMessages } from '@/lib/api'
import DiagnosisCard from '@/components/chat/DiagnosisCard'
import TerryAvatar from '@/components/chat/TerryAvatar'

const INITIAL_MESSAGE = {
  id: 'init',
  role: 'assistant',
  content: 'Hola. Todo lo que me cuentes aquí es anónimo y confidencial. Estoy aquí para escucharte. ¿Qué está pasando?',
  options: ['Algo me está pasando en redes', 'Tengo dudas sobre salud sexual', 'Solo quiero información'],
}

export default function Chat() {
  const navigate       = useNavigate()
  const [searchParams] = useSearchParams()
  const resumeId       = searchParams.get('conv') // para retomar conversación del historial

  const { sendMessage, startConversation } = useChat()
  const { messages, isLoading, diagnoses, activeConversationId, 
        setActiveConversation, addMessage, clearConversation } = useSessionStore()

  const [input,       setInput]       = useState('')
  const [convId,      setConvId]      = useState(null)
  const [loadingConv, setLoadingConv] = useState(true)
  const [showDiagList,setShowDiagList]= useState(false)
  const [activeDiag,  setActiveDiag]  = useState(null) // diagnóstico activo en acordeón

  const bottomRef    = useRef(null)
  const inputRef     = useRef(null)
  const diagnosisRef = useRef(null)

  // Iniciar o retomar conversación
  useEffect(() => {
    const init = async () => {
      clearConversation()
      setLoadingConv(true)
      if (resumeId) {
        // Retomar desde historial — cargar mensajes de BD
        setActiveConversation(resumeId)
        const msgs = await getMessages(resumeId)
        msgs.forEach(m => addMessage({
          id: m.id,
          role: m.role,
          content: m.content,
          options: m.options,
          diagnostico: m.diagnostico,
        }))
        setConvId(resumeId)
      } else {
        // Nueva conversación
        const id = await startConversation()
        setConvId(id)
      }
      setLoadingConv(false)
    }
    init()
  }, [resumeId])

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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleNewChat = async () => {
    const id = await startConversation()
    setConvId(id)
    navigate('/chat', { replace: true })
  }

  const scrollToDiag = (diag) => {
    setActiveDiag(diag)
    setShowDiagList(false)
    setTimeout(() => diagnosisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
  }

  const botMessages = messages.filter(m => m.role === 'assistant')
  const lastBotId   = botMessages[botMessages.length - 1]?.id

  if (loadingConv) return (
    <div className="flex items-center justify-center h-dvh bg-blanco">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-2.5 h-2.5 bg-purpura rounded-full"
            animate={{ y: [0,-10,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i*0.12 }} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-dvh bg-blanco">

      {/* Header */}
      <header className="bg-noche px-4 py-3 flex items-center gap-2 safe-top flex-shrink-0">
        <button onClick={() => navigate(-1)} className="text-lavanda p-1 -ml-1 flex-shrink-0">
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Terry en el header */}
        <div className="w-9 h-9 flex-shrink-0">
          <img src="/terry-bicolor.png" alt="Terry"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 1px 4px rgba(123,111,204,0.5))' }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm text-blanco leading-none">Su</p>
          <p className="text-[10px] text-menta flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 bg-menta rounded-full animate-pulse-soft" />
            en línea contigo
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Botón diagnósticos — solo si hay alguno */}
          {diagnoses.length > 0 && (
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setShowDiagList(d => !d)}
                className="text-[10px] bg-violeta/80 text-lavanda px-2 py-1 rounded-full
                           flex items-center gap-1 hover:bg-violeta transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-menta rounded-full" />
                {diagnoses.length > 1 ? `${diagnoses.length} diagnósticos` : 'Diagnóstico'}
                <ChevronDown className={`w-3 h-3 transition-transform ${showDiagList ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Dropdown lista de diagnósticos */}
              <AnimatePresence>
                {showDiagList && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-8 bg-noche border border-lavanda/20
                               rounded-2xl shadow-lg overflow-hidden z-50 min-w-[180px]"
                  >
                    {diagnoses.map((d, i) => (
                      <button key={i} onClick={() => scrollToDiag(d)}
                        className="w-full text-left px-3 py-2.5 flex items-center gap-2
                                   hover:bg-purpura/20 transition-colors border-b border-lavanda/10 last:border-0">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          d.nivel === 'alto' ? 'bg-rosa' : d.nivel === 'medio' ? 'bg-lavanda' : 'bg-menta'
                        }`} />
                        <span className="text-xs text-blanco">{tipoLabels[d.tipo] || d.tipo}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Nuevo chat */}
          <button onClick={handleNewChat}
            className="text-[10px] bg-white/10 text-lavanda px-2 py-1 rounded-full
                       flex items-center gap-1 hover:bg-white/20 transition-colors">
            <PlusIcon className="w-3 h-3" />
            Nuevo
          </button>

          {/*<span className="text-[10px] bg-purpura text-lav-l px-2 py-1 rounded-full">anónimo</span>*/}
        </div>
      </header>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scroll flex flex-col gap-3"
           onClick={() => setShowDiagList(false)}>

        <BotBubble
          message={INITIAL_MESSAGE}
          onOptionClick={handleSend}
          isLast={messages.length === 0 && !isLoading}
        />

        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            if (msg.role === 'user') return <UserBubble key={msg.id} message={msg} />
            const isLast = msg.id === lastBotId && !isLoading

            return (
              <div key={msg.id}>
                <BotBubble message={msg} onOptionClick={handleSend} isLast={isLast} />
                {/* Diagnóstico inline después del mensaje que lo generó */}
                {msg.diagnostico && (
                  <div ref={msg.id === lastBotId ? diagnosisRef : null} className="mt-2 pl-10">
                    <DiagnosisCard
                      diagnosis={msg.diagnostico}
                      convId={convId}
                      isActive={activeDiag?.tipo === msg.diagnostico.tipo || !activeDiag}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </AnimatePresence>

        <AnimatePresence>
          {isLoading && <TypingIndicator />}
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

const tipoLabels = {
  grooming:   'Grooming',
  sextorsion: 'Sextorsión',
  acoso:      'Acoso digital',
  salud:      'Salud sexual',
}

function BotBubble({ message, onOptionClick, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 items-start"
    >
      <div className="flex items-end gap-2">
        {isLast
          ? <TerryAvatar state="idle" size="sm" />
          : <div className="w-8 h-8 flex-shrink-0" />
        }
        <div className="bubble-bot px-3.5 py-2.5">
          <p className="text-sm leading-relaxed"
             dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-violeta">$1</strong>') }}
          />
        </div>
      </div>
      {message.options?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 pl-10">
          {message.options.map((opt, i) => (
            <button key={i} onClick={() => onOptionClick(opt)} className="option-pill">{opt}</button>
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
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-end gap-2"
    >
      <TerryAvatar state="typing" size="sm" />
      <div className="flex items-center gap-1.5 px-3.5 py-3 bg-lav-l rounded-[4px_18px_18px_18px]">
        {[0,1,2].map(i => (
          <motion.span key={i} className="w-1.5 h-1.5 bg-lavanda rounded-full"
            animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} />
        ))}
      </div>
    </motion.div>
  )
}

function ChevronLeft({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M13 4l-6 6 6 6"/></svg>
}
function ChevronDown({ className }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6l4 4 4-4"/></svg>
}
function PlusIcon({ className }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>
}
function SendIcon({ className }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8h12M8.5 3.5L14 8l-5.5 4.5"/></svg>
}