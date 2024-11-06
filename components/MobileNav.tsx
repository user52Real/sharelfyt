import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Info, Briefcase, Phone, Settings, Menu, X, ChevronRight } from 'lucide-react'

// Animation variants
const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05,
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05,
    }
  }
}

const itemVariants = {
  closed: { 
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2
    }
  },
  open: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2
    }
  }
}

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/services', label: 'Services', icon: Settings },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Phone },
]

interface NavItem {
  href: string
  label: string
  icon?: any
}

interface MobileNavProps {
  items: NavItem[]
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 rounded-lg p-2 hover:bg-white/10"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 right-0 z-40 w-3/4 max-w-sm bg-gradient-to-b from-gray-900 to-black px-6 py-24 shadow-2xl"
          >
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className={`group flex items-center space-x-4 rounded-lg p-3 text-lg transition-colors ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-blue-400' : ''
                      }`} />
                      <span>{item.label}</span>
                      <ChevronRight className={`ml-auto h-5 w-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 ${
                        isActive ? 'text-blue-400' : ''
                      }`} />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Bottom Section */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-6 right-6"
            >
              <div className="rounded-lg border border-gray-800 bg-white/5 p-4 backdrop-blur-sm">
                <h4 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
                  Get in Touch
                </h4>
                <p className="mb-3 text-sm text-gray-400">
                  Ready to start your project? Let's talk about your ideas.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}