import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Info, Briefcase, Phone, Settings, Menu, X, ChevronRight } from 'lucide-react'

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
  },
  open: {
    opacity: 1,
    x: 0,
  }
}

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/services', label: 'Services', icon: Settings },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
]

interface NavItem {
  href: string
  label: string
  icon?: any
}

interface MobileNavProps {
  items: NavItem[]
}

const MotionDiv = motion.create('div')

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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
        className="fixed right-4 top-4 z-[100] rounded-lg bg-gray-900/90 p-2 backdrop-blur-sm transition-colors hover:bg-gray-800/90"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <MotionDiv
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </MotionDiv>
      </button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <MotionDiv
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-[55] flex w-3/4 max-w-sm flex-col bg-gray-900/95 backdrop-blur-lg"
            >
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-4 rounded-lg p-4 text-lg transition-colors ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${isActive ? 'text-blue-400' : ''}`} />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="ml-auto h-5 w-5 text-blue-400" />}
                    </Link>
                  )
                })}
              </nav>

              {/* Contact Card */}
              <div className="border-t border-gray-800 bg-gray-900/95 px-6 py-6 backdrop-blur-lg">
                <div className="rounded-lg border border-gray-800 bg-white/5 p-4">
                  <h4 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
                    Get in Touch
                  </h4>
                  <p className="mb-3 text-sm text-gray-400">
                    Ready to start your project? Let&apos;s talk about your ideas.
                  </p>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}