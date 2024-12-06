'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import MouseEffect from './mouse-effect'

const useTheme = () => {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return { theme, toggleTheme, mounted }
}

export default function PersonalSite() {
  const contentRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <MouseEffect />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div ref={contentRef} className="w-full max-w-3xl">
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex justify-between items-center"
          >
            <h1 className="text-5xl font-bold font-serif glitch" data-text="Leon Wong">Leon Wong</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </motion.header>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 font-sans"
          >
            <p className="text-lg leading-relaxed">
              Welcome to my little corner of the internet! Check out{' '}
              <a href="https://l3on.site/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                ✍️ my blog
              </a>
              , where I gather my thoughts, ideas, and creations. I started this site to create a space that feels personal and true to the spirit of what the internet used to be — a place for individuality and expression.
            </p>
            <p className="text-lg leading-relaxed">
              I'm also on{' '}
              <a href="https://www.are.na/lok" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                🗃️ Are.na
              </a>
              . It's like a digital garden or public shelves that I enjoy nurturing with curiosity and care.
            </p>
            <p className="text-lg leading-relaxed">
              You can catch me out and about on{' '}
              <a href="https://bsky.app/profile/leonw.ong" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                🦋 Bluesky
              </a>
              ,{' '}
              <a href="https://www.instagram.com/l3on_y2k/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                📷 Instagram
              </a>
              , or if you like,{' '}
              <a href="https://twitter.com/l3on_y2k" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Twitter
              </a>{' '}
              — sometimes I like to share bits and pieces of my world across these platforms. I'm also on{' '}
              <a href="https://boxd.it/8rWaF/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                🎫 Letterboxd
              </a>
              , where I write some rough thoughts about the movies I watch. Oh, and I'm also on{' '}
              <a href="https://github.com/l3ony2k" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                🧑‍💻 Github
              </a>
              , but I don't have much going on there.
            </p>
            <p className="text-lg leading-relaxed">
              As you can see, most of my social handles are{' '}
              <span className="bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">@l3on_y2k</span>.
            </p>
            <p className="text-lg leading-relaxed">
              If you ever feel like saying hello or sharing something, drop me a message at{' '}
              <a href="mailto:l3on@duck.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                📧 l3on@duck.com
              </a>
              . I'm always up for a chat!
            </p>
            <p className="text-lg leading-relaxed">Thanks for stopping by, and enjoy surfing the internet!</p>
          </motion.main>
        </div>
      </div>
    </div>
  )
}

