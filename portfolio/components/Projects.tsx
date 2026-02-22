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
  'Virtual Reality':    'bg-cyan-50 text-cyan-600',
}

const statusStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'Done':        { dot: 'bg-[#4DAB9A]',               label: 'Done',        badge: 'bg-[#EDFAF5] text-[#4DAB9A]' },
  'In-progress': { dot: 'bg-[#4F93D0] animate-pulse', label: 'In Progress', badge: 'bg-[#EDF4FB] text-[#4F93D0]' },
  'Not started': { dot: 'bg-[#9B9B9B]',               label: 'Not Started', badge: 'bg-[#F5F5F5] text-[#9B9B9B]' },
}

const FEATURED_IDS = ['hyper-last-will', 'sophybara', 'minwon99', 'golden-capsule']

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const st = statusStyle[project.status] ?? statusStyle['Done']
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group text-left border border-border hover:border-ink/30 transition-all duration-200 block"
    >
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
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-1 mb-2">
          <span className={`inline-flex items-center gap-1 font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${st.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
            {st.label}
          </span>
          {project.topic.map(t => (
            <span key={t} className={`font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${topicColors[t] ?? 'bg-gray-100 text-gray-500'}`}>
              {t}
            </span>
          ))}
        </div>
        <p className="font-sans text-sm font-medium text-ink leading-snug mb-1 group-hover:text-accent transition-colors">
          {project.title}
        </p>
        <p className="font-mono text-[10px] text-muted">{project.year}</p>
      </div>
    </Link>
  )
}

export default function Projects() {
  const featured = FEATURED_IDS.map(id => projects.find(p => p.id === id)!).filter(Boolean)
  const rest = projects
    .filter(p => !FEATURED_IDS.includes(p.id))
    .sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink mb-10 sm:mb-14">
        Projects
      </h2>

      {/* Featured Projects */}
      <div className="mb-4 sm:mb-5">
        <span className="font-mono text-[13px] tracking-widest uppercase text-muted block mb-4">
          Featured
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featured.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-border my-8 sm:my-10" />

      {/* All Projects */}
      <div>
        <span className="font-mono text-[13px] tracking-widest uppercase text-muted block mb-4">
          All
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rest.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
