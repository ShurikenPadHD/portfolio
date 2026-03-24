'use client'

import ProjectCard from './ProjectCard'
import { useLocale } from '@/context/LocaleContext'

const projects = [
  {
    title: 'Sleep Shield',
    description: 'App de protection du sommeil. Calcule les cycles de sommeil idéaux, bloque les distractions automatiquement, et intègre des soundscapes pour s\'endormir.',
    image: '/images/projects/sleep-shield.png',
    tags: ['SwiftUI', 'Screen Time API', 'AVFoundation', 'Background Tasks', 'Superwall', 'PostHog'],
    liveUrl: 'https://apps.apple.com/us/app/sleep-shield-block-rest/id6758320072',
    githubUrl: '#',
  },
  {
    title: 'Anima',
    description: 'Compagnon vocal AI pour la santé mentale. Conversations vocales, analyse émotionnelle, suivi de progression et insights cognitifs personnalisés.',
    image: '/images/projects/anima.png',
    tags: ['SwiftUI', 'OpenAI Whisper', 'Hume AI', 'Claude API', 'Supabase', 'Core Data', 'CloudKit'],
    liveUrl: 'https://app.useanima.com',
    githubUrl: '#',
  },
]

export default function Projects() {
  const { t } = useLocale()
  
  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} localeTexts={{ viewLive: t.projects.viewLive, code: t.projects.code }} />
          ))}
        </div>
      </div>
    </section>
  )
}
