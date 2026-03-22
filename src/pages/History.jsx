import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getMyConversations } from '@/lib/api'
import { deleteMyData } from '@/lib/supabase'
import { useSessionStore } from '@/store/useSessionStore'
import Button from '@/components/ui/Button'

const tipoLabels = {
  grooming:   'Grooming',
  sextorsion: 'Sextorsión',
  acoso:      'Acoso digital',
  salud:      'Salud sexual',
}

const nivelColors = {
  alto:        'bg-rosa-l text-[#72243E]',
  medio:       'bg-lav-l text-violeta',
  informativo: 'bg-azul-ll text-[#0C447C]',
}

export default function History() {
  const navigate = useNavigate()
  const [convs,   setConvs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(false)
  const { resetAll } = useSessionStore()

  useEffect(() => {
    getMyConversations()
      .then(setConvs)
      .finally(() => setLoading(false))
  }, [])

  const handleDeleteAll = async () => {
    await deleteMyData()
    resetAll()
    navigate('/', { replace: true })
  }

  const openConversation = (convId) => {
    navigate(`/chat?conv=${convId}`)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60dvh]">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-2 h-2 bg-purpura rounded-full"
            animate={{ y: [0,-8,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i*0.12 }} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-dvh bg-susurra">
      <div className="px-4 pt-5 pb-4 max-w-lg mx-auto">

        {convs.length === 0 ? (
          <EmptyState onStart={() => navigate('/chat')} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-noche">Mis conversaciones</h2>
              <button
                onClick={() => setConfirm(true)}
                className="text-xs text-rosa font-medium px-3 py-1.5 rounded-full
                           border border-rosa/30 hover:bg-rosa-l transition-colors"
              >
                Borrar todo
              </button>
            </div>

            <motion.div className="flex flex-col gap-3"
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
              {convs.map(conv => (
                <motion.div
                  key={conv.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  onClick={() => openConversation(conv.id)}
                  className="bg-white rounded-2xl p-4 border border-lavanda/20
                             cursor-pointer hover:border-lavanda/50 hover:shadow-sm
                             transition-all active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {/* Fecha */}
                      <p className="text-xs text-purpura/50 mb-1.5">
                        {new Date(conv.created_at).toLocaleDateString('es-BO', {
                          day: 'numeric', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>

                      {/* Badge diagnóstico */}
                      {conv.diagnosis_type ? (
                        <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium
                          ${nivelColors[conv.diagnosis_level] || 'bg-lav-l text-violeta'}`}>
                          {tipoLabels[conv.diagnosis_type] || conv.diagnosis_type}
                        </span>
                      ) : (
                        <span className="text-xs text-purpura/40 italic">Sin diagnóstico</span>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      {conv.pdf_generated && (
                        <span className="text-[10px] bg-[#D4F0E8] text-[#085041] px-2 py-0.5 rounded-full">
                          PDF ✓
                        </span>
                      )}
                      {/* Flecha de entrar */}
                      <span className="text-lavanda/40 text-lg">›</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Modal borrado */}
        <AnimatePresence>
          {confirm && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-noche/60 flex items-end justify-center z-[200] px-4 pb-8"
              onClick={() => setConfirm(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-blanco rounded-3xl p-6 w-full max-w-sm"
              >
                <h3 className="font-serif text-lg text-noche mb-2">¿Borrar todo?</h3>
                <p className="text-sm text-purpura/70 mb-5 leading-relaxed">
                  Se eliminará todo tu historial de forma permanente. No se puede deshacer.
                </p>
                <div className="flex gap-3">
                  <Button fullWidth variant="outline" onClick={() => setConfirm(false)}>Cancelar</Button>
                  <Button fullWidth variant="danger" onClick={handleDeleteAll}>Borrar todo</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function EmptyState({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60dvh] gap-5 text-center px-4"
    >
      <img src="/terry-lavanda.png" alt="Terry" className="w-20 h-20 object-contain opacity-60" />
      <div>
        <h3 className="font-serif text-lg text-noche mb-1">Aún no hay conversaciones</h3>
        <p className="text-sm text-purpura/60 leading-relaxed max-w-xs">
          Todo es anónimo. Nada se guarda sin tu permiso.
        </p>
      </div>
      <Button onClick={onStart}>Comenzar a hablar</Button>
    </motion.div>
  )
}