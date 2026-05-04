import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const COUNTER_DURATION = 2700
const COMPLETE_DELAY = 400

const ease = [0.4, 0, 0.2, 1] as const

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)
  const startTimeRef = useRef<number | null>(null)
  const completedRef = useRef(false)

  onCompleteRef.current = onComplete

  // Counter via requestAnimationFrame
  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp
    }

    const elapsed = timestamp - startTimeRef.current
    const pct = Math.min((elapsed / COUNTER_DURATION) * 100, 100)
    setProgress(pct)

    if (pct < 100) {
      requestAnimationFrame(animate)
    } else if (!completedRef.current) {
      completedRef.current = true
      setTimeout(() => onCompleteRef.current(), COMPLETE_DELAY)
    }
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [animate])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* Counter — bottom right */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
      >
        <span
          className="text-6xl md:text-8xl lg:text-9xl text-text-primary tabular-nums"
          style={{ fontFamily: '"Bodoni Moda", serif' }}
        >
          {Math.round(progress).toString().padStart(3, '0')}
        </span>
      </motion.div>

      {/* Progress bar — bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border/50">
        <motion.div
          className="h-full origin-left bg-accent"
          style={{
            boxShadow: '0 0 8px color-mix(in srgb, var(--color-accent) 35%, transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}
