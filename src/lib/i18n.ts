export const locales = ['en', 'fr'] as const
export type Locale = typeof locales[number]

export const translations = {
  en: {
    // Navbar
    nav: {
      work: 'Work',
      about: 'About',
      contact: 'Contact',
      letsTalk: "Let's Talk",
    },
    // Hero
    hero: {
      available: 'iOS Developer Freelance · Paris',
      title: 'Oussama Ouzin',
      subtitle: 'Full Stack · iOS · UI Designer',
      description: 'Full Stack Developer passionate about creating elegant digital experiences. Design thinking + AI Product Management — I don\'t just code, I advise strategically.',
      viewWork: 'View My Work',
      getInTouch: 'Get In Touch',
      scroll: 'Scroll',
    },
    // About
    about: {
      label: 'About Me',
      title: 'Strategic Developer',
      subtitle: '& Designer',
      bio1: '{years} years of experience building digital products with a unique hybrid profile: Masters in Finance & Marketing + consulting background + tech expertise.',
      bio2: 'I don\'t just code — I think strategically. My approach combines design thinking and AI Product Management with deep user empathy. I act as a strategic advisor, not just a developer.',
      skills: {
        fullstack: { title: 'Full Stack Development', description: 'React, Next.js, TypeScript, Node.js' },
        design: { title: 'UI/UX Design', description: 'Figma, Design Systems, User Empathy' },
        ios: { title: 'iOS Development', description: 'SwiftUI, Screen Time API, App Store' },
        advisory: { title: 'Strategic Advisory', description: 'Finance, Marketing, AI Product Management' },
      },
      cta: "Let's work together",
    },
    // Projects
    projects: {
      title: 'Featured Work',
      subtitle: 'A selection of projects that showcase my passion for creating impactful digital experiences.',
      viewLive: 'View Live',
      code: 'Code',
    },
    // Contact
    contact: {
      label: 'Contact',
      title: "Let's Create",
      subtitle: 'Something Amazing',
      description: 'Have an app idea? Tell me about your project. I\'ll respond within 24h.',
      email: 'ouzin.oussama@gmail.com',
      location: 'Paris, France · Remote / Hybrid',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project...',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully! I\'ll get back to you soon.',
        error: 'Something went wrong. Please try again.',
      },
    },
    // Footer
    footer: {
      copyright: '© {year} Oussama Ouzin · Paris',
    },
  },
  fr: {
    // Navbar
    nav: {
      work: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      letsTalk: 'Discutons',
    },
    // Hero
    hero: {
      available: 'Développeur iOS Freelance · Paris',
      title: 'Oussama Ouzin',
      subtitle: 'Full Stack · iOS · UI Designer',
      description: 'Développeur Full Stack passionné par la création d\'expériences digitales élégantes. Design thinking + AI Product Management — Je ne code pas seulement, je conseille stratégiquement.',
      viewWork: 'Voir mes projets',
      getInTouch: 'Me contacter',
      scroll: 'Défiler',
    },
    // About
    about: {
      label: 'À propos',
      title: 'Développeur Stratégique',
      subtitle: '& Designer',
      bio1: '{years} ans d\'expérience dans la création de produits digitaux avec un profil hybride unique : Masters en Finance & Marketing + conseil + expertise tech.',
      bio2: 'Je ne code pas seulement — je pense stratégiquement. Mon approche combine design thinking et AI Product Management avec une profonde empathie utilisateur. J\'agis en conseiller stratégique, pas seulement en développeur.',
      skills: {
        fullstack: { title: 'Développement Full Stack', description: 'React, Next.js, TypeScript, Node.js' },
        design: { title: 'Design UI/UX', description: 'Figma, Design Systems, Empathie Utilisateur' },
        ios: { title: 'Développement iOS', description: 'SwiftUI, Screen Time API, App Store' },
        advisory: { title: 'Conseil Stratégique', description: 'Finance, Marketing, AI Product Management' },
      },
      cta: 'Travaillons ensemble',
    },
    // Projects
    projects: {
      title: 'Projets Phares',
      subtitle: 'Une sélection de projets qui illustrent ma passion pour la création d\'expériences digitales à impact.',
      viewLive: 'Voir le projet',
      code: 'Code',
    },
    // Contact
    contact: {
      label: 'Contact',
      title: 'Créons',
      subtitle: 'Quelque chose d\'incroyable',
      description: 'Vous avez une idée d\'app ? Parlez-moi de votre projet. Je vous réponds sous 24h.',
      email: 'ouzin.oussama@gmail.com',
      location: 'Paris, France · Remote / Hybrid',
      form: {
        name: 'Nom',
        namePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'votre@email.com',
        message: 'Message',
        messagePlaceholder: 'Parlez-moi de votre projet...',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès ! Je vous répondrai bientôt.',
        error: 'Une erreur est survenue. Veuillez réessayer.',
      },
    },
    // Footer
    footer: {
      copyright: '© {year} Oussama Ouzin · Paris',
    },
  },
} as const

export type Translations = typeof translations.en

// Type-safe access to translations
type TranslationValue = string | { [key: string]: TranslationValue }
type TranslationKeys = keyof typeof translations.en

// Helper to get translation type for a specific locale
type LocaleTranslations<L extends Locale> = typeof translations[L]
