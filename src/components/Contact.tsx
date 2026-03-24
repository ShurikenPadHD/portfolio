'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

// TODO: Replace with your Formspree form ID (e.g., 'xyzabcde')
const FORMSPREE_FORM_ID = 'mreynveq'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { t } = useLocale()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setStatus('loading')
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      
      if (response.ok) {
        setStatus('success')
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium text-accent-purple bg-accent-purple/10 rounded-full mb-6">
              {t.contact.label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              {t.contact.title}
              <span className="block bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                {t.contact.subtitle}
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.contact.description}
            </p>

            <div className="space-y-4">
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg group-hover:bg-accent-blue/20 transition-colors">
                  <Mail size={18} className="text-accent-blue" />
                </div>
                <span>{t.contact.email}</span>
              </a>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg">
                  <MapPin size={18} className="text-accent-purple" />
                </div>
                <span>{t.contact.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Success Message */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 text-sm">{t.contact.form.success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 text-sm">{t.contact.form.error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  {t.contact.form.name} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.name 
                      ? 'border-red-500/50 focus:ring-red-500/20' 
                      : 'border-white/10 focus:ring-accent-blue/20 focus:border-accent-blue/50'
                  }`}
                  placeholder={t.contact.form.namePlaceholder}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      id="name-error"
                      className="mt-2 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  {t.contact.form.email} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500/50 focus:ring-red-500/20' 
                      : 'border-white/10 focus:ring-accent-blue/20 focus:border-accent-blue/50'
                  }`}
                  placeholder={t.contact.form.emailPlaceholder}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      id="email-error"
                      className="mt-2 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  {t.contact.form.message} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={5}
                  className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message 
                      ? 'border-red-500/50 focus:ring-red-500/20' 
                      : 'border-white/10 focus:ring-accent-blue/20 focus:border-accent-blue/50'
                  }`}
                  placeholder={t.contact.form.messagePlaceholder}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      id="message-error"
                      className="mt-2 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    {t.contact.form.send}
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
