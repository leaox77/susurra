/* eslint-disable react/prop-types */
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAprenderContent } from '@/hooks/useAprenderContent'
import { CategoryTabs } from '@/components/aprender/CategoryTabs'
import { TopicHeroCard } from '@/components/aprender/TopicHeroCard'
import { TopicsEmptyState } from '@/components/aprender/TopicsEmptyState'
import { TopicsLoadingState } from '@/components/aprender/TopicsLoadingState'

export default function Learn() {
  const navigate = useNavigate()

  const {
    categories,
    activeCategory,
    activeCategoryId,
    setActiveCategoryId,
    search,
    setSearch,
    topics,
    loading,
    error,
  } = useAprenderContent()

  const hasSearch = useMemo(() => Boolean(search.trim()), [search])

  return (
    <div className="min-h-dvh bg-susurra">
      <div className="px-4 md:px-6 lg:px-10 pt-5 pb-6 max-w-6xl mx-auto flex flex-col gap-4 md:gap-5">

        {/* Buscador */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 md:py-3.5 border border-lavanda/30 shadow-sm"
        >
          <SearchIcon className="w-4 h-4 text-lavanda flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar un tema..."
            className="flex-1 text-sm md:text-base text-texto placeholder-lavanda outline-none bg-transparent"
          />
        </motion.div>

        {/* Categorías */}
        <CategoryTabs
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
        />

        {/* Tarjeta destacada de juego */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate('/aprender/juego')}
          className="bg-azul-l rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 cursor-pointer
                     border border-azul/20 hover:border-azul/40 transition-all active:scale-[0.98] shadow-sm"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-azul rounded-xl flex items-center justify-center flex-shrink-0">
            <StarIcon className="w-6 h-6 text-[#042C53]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm md:text-base text-[#0C447C]">¿Mito o Verdad?</h3>
            <p className="text-xs md:text-sm text-[#185FA5]">Pon a prueba lo que sabes — 8 preguntas</p>
          </div>
          <ChevronRight className="w-4 h-4 text-azul ml-auto" />
        </motion.div>

        {/* Estado de error */}
        {error && (
          <div className="rounded-2xl border border-[#F5C2C2] bg-[#FFF4F4] p-4 text-sm text-[#9B1C1C]">
            No pudimos cargar la informacion de aprendizaje desde la base de datos.
          </div>
        )}

        {/* Tarjetas de tema y conceptos */}
        {loading ? <TopicsLoadingState /> : null}

        {!loading && topics.length === 0 ? (
          <TopicsEmptyState
            title={hasSearch ? 'Sin coincidencias' : 'Proximamente'}
            message={
              hasSearch
                ? 'No encontramos conceptos con ese termino dentro de esta categoria.'
                : `Aun estamos preparando la informacion para ${activeCategory?.title || 'esta categoria'}.`
            }
          />
        ) : null}

        {!loading && topics.length > 0 ? (
          <div
            className="grid gap-4 md:gap-5 items-stretch"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
          >
            {topics.map((topic) => (
              <TopicHeroCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : null}
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
