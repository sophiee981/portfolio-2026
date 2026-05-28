import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const DURATION = 1200
const COMPLETE_DELAY = 300
const ease = [0.4, 0, 0.2, 1] as const

interface LoadingScreenProps {
  onComplete: () => void
}

function Petal({ index, total, progress }: { index: number; total: number; progress: number }) {
  const baseAngle = (360 / total) * index - 90
  const openAmount = Math.min(progress / 100, 1)

  // Each petal is an elliptical arc that "blooms" outward
  const rx = 40 + openAmount * 35
  const ry = 12 + openAmount * 18
  const rotation = baseAngle + openAmount * 15

  return (
    <motion.ellipse
      cx="100"
      cy="100"
      rx={rx}
      ry={ry}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
      opacity={0.15 + openAmount * 0.25}
      transform={`rotate(${rotation} 100 100)`}
      initial={{ rx: 10, ry: 4, opacity: 0 }}
      animate={{ rx, ry, opacity: 0.15 + openAmount * 0.25 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  )
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)
  const startTimeRef = useRef<number | null>(null)
  const completedRef = useRef(false)

  onCompleteRef.current = onComplete

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp
    }

    const elapsed = timestamp - startTimeRef.current
    const pct = Math.min((elapsed / DURATION) * 100, 100)
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

  const petalCount = 5

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="relative flex flex-col items-center">
        {/* Blooming petals */}
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 200 200"
          className="absolute text-text-primary"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: petalCount }).map((_, i) => (
            <Petal key={i} index={i} total={petalCount} progress={progress} />
          ))}
        </motion.svg>

        {/* Inner gentle pulse ring */}
        <motion.div
          className="absolute h-32 w-32 rounded-full border border-text-primary/10"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
