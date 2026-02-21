'use client'

import { projects } from '@/lib/data'
import Image from 'next/image'
import { useState } from 'react'

const topicColors: Record<string, string> = {
  'Mixed Reality': 'bg-gray-100 text-gray-600',
  'Media Art': 'bg-violet-50 text-violet-600',
  'Mobility Design': 'bg-red-50 text-red-600',
  'LLM': 'bg-orange-50 text-orange-600',
  'Multi-agent': 'bg-orange-50 text-orange-700',
  'User Experience': 'bg-yellow-50 text-yellow-700',
  'Ergonomics': 'bg-blue-50 text-blue-600',
  'CAE': 'bg-gray-100 text-gray-600',
  'Product Design': 'bg-pink-50 text-pink-600',
  'Experiment Design': 'bg-purple-50 text-purple-600',
  'Game': 'bg-yellow-50 text-yellow-600',
  'Augmented Reality': 'bg-green-50 text-green-600',
  'Service Design': 'bg-green-50 text-green-700',
  'Hackathon': 'bg-gray-100 text-gray-600',
  'Philosophy': 'bg-indigo-50 text-indigo-600',
}

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedProject = projects.find(p => p.id === selected)

  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-10 sm:mb-14">
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted">04</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink">Projects</h2>
      </div>

      {/* Grid — 1 col mobile, 3 col desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected(selected === project.id ? null : project.id)}
            className={`group text-left border transition-all duration-200 ${
              selected === project.id
                ? 'border-accent'
                : 'border-border hover:border-ink/30'
            }`}
          >
            {/* Cover image or placeholder */}
            <div className="aspect-[4/3] w-full bg-paper-dark overflow-hidden relative">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-mono text-[10px] tracking-widest text-muted uppercase">No image</span>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-4">
              {/* Topics */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.topic.map(t => (
                  <span
                    key={t}
                    className={`font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${topicColors[t] ?? 'bg-gray-100 text-gray-500'}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title + year */}
              <p className="font-sans text-sm font-medium text-ink leading-snug mb-1">
                {project.title}
              </p>
              <p className="font-mono text-[10px] text-muted">{project.year}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selectedProject && (
        <div className="mt-5 border border-accent p-6 sm:p-8 animate-fade-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-serif text-xl font-light text-ink mb-1">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-[10px] text-muted">{selectedProject.year}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="font-mono text-xs text-muted hover:text-ink transition-colors ml-4 shrink-0"
            >
              ✕ close
            </button>
          </div>
          {selectedProject.description ? (
            <p className="font-sans text-sm text-ink/80 leading-relaxed">
              {selectedProject.description}
            </p>
          ) : (
            <p className="font-mono text-[11px] text-muted italic">No description yet.</p>
          )}
        </div>
      )}
    </section>
  )
}
