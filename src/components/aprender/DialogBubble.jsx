/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const animatedTexts = new Set()

export function DialogBubble({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const safeText = typeof text === 'string' ? text : ''

  useEffect(() => {
    if (!safeText) {
      setDisplayed('')
      setIsTyping(false)
      return undefined
    }

    if (animatedTexts.has(safeText)) {
      setDisplayed(safeText)
      setIsTyping(false)
      return undefined
    }

    setDisplayed('')
    setIsTyping(false)

    const chars = Array.from(safeText)
    setIsTyping(true)

    let index = 0
    let timerId
    let cancelled = false

    const tick = () => {
      if (cancelled) return

      index += 1
      setDisplayed(chars.slice(0, index).join(''))

      if (index < chars.length) {
        timerId = setTimeout(tick, 26)
      } else {
        animatedTexts.add(safeText)
        setIsTyping(false)
      }
    }

    timerId = setTimeout(tick, 26)

    return () => {
      cancelled = true
      clearTimeout(timerId)
    }
  }, [safeText])

  return (
    <div className="relative flex items-center justify-center mb-1 z-20">
      <div className="max-w-[260px] text-center px-5 py-3.5 rounded-[18px] border border-lavanda/70 bg-[rgba(232,228,250,0.62)] shadow-[0_8px_20px_rgba(74,63,140,0.1)] backdrop-blur-[2px]">
        <p
          className="relative z-10 text-[13px] text-texto font-semibold leading-snug tracking-[0.01em]"
          style={{
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {displayed}
          {isTyping ? <span className="animate-pulse text-violeta ml-1 font-bold">|</span> : null}
        </p>
      </div>
    </div>
  )
}
