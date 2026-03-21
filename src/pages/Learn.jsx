import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getArticles } from '@/lib/api'

const categories = [
  { id: null,               label: 'Todos' },
  { id: 'anticoncepcion',  label: 'Anticoncepción' },
  { id: 'its',             label: 'ITS' },
  { id: 'consentimiento',  label: 'Consentimiento' },
  { id: 'derechos',        label: 'Mis derechos' },
  { id: 'violencia_digital',label: 'Violencia digital' },
]

const catColors = {
  anticoncepcion:   'bg-azul-ll text-[#0C447C] border-azul-l',
  its:              'bg-rosa-l text-[#72243E] border-rosa',
  consentimiento:   'bg-lav-l text-violeta border-lavanda',
  derechos:         'bg-[#D4F0E8] text-[#085041] border-menta',
  violencia_digital:'bg-[#FFF3E0] text-[#7A3B00] border-[#FFCC80]',
  salud_general:    'bg-lav-l text-violeta border-lavanda',
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function Learn() {
  const navigate      = useNavigate()
  const [articles,    setArticles]   = useState([])
  const [activeCat,   setActiveCat]  = useState(null)
  const [search,      setSearch]     = useState('')
  const [loading,     setLoading]    = useState(true)

  useEffect(() => {
    setLoading(true)
    getArticles(activeCat)
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [activeCat])

  const filtered = articles.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-dvh bg-susurra">
      <div className="px-4 pt-5 pb-4 max-w-lg mx-auto flex flex-col gap-4">

        {/* Buscador */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 border border-lavanda/30"
        >
          <SearchIcon className="w-4 h-4 text-lavanda flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar un tema..."
            className="flex-1 text-sm text-texto placeholder-lavanda outline-none bg-transparent"
          />
        </motion.div>

        {/* Categorías */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id ?? 'all'}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCat(cat.id)}
              className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all
                ${activeCat === cat.id
                  ? 'bg-violeta text-blanco'
                  : 'bg-lav-l text-purpura hover:bg-lavanda/30'}`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Tarjeta destacada — Mito o Verdad */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate('/aprender/juego')}
          className="bg-azul-l rounded-2xl p-4 flex items-center gap-3 cursor-pointer
                     border border-azul/20 hover:border-azul/40 transition-all active:scale-[0.98]"
        >
          <div className="w-12 h-12 bg-azul rounded-xl flex items-center justify-center flex-shrink-0">
            <StarIcon className="w-6 h-6 text-[#042C53]" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#0C447C]">¿Mito o Verdad?</h3>
            <p className="text-xs text-[#185FA5] mt-0.5">Pon a prueba lo que sabes — 8 preguntas</p>
          </div>
          <ChevronRight className="w-4 h-4 text-azul ml-auto" />
        </motion.div>

        {/* Grid de artículos */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl h-28 animate-pulse border border-lavanda/20" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-3"
          >
            {filtered.map(article => (
              <motion.div
                key={article.id}
                variants={item}
                onClick={() => navigate(`/aprender/${article.slug}`)}
                className={`rounded-2xl p-3.5 border cursor-pointer transition-all active:scale-[0.97]
                  ${catColors[article.category] || 'bg-lav-l text-violeta border-lavanda'}`}
              >
                <h4 className="font-semibold text-xs leading-snug mb-1">{article.title}</h4>
                <p className="text-[11px] opacity-75 leading-snug line-clamp-2">{article.summary}</p>
                <p className="text-[10px] opacity-50 mt-2">{article.read_time} min de lectura</p>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <motion.div
                variants={item}
                className="col-span-2 text-center py-8 text-purpura/50 text-sm"
              >
                No se encontraron artículos
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function SearchIcon({ className }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6.5" cy="6.5" r="4"/><path d="M10 10L13 13"/></svg>
}
function StarIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
}
function ChevronRight({ className }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 4l4 4-4 4"/></svg>
}
