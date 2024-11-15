"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, RocketIcon } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'
import MobileNav from './MobileNav'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
]

const MotionLink = motion.create(Link)
const MotionDiv = motion.create('div')

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 shadow-lg backdrop-blur-lg' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <MaxWidthWrapper>
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-bold"
              aria-label="ShareFlyt - Return to homepage"
            >
              <MotionDiv
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <RocketIcon className="h-6 w-6 transition-transform group-hover:-rotate-12" />
              </MotionDiv>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ShareFlyt
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <div key={item.href} className="relative px-2">
                    <MotionLink
                      href={item.href}
                      className={`relative flex items-center px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'text-blue-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={() => setHoveredPath(item.href)}
                      onMouseLeave={() => setHoveredPath(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{item.label}</span>

                      {hoveredPath === item.href && (
                        <MotionDiv
                          layoutId="navbar-hover"
                          className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            duration: 0.3
                          }}
                        />
                      )}

                      {isActive && (
                        <MotionDiv
                          layoutId="navbar-active"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            duration: 0.5
                          }}
                        />
                      )}
                    </MotionLink>
                  </div>
                )
              })}           
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 rounded-lg p-2 hover:bg-white/10 md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <MotionDiv
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6 text-white" />
              </MotionDiv>
            </button>
          </div>
        </MaxWidthWrapper>

        <MotionDiv
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Mobile Navigation Panel */}
      <MotionDiv
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 right-0 z-50 w-64 bg-gray-900/95 px-6 py-24 shadow-2xl backdrop-blur-lg md:hidden"
      >
        <nav className="space-y-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-lg transition-colors ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Contact Card */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
            <h4 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
              Get in Touch
            </h4>
            <p className="mb-3 text-sm text-gray-400">
              Ready to start your project? Let&apos;s talk about your ideas.
            </p>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </MotionDiv>
    </>
  )
}