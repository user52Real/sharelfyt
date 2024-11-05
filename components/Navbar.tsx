'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MaxWidthWrapper from './MaxWidthWrapper'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Close menu on escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav 
      className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <MaxWidthWrapper className="flex items-center justify-between h-16">
        <Link 
          href="/" 
          className="text-xl font-bold"
          aria-label="ShareFlyt - Return to homepage"
        >
          ShareFlyt
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-blue-400 ${
                pathname === item.href ? 'text-blue-400' : 'text-gray-300'
              }`}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Menu Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <div className="w-6 h-6 flex flex-col justify-around">
            <span 
              className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span 
              className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md ${
                        pathname === item.href 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MaxWidthWrapper>
    </nav>
  )
}