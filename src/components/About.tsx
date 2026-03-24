'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Users } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

const skillIcons = {
  fullstack: Code2,
  design: Palette,
  ios: Zap,
  advisory: Users,
}

export default function About() {
  const { t } = useLocale()
  
  const skills = [
    { key: 'fullstack', ...t.about.skills.fullstack },
    { key: 'design', ...t.about.skills.design },
    { key: 'ios', ...t.about.skills.ios },
    { key: 'advisory', ...t.about.skills.advisory },
  ]
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium text-accent-blue bg-accent-blue/10 rounded-full mb-6">
              {t.about.label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              {t.about.title}
              <span className="block bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                {t.about.subtitle}
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {t.about.bio1.replace('{years}', '3')}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.about.bio2}
            </p>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-200"
            >
              {t.about.cta}
            </motion.a>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => {
              const Icon = skillIcons[skill.key as keyof typeof skillIcons]
              return (
                <motion.div
                  key={skill.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="p-6 bg-dark-700 rounded-2xl border border-white/5 hover:border-white/10 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent-blue/10 rounded-xl mb-4 group-hover:bg-accent-blue/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent-blue" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{skill.title}</h3>
                  <p className="text-gray-500 text-sm">{skill.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
