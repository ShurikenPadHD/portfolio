'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

export default function Navbar() {
  const { t, toggleLocale, locale } = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  
  const navItems = [
    { name: t.nav.work, href: '#work' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Detect active section for navigation highlighting
      const sections = navItems.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-semibold tracking-tight text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Shuriken Apps
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </motion.a>
              )
            })}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              Let's Talk
            </motion.a>
            <motion.button
              onClick={toggleLocale}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label={`Switch to ${locale === 'en' ? 'French' : 'English'}`}
            >
              <Globe size={18} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 text-sm font-medium bg-white text-black rounded-full mt-4"
              >
                {t.nav.letsTalk}
              </a>
              <button
                onClick={() => { toggleLocale(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-2 text-gray-400 hover:text-white transition-colors mt-2"
              >
                <Globe size={18} />
                {locale === 'en' ? 'Français' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
