import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const TUTORIAL_STEPS = [
  {
    target: 'modules',
    title: 'Elige cómo empezar',
    desc: 'Tienes tres caminos. Pide ayuda si algo te está pasando, aprende sobre tus derechos, o contacta servicios reales.',
    terry: 'bicolor',
    position: 'bottom',
  },
  {
    target: 'ayuda',
    title: 'Pedir ayuda',
    desc: 'Aquí puedes contarme lo que está pasando. El chat es anónimo — nadie sabrá que estás aquí.',
    terry: 'bicolor',
    position: 'bottom',
  },
  {
    target: 'nav-historial',
    title: 'Tu historial privado',
    desc: 'Puedes volver a tus conversaciones anteriores. Solo tú las ves — no guardamos tu nombre ni datos personales.',
    terry: 'lavanda',
    position: 'top',
  },
  {
    target: 'nav-aprender',
    title: 'Aprende a tu ritmo',
    desc: 'Artículos claros sobre salud sexual, derechos y cómo protegerte. También hay un minijuego.',
    terry: 'lavanda',
    position: 'top',
  },
]

export default function Splash({ onDone }) {
  const [phase,       setPhase]       = useState('splash')   // splash | exit | tutorial | done
  const [tutStep,     setTutStep]     = useState(0)
  const [targetRect,  setTargetRect]  = useState(null)
  const navigate = useNavigate()

  // Cuando entra al tutorial, localiza el elemento target
  useEffect(() => {
    if (phase !== 'tutorial') return
    const step = TUTORIAL_STEPS[tutStep]
    const el   = document.getElementById(`tut-${step.target}`)
    if (el) {
      const r = el.getBoundingClientRect()
      setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
  }, [phase, tutStep])

  const handleBegin = () => setPhase('exit')

  const handleExitDone = () => {
    onDone()           // marca como visto en App
    setPhase('tutorial')
  }

  const handleNext = () => {
    if (tutStep + 1 >= TUTORIAL_STEPS.length) {
      setPhase('done')
    } else {
      setTutStep(s => s + 1)
    }
  }

  const handleSkip = () => setPhase('done')

  if (phase === 'done') return null

  const step = TUTORIAL_STEPS[tutStep]

  return (
    <AnimatePresence>

      {/* ── SPLASH ── */}
      {(phase === 'splash' || phase === 'exit') && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-noche overflow-hidden"
          animate={phase === 'exit' ? { scale: 0.92, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={phase === 'exit' ? { duration: 0.5, ease: [0.4, 0, 0.2, 1] } : {}}
          onAnimationComplete={() => { if (phase === 'exit') handleExitDone() }}
        >
          {/* Partículas de fondo */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purpura/20"
              style={{
                width:  Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                left:   `${Math.random() * 100}%`,
                top:    `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}

          {/* Terry grande */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mb-6"
          >
            <motion.img
              src="/icono.png"
              alt="Terry"
              className="w-36 h-36 object-contain"
              style={{ filter: 'drop-shadow(0 0 32px rgba(123,111,204,0.6))' }}
              animate={{ y: [-6, 6], rotate: [-2, 2] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            {/* Brillo orbital */}
            <motion.div
              className="absolute inset-0 rounded-full border border-purpura/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Nombre */}
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-serif text-5xl text-blanco mb-2"
          >
            Susurra
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lavanda text-base mb-1"
          >
            lo que sientes
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-purpura/60 text-xs tracking-widest uppercase mb-12"
          >
            anónimo · seguro · sin juicio
          </motion.p>

          {/* Botón comenzar con shimmer */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="relative"
          >
            <motion.button
              onClick={handleBegin}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-purpura text-blanco font-semibold
                         text-base px-10 py-3.5 rounded-full font-sans"
            >
              {/* Shimmer que se mueve */}
              <motion.div
                className="absolute inset-0 -skew-x-12"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10">Comenzar</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* ── TUTORIAL ── */}
      {phase === 'tutorial' && targetRect && (
        <motion.div
          key={`tut-${tutStep}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500]"
        >
          {/* Overlay oscuro con hueco para el target */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <mask id="spotlight-mask">
                <rect width="100%" height="100%" fill="white"/>
                <rect
                  x={targetRect.left - 8}
                  y={targetRect.top - 8}
                  width={targetRect.width + 16}
                  height={targetRect.height + 16}
                  rx="16"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%" height="100%"
              fill="rgba(20,14,50,0.82)"
              mask="url(#spotlight-mask)"
            />
          </svg>

          {/* Borde brillante alrededor del elemento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute rounded-2xl pointer-events-none"
            style={{
              top:    targetRect.top - 8,
              left:   targetRect.left - 8,
              width:  targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: '0 0 0 2px rgba(184,174,237,0.6), 0 0 24px rgba(123,111,204,0.4)',
            }}
          />

          {/* Tooltip con Terry */}
          <TooltipCard
            step={step}
            stepIndex={tutStep}
            total={TUTORIAL_STEPS.length}
            targetRect={targetRect}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        </motion.div>
      )}

    </AnimatePresence>
  )
}

function TooltipCard({ step, stepIndex, total, targetRect, onNext, onSkip }) {
  // Posicionar arriba o abajo del elemento destacado
  const isBottom = step.position === 'bottom'
  const cardTop  = isBottom
    ? targetRect.top + targetRect.height + 20
    : targetRect.top - 180

  // Centrar horizontalmente
  const cardLeft = Math.max(16, Math.min(
    targetRect.left + targetRect.width / 2 - 160,
    window.innerWidth - 336
  ))

  return (
    <motion.div
      initial={{ opacity: 0, y: isBottom ? -12 : 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
      className="absolute w-80 bg-noche border border-lavanda/30 rounded-2xl p-4 shadow-2xl"
      style={{ top: cardTop, left: cardLeft }}
    >
      {/* Terry */}
      <div className="flex items-start gap-3">
        <motion.img
          src={step.terry === 'bicolor' ? '/terry-bicolor.png' : '/terry-lavanda.png'}
          alt="Terry"
          className="w-14 h-14 object-contain flex-shrink-0"
          animate={{ y: [-3, 3] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-base text-blanco mb-1">{step.title}</h3>
          <p className="text-xs text-lavanda leading-relaxed">{step.desc}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-lavanda/15">
        {/* Dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${
              i === stepIndex
                ? 'w-4 h-1.5 bg-purpura'
                : 'w-1.5 h-1.5 bg-lavanda/30'
            }`} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onSkip}
            className="text-xs text-lavanda/50 hover:text-lavanda transition-colors">
            Saltar
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-purpura text-blanco text-xs font-semibold px-4 py-1.5 rounded-full"
          >
            {stepIndex + 1 >= total ? 'Listo ✓' : 'Siguiente →'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}