'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { translations, locales, type Locale } from '@/lib/i18n'

interface LocaleContextType {
  locale: Locale
  t: typeof translations.en
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children, defaultLocale = 'en' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }, [])

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'fr' : 'en'
    setLocale(newLocale)
  }, [locale, setLocale])

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale] as typeof translations.en, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

export { locales }
