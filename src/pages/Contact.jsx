import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getServices } from '@/lib/api'

const filters = [
  { id: 'todos',      label: 'Todos' },
  { id: 'emergencia', label: 'Emergencia' },
  { id: 'digital',    label: 'Digital' },
  { id: 'salud',      label: 'Salud' },
  { id: 'psicologia', label: 'Psicología' },
  { id: 'legal',      label: 'Legal' },
]

const borderColors = {
  emergencia: 'border-l-rosa',
  digital:    'border-l-purpura',
  salud:      'border-l-azul',
  psicologia: 'border-l-lavanda',
  legal:      'border-l-menta',
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export default function Contact() {
  const [services,  setServices]  = useState([])
  const [activeF,   setActiveF]   = useState('todos')
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    setLoading(true)
    getServices(activeF === 'todos' ? null : activeF)
      .then(setServices)
      .finally(() => setLoading(false))
  }, [activeF])

  return (
    <div className="min-h-dvh bg-susurra">
      <div className="px-4 pt-5 pb-4 max-w-lg mx-auto flex flex-col gap-4">

        {/* Banner emergencia */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-violeta rounded-2xl px-4 py-3 flex items-center gap-3"
        >
          <PhoneCallIcon className="w-5 h-5 text-lavanda flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-blanco">Línea de crisis 24/7</p>
            <p className="text-xs text-lavanda">800-10-4770 — llamada gratuita</p>
          </div>
          <a
            href="tel:80010477"
            className="ml-auto bg-white/15 text-blanco text-xs px-3 py-1.5 rounded-full font-semibold
                       hover:bg-white/25 transition-colors flex-shrink-0"
          >
            Llamar
          </a>
        </motion.div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          {filters.map((f, i) => (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setActiveF(f.id)}
              className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all
                ${activeF === f.id
                  ? 'bg-violeta text-blanco'
                  : 'bg-lav-l text-purpura hover:bg-lavanda/30'}`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Lista servicios */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-lavanda/20" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3"
          >
            {services.map(svc => (
              <motion.div
                key={svc.id}
                variants={item}
                className={`bg-white rounded-2xl p-4 border border-lavanda/20 border-l-4
                  ${borderColors[svc.category] || 'border-l-lavanda'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-noche leading-snug">{svc.name}</h4>
                    <p className="text-xs text-purpura/70 mt-0.5 leading-relaxed">{svc.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {svc.is_24h  && <Chip label="24h" color="mint" />}
                      {svc.is_free && <Chip label="Gratuito" color="purple" />}
                      <Chip label={svc.city} color="blue" />
                    </div>
                  </div>
                </div>

                {/* Contacto */}
                {(svc.phone || svc.whatsapp) && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-lavanda/20">
                    <p className="text-sm font-semibold text-purpura">
                      {svc.phone || svc.whatsapp}
                    </p>
                    <div className="flex gap-2">
                      {svc.phone && (
                        <a href={`tel:${svc.phone.replace(/[-\s]/g, '')}`}
                           className="border border-purpura text-purpura text-xs px-3 py-1.5 rounded-full
                                      hover:bg-lav-l transition-colors font-medium">
                          Llamar
                        </a>
                      )}
                      {svc.whatsapp && (
                        <a href={`https://wa.me/${svc.whatsapp.replace(/[^0-9]/g, '')}`}
                           target="_blank" rel="noreferrer"
                           className="bg-[#25D366] text-white text-xs px-3 py-1.5 rounded-full
                                      font-medium hover:opacity-90 transition-opacity">
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {services.length === 0 && (
              <p className="text-center text-sm text-purpura/50 py-8">
                No hay servicios en esta categoría
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function Chip({ label, color }) {
  const colors = {
    mint:   'bg-[#D4F0E8] text-[#085041]',
    purple: 'bg-lav-l text-violeta',
    blue:   'bg-azul-ll text-[#0C447C]',
  }
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[color]}`}>
      {label}
    </span>
  )
}

function PhoneCallIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h5l2 4-2.5 1.5a9 9 0 004 4L14 11l4 2v4a1 1 0 01-1 1A15 15 0 013 3a1 1 0 011-1"/></svg>
}
