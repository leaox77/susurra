import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  alto:         'pink',
  medio:        'purple',
  informativo:  'blue',
}

export default function DiagnosisCard({ diagnosis, convId }) {
  const navigate = useNavigate()
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfDone, setPdfDone]       = useState(false)

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-lav-l border-l-4 border-violeta rounded-2xl p-4 mt-2"
    >
      <Badge color={nivelColors[diagnosis.nivel] || 'purple'} className="mb-2">
        {tipoLabels[diagnosis.tipo] || 'Situación identificada'}
      </Badge>

      {/* No debes */}
      {diagnosis.no_debes?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-[#993556] uppercase tracking-wide mb-1.5">
            Qué no debes hacer
          </p>
          <ul className="flex flex-col gap-1.5">
            {diagnosis.no_debes.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
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
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#085041] uppercase tracking-wide mb-1.5">
            Qué puedes hacer ahora
          </p>
          <ul className="flex flex-col gap-1.5">
            {diagnosis.puedes_hacer.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
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
      <div className="flex flex-col gap-2">
        {pdfDone ? (
          <div className="flex items-center gap-2 text-xs text-[#085041] font-medium">
            <span className="w-4 h-4 bg-menta rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
            Guía descargada correctamente
          </div>
        ) : (
          <Button fullWidth loading={pdfLoading} onClick={handlePDF}>
            Generar guía de denuncia (PDF)
          </Button>
        )}
        <Button fullWidth variant="outline" onClick={() => navigate('/contactar')}>
          Hablar con alguien
        </Button>
      </div>
    </motion.div>
  )
}
