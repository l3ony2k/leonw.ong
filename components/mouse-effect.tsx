'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MouseEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }
    
    checkIsDesktop()
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    mediaQuery.addEventListener('change', checkIsDesktop)

    return () => {
      mediaQuery.removeEventListener('change', checkIsDesktop)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      animate={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  )
}

