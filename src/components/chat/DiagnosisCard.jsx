import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { markPdfGenerated } from '@/lib/api'
import { generateDenunciaPDF } from '@/lib/pdf'

const tipoLabels = {
  grooming:   'Grooming identificado',
  sextorsion: 'Sextorsión identificada',
  acoso:      'Acoso digital identificado',
  salud:      'Consulta de salud sexual',
}

const nivelColors = {
  alto:        'pink',
  medio:       'purple',
  informativo: 'blue',
}

export default function DiagnosisCard({ diagnosis, convId }) {
  const navigate    = useNavigate()
  const [open,      setOpen]      = useState(true)
  const [pdfLoading,setPdfLoading]= useState(false)
  const [pdfDone,   setPdfDone]   = useState(false)

  const handlePDF = async () => {
    setPdfLoading(true)
    try {
      await generateDenunciaPDF(diagnosis)
      await markPdfGenerated(convId)
      setPdfDone(true)
    } finally {
      setPdfLoading(false)
    }
  }

  const label = tipoLabels[diagnosis.tipo] || 'Situación identificada'
  const color = nivelColors[diagnosis.nivel] || 'purple'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl overflow-hidden border border-lavanda/30 mt-2"
    >
      {/* ── Franja header — siempre visible ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3
                   bg-lav-l hover:bg-lavanda/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violeta flex-shrink-0" />
          <Badge color={color}>{label}</Badge>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-purpura/60 flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      {/* ── Contenido acordeón ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="bg-lav-l/50 px-4 pb-4 pt-3 flex flex-col gap-3">

              {/* No debes */}
              {diagnosis.no_debes?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-[#993556] uppercase tracking-wide mb-1.5">
                    Qué no debes hacer
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {diagnosis.no_debes.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-2 text-xs text-texto leading-relaxed"
                      >
                        <span className="w-2 h-2 rounded-full bg-rosa flex-shrink-0 mt-1" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Puedes hacer */}
              {diagnosis.puedes_hacer?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-[#085041] uppercase tracking-wide mb-1.5">
                    Qué puedes hacer ahora
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {diagnosis.puedes_hacer.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className="flex items-start gap-2 text-xs text-texto leading-relaxed"
                      >
                        <span className="w-2 h-2 rounded-full bg-menta flex-shrink-0 mt-1" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Acciones */}
              
              <div className="flex flex-col gap-2 pt-1">
                {/*
                {pdfDone ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-xs text-[#085041] font-medium"
                  >
                    <span className="w-5 h-5 bg-menta rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                    Guía descargada correctamente
                  </motion.div>
                ) : (
                  <Button fullWidth loading={pdfLoading} onClick={handlePDF}>
                    Generar guía de denuncia (PDF)
                  </Button>
                )}*/}
                <Button fullWidth variant="outline" onClick={() => navigate('/contactar')}>
                  Hablar con alguien
                </Button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs text-purpura/50 hover:text-purpura transition-colors py-1"
                >
                  Cerrar diagnóstico ↑
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ChevronDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 6l4 4 4-4"/>
    </svg>
  )
}
