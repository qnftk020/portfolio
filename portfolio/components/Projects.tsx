import projects, { featuredProjects, allProjects, Project } from '@/data/projects'
import Image from 'next/image'
import Link from 'next/link'

const topicColors: Record<string, string> = {
  'Mixed Reality':      'bg-gray-800 text-gray-300',
  'Media Art':          'bg-violet-900 text-violet-300',
  'Mobility Design':    'bg-red-900 text-red-300',
  'LLM':               'bg-orange-900 text-orange-300',
  'Multi-agent':        'bg-orange-900 text-orange-200',
  'User Experience':    'bg-yellow-900 text-yellow-300',
  'Ergonomics':         'bg-blue-900 text-blue-300',
  'CAE':               'bg-gray-800 text-gray-300',
  'Product Design':     'bg-pink-900 text-pink-300',
  'Experiment Design':  'bg-purple-900 text-purple-300',
  'Game':              'bg-yellow-900 text-yellow-300',
  'Augmented Reality':  'bg-green-900 text-green-300',
  'Service Design':     'bg-green-900 text-green-200',
  'Hackathon':          'bg-gray-800 text-gray-300',
  'Philosophy':         'bg-indigo-900 text-indigo-300',
  'Virtual Reality':    'bg-cyan-900 text-cyan-300',
}

const statusStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'Done':        { dot: 'bg-[#4DAB9A]',               label: 'Done',        badge: 'bg-[#0D2420] text-[#4DAB9A]' },
  'In-progress': { dot: 'bg-[#4F93D0] animate-pulse', label: 'In Progress', badge: 'bg-[#0D1A2A] text-[#4F93D0]' },
  'Not started': { dot: 'bg-[#9B9B9B]',               label: 'Not Started', badge: 'bg-[#1E1E1C] text-[#9B9B9B]' },
}

function ProjectCard({ project }: { project: Project }) {
  const st = statusStyle[project.status] ?? statusStyle['Done']
  return (
    <Link href={`/projects/${project.slug}`} className="group text-left border border-border hover:border-ink/30 transition-all duration-200 block">
      <div className="aspect-square w-full bg-[#1C1C1A] overflow-hidden relative">
        {project.coverUrl ? (
          <Image src={project.coverUrl} alt={project.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" unoptimized />
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
          {(project.topic ?? []).map(t => (
            <span key={t} className={`font-mono text-[9px] tracking-wide px-1.5 py-0.5 ${topicColors[t] ?? 'bg-gray-800 text-gray-300'}`}>{t}</span>
          ))}
        </div>
        <p className="font-sans text-sm font-medium text-ink leading-snug mb-1 group-hover:text-accent transition-colors">{project.title}</p>
        <p className="font-mono text-[10px] text-muted">{project.year}</p>
      </div>
    </Link>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink mb-10 sm:mb-14">Projects</h2>
      <div className="mb-4 sm:mb-5">
        <span className="font-mono text-[13px] tracking-widest uppercase text-muted block mb-4">Featured</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featuredProjects.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
      <hr className="border-border my-8 sm:my-10" />
      <div>
        <span className="font-mono text-[13px] tracking-widest uppercase text-muted block mb-4">All</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {allProjects.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
    </section>
  )
}
