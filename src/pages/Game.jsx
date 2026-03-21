import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getGameQuestions } from '@/lib/api'
import Button from '@/components/ui/Button'

export default function Game() {
  const navigate  = useNavigate()
  const [questions, setQuestions] = useState([])
  const [current,   setCurrent]   = useState(0)
  const [answered,  setAnswered]  = useState(null)   // null | 'correct' | 'wrong'
  const [score,     setScore]     = useState(0)
  const [done,      setDone]      = useState(false)
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    getGameQuestions(8)
      .then(setQuestions)
      .finally(() => setLoading(false))
  }, [])

  const q = questions[current]

  const handleAnswer = (userAnswer) => {
    if (answered) return
    const correct = userAnswer === q.answer
    setAnswered(correct ? 'correct' : 'wrong')
    if (correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setAnswered(null)
    }
  }

  if (loading) return <LoadingScreen />
  if (done) return <ResultScreen score={score} total={questions.length} onRestart={() => { setCurrent(0); setScore(0); setDone(false); setAnswered(null) }} onBack={() => navigate('/aprender')} />

  const progress = ((current) / questions.length) * 100

  return (
    <div className="min-h-dvh bg-susurra flex flex-col">

      {/* Header */}
      <header className="bg-noche px-4 py-3 flex items-center gap-3 safe-top">
        <button onClick={() => navigate('/aprender')} className="text-lavanda">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-base text-blanco flex-1">¿Mito o Verdad?</h1>
        <span className="text-xs text-lavanda font-medium">{current + 1} de {questions.length}</span>
      </header>

      {/* Progress bar */}
      <div className="h-1.5 bg-lav-l">
        <motion.div
          className="h-full bg-purpura rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <div className="flex-1 flex flex-col px-4 py-6 gap-5 max-w-lg mx-auto w-full">

        {/* Pregunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 border border-lavanda/30 flex-1 flex items-center"
          >
            <p className="font-serif text-lg text-noche leading-relaxed text-center text-balance">
              "{q?.question}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Botones de respuesta */}
        <div className="grid grid-cols-2 gap-3">
          <AnswerButton
            label="Mito"
            color="pink"
            answered={answered}
            correct={!q?.answer}
            onClick={() => handleAnswer(false)}
          />
          <AnswerButton
            label="Verdad"
            color="mint"
            answered={answered}
            correct={q?.answer}
            onClick={() => handleAnswer(true)}
          />
        </div>

        {/* Explicación */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`rounded-2xl p-4 border-l-4 ${
                answered === 'correct'
                  ? 'bg-[#D4F0E8] border-menta'
                  : 'bg-rosa-l border-rosa'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                    ${answered === 'correct' ? 'bg-menta text-[#085041]' : 'bg-rosa text-[#72243E]'}`}
                >
                  {answered === 'correct' ? '✓' : '✗'}
                </motion.span>
                <span className={`text-xs font-bold uppercase tracking-wide
                  ${answered === 'correct' ? 'text-[#085041]' : 'text-[#993556]'}`}>
                  {answered === 'correct' ? '¡Correcto!' : 'No exactamente'}
                </span>
              </div>
              <p className="text-xs text-texto leading-relaxed">{q?.explanation}</p>
              <button
                onClick={handleNext}
                className={`mt-3 w-full py-2.5 rounded-full text-xs font-semibold transition-all active:scale-95
                  ${answered === 'correct'
                    ? 'bg-menta text-[#085041]'
                    : 'bg-rosa text-[#72243E]'}`}
              >
                {current + 1 >= questions.length ? 'Ver resultado' : 'Siguiente →'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function AnswerButton({ label, color, answered, correct, onClick }) {
  const isPink = color === 'pink'
  const base   = isPink
    ? 'bg-rosa-l border-rosa text-[#72243E]'
    : 'bg-[#D4F0E8] border-menta text-[#085041]'

  let state = 'idle'
  if (answered) {
    state = correct ? 'correct' : 'wrong'
  }

  const stateClass = {
    idle:    base,
    correct: isPink
      ? 'bg-rosa-l border-rosa text-[#72243E] opacity-30'
      : 'bg-[#D4F0E8] border-menta text-[#085041] ring-2 ring-menta',
    wrong:   isPink
      ? 'bg-rosa border-rosa text-[#72243E] ring-2 ring-rosa'
      : 'bg-[#D4F0E8] border-menta text-[#085041] opacity-30',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={!!answered}
      whileTap={!answered ? { scale: 0.95 } : {}}
      animate={answered && !correct ? { x: [0, -4, 4, -4, 4, 0] } : {}}
      transition={{ duration: 0.3 }}
      className={`
        py-5 rounded-2xl border-2 font-bold text-base
        transition-all duration-200 cursor-pointer
        disabled:cursor-default
        ${stateClass[state]}
      `}
    >
      {label}
    </motion.button>
  )
}

function ResultScreen({ score, total, onRestart, onBack }) {
  const pct     = Math.round((score / total) * 100)
  const emoji   = pct >= 80 ? '🌟' : pct >= 50 ? '💜' : '📚'
  const msg     = pct >= 80
    ? '¡Excelente! Tienes un gran conocimiento.'
    : pct >= 50
    ? '¡Bien! Sigue aprendiendo.'
    : 'Hay cosas nuevas que aprender. ¡Vuelve a intentarlo!'

  return (
    <div className="min-h-dvh bg-susurra flex flex-col items-center justify-center px-6 gap-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="text-6xl"
      >
        {emoji}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl text-noche mb-2">{score} de {total}</h2>
        <p className="text-purpura text-sm">{msg}</p>
      </motion.div>

      {/* Barra de progreso resultado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="w-full max-w-xs"
      >
        <div className="h-3 bg-lav-l rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purpura rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-center text-xs text-purpura/60 mt-1">{pct}% correcto</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <Button fullWidth onClick={onRestart}>Jugar de nuevo</Button>
        <Button fullWidth variant="outline" onClick={onBack}>Volver a Aprender</Button>
      </motion.div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-dvh bg-susurra flex items-center justify-center">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-2.5 h-2.5 bg-purpura rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

function ChevronLeft({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M13 4l-6 6 6 6"/></svg>
}
