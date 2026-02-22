'use client'

import { projects } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

const topicColors: Record<string, string> = {
  'Mixed Reality':      'bg-gray-100 text-gray-600',
  'Media Art':          'bg-violet-50 text-violet-600',
  'Mobility Design':    'bg-red-50 text-red-600',
  'LLM':               'bg-orange-50 text-orange-600',
  'Multi-agent':        'bg-orange-50 text-orange-700',
  'User Experience':    'bg-yellow-50 text-yellow-700',
  'Ergonomics':         'bg-blue-50 text-blue-600',
  'CAE':               'bg-gray-100 text-gray-600',
  'Product Design':     'bg-pink-50 text-pink-600',
  'Experiment Design':  'bg-purple-50 text-purple-600',
  'Game':              'bg-yellow-50 text-yellow-600',
  'Augmented Reality':  'bg-green-50 text-green-600',
  'Service Design':     'bg-green-50 text-green-700',
  'Hackathon':          'bg-gray-100 text-gray-600',
  'Philosophy':         'bg-indigo-50 text-indigo-600',
}

const statusStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'Done':        { dot: 'bg-ink/30',   label: 'Done',        badge: 'bg-ink/5 text-ink/40' },
  'In-progress': { dot: 'bg-accent animate-pulse', label: 'In Progress', badge: 'bg-accent/10 text-accent' },
  'Not started': { dot: 'bg-muted/40', label: 'Not Started', badge: 'bg-muted/10 text-muted' },
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink mb-10 sm:mb-14">
        Projects
      </h2>

      {/* Grid — 1 col mobile, 3 col desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((project) => {
          const st = statusStyle[project.status] ?? statusStyle['Done']
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group text-left border border-border hover:border-ink/30 transition-all duration-200 block"
            >
              {/* 1:1 정사각형 이미지 */}
              <div className="aspect-square w-full bg-[#EDEBE7] overflow-hidden relative">
                {project.cover ? (
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
                      No image
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-4">
                {/* Status + Topics row */}
                <div className="flex flex-wrap items-center gap-1 mb-2">
                  {/* Status badge */}
                  <span className={`inline-flex items-center gap-1 font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${st.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
                    {st.label}
                  </span>
                  {/* Topic tags */}
                  {project.topic.map(t => (
                    <span
                      key={t}
                      className={`font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${topicColors[t] ?? 'bg-gray-100 text-gray-500'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <p className="font-sans text-sm font-medium text-ink leading-snug mb-1 group-hover:text-accent transition-colors">
                  {project.title}
                </p>

                {/* Year */}
                <p className="font-mono text-[10px] text-muted">{project.year}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
