"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { RocketIcon, ExternalLink } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'
import MobileNav from './MobileNav'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

const MotionLink = motion.create(Link)

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg shadow-lg' 
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
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <RocketIcon className="h-6 w-6 transition-transform group-hover:-rotate-12" />
            </motion.div>
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

                    {/* Hover Effect */}
                    {hoveredPath === item.href && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.3
                        }}
                      />
                    )}

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
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

            {/* Call to Action Button */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="group ml-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:shadow-blue-500/25"
              >
                Start Project
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div> */}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav items={navItems} />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Gradient Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"
      />
    </motion.nav>
  )
}