import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getMyConversations } from '@/lib/api'
import { deleteMyData } from '@/lib/supabase'
import Button from '@/components/ui/Button'

const tipoLabels = {
  grooming:   'Grooming',
  sextorsion: 'Sextorsión',
  acoso:      'Acoso digital',
  salud:      'Salud sexual',
}

export default function History() {
  const navigate = useNavigate()
  const [convs,   setConvs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    getMyConversations()
      .then(setConvs)
      .finally(() => setLoading(false))
  }, [])

  const handleDeleteAll = async () => {
    await deleteMyData()
    navigate('/', { replace: true })
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
                className="text-xs text-rosa font-medium px-3 py-1.5 rounded-full border border-rosa/30 hover:bg-rosa-l transition-colors"
              >
                Borrar todo
              </button>
            </div>

            <motion.div className="flex flex-col gap-3" initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
              {convs.map(conv => (
                <motion.div key={conv.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="bg-white rounded-2xl p-4 border border-lavanda/20"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-purpura/60 mb-1">
                        {new Date(conv.created_at).toLocaleDateString('es-BO', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                      {conv.diagnosis_type && (
                        <span className="inline-block bg-lav-l text-violeta text-xs px-2.5 py-0.5 rounded-full font-medium">
                          {tipoLabels[conv.diagnosis_type] || conv.diagnosis_type}
                        </span>
                      )}
                    </div>
                    {conv.pdf_generated && (
                      <span className="text-[10px] bg-[#D4F0E8] text-[#085041] px-2 py-0.5 rounded-full flex-shrink-0">
                        PDF generado
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Modal confirmar borrado */}
        <AnimatePresence>
          {confirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-noche/60 flex items-end justify-center z-50 px-4 pb-8"
              onClick={() => setConfirm(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-blanco rounded-3xl p-6 w-full max-w-sm"
              >
                <h3 className="font-serif text-lg text-noche mb-2">¿Borrar todo?</h3>
                <p className="text-sm text-purpura/70 mb-5 leading-relaxed">
                  Se eliminará todo tu historial de conversaciones de forma permanente. No se puede deshacer.
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
      <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
        <circle cx="22" cy="16" r="10" stroke="#B8AEED" strokeWidth="1.2" opacity=".6"/>
        <circle cx="17" cy="12" r="2.5" fill="#B8AEED" opacity=".7"/>
        <circle cx="24" cy="10" r="2" fill="#B8AEED" opacity=".65"/>
        <path d="M18,25Q22,21 22,27L22,40L17,40Z" stroke="#B8AEED" strokeWidth="1.1" fill="none" opacity=".6"/>
        <path d="M22,32Q15,36 10,42" stroke="#B8AEED" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".55"/>
        <path d="M22,31Q29,29 34,34" stroke="#B8AEED" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".55"/>
        <circle cx="58" cy="20" r="8" stroke="#D4A8D4" strokeWidth="1.2" opacity=".5"/>
        <circle cx="54" cy="16" r="2" fill="#D4A8D4" opacity=".6"/>
        <circle cx="61" cy="15" r="1.8" fill="#D4A8D4" opacity=".55"/>
        <path d="M55,29Q58,25 58,30L58,42L54,42Z" stroke="#D4A8D4" strokeWidth="1" fill="none" opacity=".5"/>
        <path d="M55,35Q48,32 42,28" stroke="#D4A8D4" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".55"/>
        <path d="M43,26Q41,23 42,19" stroke="#D4A8D4" strokeWidth=".8" strokeLinecap="round" fill="none" opacity=".4"/>
      </svg>
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
