'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  index: number
  localeTexts?: { viewLive: string; code: string }
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  index,
  localeTexts = { viewLive: 'View Live', code: 'Code' },
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-dark-700 border border-white/5 hover:border-white/10 transition-all duration-500 focus-within:ring-2 focus-within:ring-accent-blue/30">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent z-10" />
          <Image
            src={image}
            alt={`${title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Desktop Hover overlay */}
          <div className="absolute inset-0 z-20 bg-dark-900/60 backdrop-blur-sm hidden md:flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={`View ${title} live project`}
              >
                <ExternalLink size={20} aria-hidden="true" />
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label={`View ${title} on GitHub`}
              >
                <Github size={20} aria-hidden="true" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
            {tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mobile action buttons - visible on touch devices */}
          <div className="flex gap-3 md:hidden">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              >
                <ExternalLink size={16} aria-hidden="true" />
                {localeTexts.viewLive}
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Github size={16} aria-hidden="true" />
                {localeTexts.code}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
