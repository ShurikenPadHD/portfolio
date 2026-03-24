'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

const socialLinks = [
  { icon: Github, href: 'https://github.com/oussamaouzin', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/oussama-ouzin-090937138/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ouzin.oussama@gmail.com', label: 'Email' },
]

export default function Hero() {
  const { t } = useLocale()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-purple/20 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] opacity-20" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10">
            {t.hero.available}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
        >
          <span className="block text-white">{t.hero.title}</span>
          <span className="block bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
            {t.hero.subtitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {t.hero.viewWork}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 text-sm font-medium text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {t.hero.getInTouch}
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mb-8"
          aria-label="Social media links"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 text-gray-500 hover:text-white bg-white/5 rounded-full border border-white/5 hover:border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
              aria-label={`Visit my ${label} profile`}
            >
              <Icon size={20} aria-hidden="true" />
            </motion.a>
          ))}
        </motion.nav>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
        >
          <motion.a
            href="#work"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
            aria-label="Scroll to projects"
          >
            <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
            <ArrowDown size={16} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
