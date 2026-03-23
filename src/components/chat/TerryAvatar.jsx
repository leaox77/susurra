import { motion, AnimatePresence } from 'framer-motion'

/**
 * Su — avatar animado de Susurra.
 * state: 'idle' | 'typing'
 * size:  'sm' | 'md' | 'lg'

 * idle   → Su lavanda, flota suave y quietito
 * typing → Su bicolor, se mueve agitado mientras escribe
 */
export default function TerryAvatar({ state = 'idle', size = 'md' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' }
  const isTyping = state === 'typing'

  return (
    <div className={`relative flex-shrink-0 ${sizes[size]}`}>
      <AnimatePresence mode="wait">

        {/* Su lavanda — idle, escuchando, quietito */}
        {!isTyping && (
          <motion.div
            key="lavanda"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.img
              src="/terry-lavanda.png"
              alt="Su"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(123,111,204,0.25))' }}
              animate={{
                y:      [-2, 2],
                rotate: [-1, 1],
              }}
              transition={{
                y:      { duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                rotate: { duration: 4.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              }}
            />
          </motion.div>
        )}

        {/* Su bicolor — typing, hablando, agitado */}
        {isTyping && (
          <motion.div
            key="bicolor"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <motion.img
              src="/terry-bicolor.png"
              alt="Su hablando"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(74,63,140,0.35))' }}
              animate={{
                y:      [-3, 2, -2, 1],
                rotate: [-2, 2, -1.5, 1.5],
                scale:  [1, 1.03, 1, 1.02],
              }}
              transition={{
                y:      { duration: 1.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                rotate: { duration: 1.1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                scale:  { duration: 0.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sombra suave debajo que se sincroniza con el movimiento */}
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-purpura/15 rounded-full blur-sm"
        style={{ width: '55%', height: '6px' }}
        animate={{
          scaleX:  isTyping ? [1, 1.2, 1, 1.15] : [1, 0.8, 1],
          opacity: isTyping ? [0.4, 0.6, 0.4] : [0.25, 0.4, 0.25],
        }}
        transition={{
          duration:   isTyping ? 0.9 : 3.5,
          repeat:     Infinity,
          repeatType: 'mirror',
          ease:       'easeInOut',
        }}
      />
    </div>
  )
}
