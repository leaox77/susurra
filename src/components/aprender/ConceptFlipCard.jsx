/* eslint-disable react/prop-types */
import { useState } from 'react'
import { CharacterAvatar } from '@/components/aprender/CharacterAvatar'
import { DialogBubble } from '@/components/aprender/DialogBubble'
import { RecommendationList } from '@/components/aprender/RecommendationList'

export function ConceptFlipCard({ concept }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const recommendations = Array.isArray(concept.recommendations)
    ? concept.recommendations.filter((item) => typeof item === 'string' && item.trim().length > 0)
    : []

  return (
    <div className="w-full h-[320px]">
      <button
        type="button"
        className="relative w-full h-full cursor-pointer overflow-hidden rounded-[1.25rem] text-left"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div
          className={`absolute inset-0 bg-blanco p-5 shadow-sm border border-lavanda flex flex-col items-center justify-between transition-all duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'optimizeLegibility',
          }}
        >
          <h4 className="text-sm font-bold text-violeta w-full text-center mb-2">{concept.title}</h4>
          <div className="flex-1 flex flex-col items-center justify-end pb-2 w-full">
            <DialogBubble text={concept.dialog} />
            <CharacterAvatar size={80} />
          </div>
          <div className="w-full text-center mt-2 flex items-center justify-center gap-1 text-purpura text-xs font-semibold bg-lav-l py-1.5 rounded-full">
            <RotateIcon className="w-3 h-3" /> Toca para voltear
          </div>
        </div>

        <div
          className={`absolute inset-0 bg-lav-l p-5 shadow-sm border border-lavanda flex flex-col overflow-y-auto custom-scroll transition-all duration-300 ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'optimizeLegibility',
          }}
        >
          <h4 className="text-[15px] font-bold text-violeta mb-3 border-b border-lavanda pb-2">{concept.title}</h4>
          <p className="text-[13px] text-texto mb-4 leading-relaxed bg-blanco/70 p-3 rounded-xl border border-lavanda/50">
            {concept.backDetails}
          </p>
          {recommendations.length > 0 ? (
            <div className="mt-auto">
              <h5 className="text-[11px] font-bold text-purpura uppercase tracking-wider mb-2">Recomendaciones</h5>
              <RecommendationList items={recommendations} />
            </div>
          ) : null}
        </div>
      </button>
    </div>
  )
}

function RotateIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10a6 6 0 1 0 2-4.47" />
      <path d="M4 3.5v3.5h3.5" />
    </svg>
  )
}
