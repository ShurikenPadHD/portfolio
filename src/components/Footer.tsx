'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

const socialLinks = [
  { icon: Github, href: 'https://github.com/oussamaouzin', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/oussama-ouzin-090937138/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ouzin.oussama@gmail.com', label: 'Email' },
]

export default function Footer() {
  const { t } = useLocale()
  
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-lg font-semibold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Shuriken Apps
            </span>
          </motion.a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-white transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            {t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}
          </p>
        </div>
      </div>
    </footer>
  )
}
