import { featuredProjects, allProjects, Project } from '@/data/projects'
import Image from 'next/image'
import Link from 'next/link'

const topicColors: Record<string, string> = {
  'Mixed Reality':      'bg-white/5 text-white/40',
  'Media Art':          'bg-fuchsia-500/10 text-fuchsia-400',
  'Mobility Design':    'bg-red-500/10 text-red-400',
  'LLM':               'bg-orange-500/10 text-orange-400',
  'Multi-agent':        'bg-orange-500/10 text-orange-300',
  'User Experience':    'bg-yellow-500/10 text-yellow-400',
  'Ergonomics':         'bg-blue-500/10 text-blue-400',
  'CAE':               'bg-white/5 text-white/40',
  'Product Design':     'bg-pink-500/10 text-pink-400',
  'Experiment Design':  'bg-purple-500/10 text-purple-400',
  'Game':              'bg-yellow-500/10 text-yellow-400',
  'Augmented Reality':  'bg-green-500/10 text-green-400',
  'Service Design':     'bg-emerald-500/10 text-emerald-300',
  'Hackathon':          'bg-white/5 text-white/40',
  'Philosophy':         'bg-indigo-500/10 text-indigo-400',
  'Virtual Reality':    'bg-sky-500/10 text-sky-400',
}

const statusStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'Done':        { dot: 'bg-[#4DAB9A]',               label: 'Done',        badge: 'bg-[#4DAB9A]/10 text-[#4DAB9A]' },
  'In-progress': { dot: 'bg-[#4F93D0] animate-pulse', label: 'In Progress', badge: 'bg-[#4F93D0]/10 text-[#4F93D0]' },
  'Not started': { dot: 'bg-white/20',                label: 'Not Started', badge: 'bg-white/5 text-white/30' },
}

function ProjectCard({ project }: { project: Project }) {
  const st = statusStyle[project.status] ?? statusStyle['Done']
  return (
    <Link href={`/projects/${project.slug}`} className="group text-left border border-[#1F1F1D] hover:border-white/15 transition-all duration-200 block bg-[#111110]">
      <div className="aspect-square w-full bg-[#161614] overflow-hidden relative">
        {project.coverUrl ? (
          <Image src={project.coverUrl} alt={project.title} fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-90 group-hover:opacity-100" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-1 mb-2.5">
          <span className={`inline-flex items-center gap-1 font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${st.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
            {st.label}
          </span>
          {(project.topic ?? []).map(t => (
            <span key={t} className={`font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${topicColors[t] ?? 'bg-white/5 text-white/40'}`}>{t}</span>
          ))}
        </div>
        <p className="font-mono text-xs text-ink/80 leading-snug mb-1.5 group-hover:text-accent transition-colors">{project.title}</p>
        <p className="font-mono text-[10px] text-muted">{project.year}</p>
      </div>
    </Link>
  )
}

export default function Projects() {
  // All 섹션에서 Featured 항목 제외
  const onlyAll = allProjects.filter(p => !featuredProjects.find(f => f.slug === p.slug))

  return (
    <section id="projects" className="py-14 sm:py-20 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink mb-8 sm:mb-12">Projects</h2>
      <div className="mb-4">
        <span className="font-mono text-[11px] tracking-widest uppercase text-muted block mb-4">Featured</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {featuredProjects.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
      <hr className="border-[#1F1F1D] my-7 sm:my-9" />
      <div>
        <span className="font-mono text-[11px] tracking-widest uppercase text-muted block mb-4">All</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {onlyAll.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
    </section>
  )
}
