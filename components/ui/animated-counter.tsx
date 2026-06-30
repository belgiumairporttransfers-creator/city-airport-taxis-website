'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number // duration in ms
  decimals?: number
  suffix?: string
  prefix?: string
  once?: boolean
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  once = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: duration / 1000, // Convert ms to seconds for framer-motion
        onUpdate(value) {
          setCount(value)
        },
        ease: "easeOut"
      })
      return () => controls.stop()
    } else {
      setCount(0)
    }
  }, [end, duration, isInView])

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
    >
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </motion.span>
  )
}
