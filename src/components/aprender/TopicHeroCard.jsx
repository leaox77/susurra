/* eslint-disable react/prop-types */
import { useState } from 'react'
import { CharacterAvatar } from '@/components/aprender/CharacterAvatar'
import { DialogBubble } from '@/components/aprender/DialogBubble'
import { ConceptGrid } from '@/components/aprender/ConceptGrid'

export function TopicHeroCard({ topic }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const spanClass = isExpanded ? 'lg:col-span-2' : ''

  return (
    <div className={`bg-blanco rounded-[1.5rem] p-5 sm:p-6 shadow-md border border-lavanda/60 overflow-hidden h-full ${spanClass}`}>
      <div className="flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[11px] font-bold text-purpura uppercase tracking-wider bg-lav-l px-2.5 py-1 rounded-full">
              Tema Principal
            </span>
            <h2 className="text-2xl font-bold text-violeta mt-2 leading-tight">{topic.title}</h2>
          </div>
        </div>

        {isExpanded ? (
          <div
            className="md:grid md:gap-6"
            style={{ gridTemplateColumns: 'minmax(320px, 520px) 1fr' }}
          >
            <div className="bg-gradient-to-br from-lav-l via-white to-white rounded-xl p-4 md:p-5 mb-5 md:mb-0 border border-lavanda/50 shadow-sm h-full flex flex-col gap-3 md:justify-self-start">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purpura/10 border border-purpura/30 flex items-center justify-center text-purpura font-bold text-xs">
                    Su
                  </div>
                  <div className="leading-tight">
                    <p className="text-[11px] font-semibold text-purpura uppercase tracking-wide">Resumen del tema</p>
                    <p className="text-sm font-semibold text-violeta">{topic.title}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-purpura bg-white/80 border border-purpura/20 px-2 py-1 rounded-full whitespace-nowrap">Recomendado</span>
              </div>

              <p className="text-[14px] md:text-[15px] text-texto leading-relaxed font-medium md:leading-loose">
                {topic.expandedInfo}
              </p>
            </div>

            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold text-violeta mb-4 flex items-center gap-2" style={{ textRendering: 'optimizeLegibility' }}>
                <SparklesIcon className="w-4 h-4 text-purpura" />
                Conceptos Clave
              </h3>
              <ConceptGrid concepts={topic.concepts || []} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-2 pb-4 gap-4">
            <DialogBubble text={topic.dialog || 'Sin descripcion'} />
            <CharacterAvatar size={120} />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 w-full py-3 bg-violeta text-blanco rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purpura transition-all active:scale-[0.98]"
        >
          {isExpanded ? (
            <>
              Contraer informacion
              <ChevronUpIcon className="w-5 h-5" />
            </>
          ) : (
            <>
              Leer mas sobre el tema
              <ChevronDownIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function SparklesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.5 1l1.7 4.2L16.5 7l-4.3 1.8L10.5 13 8.8 8.8 4.5 7l4.3-1.8L10.5 1zM4 12l1 2.5L7.5 16 5 17 4 19l-1-2-2.5-1L3 14.5 4 12zm12 0l.8 1.9L18.7 15l-1.9.8L16 17.7l-.8-1.9L13.3 15l1.9-.8.8-2.2z" />
    </svg>
  )
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronUpIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
