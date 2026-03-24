import type { Metadata } from 'next'
import './globals.css'
import { LocaleProvider } from '@/context/LocaleContext'

export const metadata: Metadata = {
  title: 'Oussama Ouzin | Full Stack & iOS Developer',
  description: 'Full Stack Developer passionate about creating elegant digital experiences. iOS, React, Next.js, UI/UX Design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider defaultLocale="fr">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
