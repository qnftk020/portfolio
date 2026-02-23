import projects, { Project, ContentBlock } from '@/data/projects'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return projects.map(p => ({ id: p.slug }))
}

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

function Block({ block }: { block: ContentBlock }) {
  if (block.type === 'text') {
    return <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed whitespace-pre-wrap">{block.text}</p>
  }
  if (block.type === 'image') {
    return (
      <figure className="w-full">
        <div className="relative w-full aspect-video bg-[#1C1C1A] overflow-hidden">
          <Image src={block.url} alt={block.caption ?? ''} fill className="object-cover" unoptimized />
        </div>
        {block.caption && <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'video') {
    return (
      <figure className="w-full">
        <video src={block.url} controls className="w-full aspect-video bg-black" />
        {block.caption && <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">{block.caption}</figcaption>}
      </figure>
    )
  }
  return null
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.slug === params.id)
  if (!project) notFound()
  const st = statusStyle[project.status] ?? statusStyle['Done']

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="px-5 sm:px-8 md:px-12 py-6 border-b border-border">
        <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors">
          <span>←</span><span>Back to Projects</span>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-24">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide px-2 py-1 ${st.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
            {st.label}
          </span>
          {(project.topic ?? []).map(t => (
            <span key={t} className={`font-mono text-[10px] tracking-wide px-2 py-1 ${topicColors[t] ?? 'bg-gray-800 text-gray-300'}`}>{t}</span>
          ))}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink leading-tight mb-3">{project.title}</h1>
        <p className="font-mono text-xs text-muted mb-12">{project.year}</p>
        {project.coverUrl && (
          <div className="aspect-video w-full bg-[#1C1C1A] overflow-hidden relative mb-16">
            <Image src={project.coverUrl} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="border-t border-border pt-10 flex flex-col gap-8">
          {project.content.map((b, i) => <Block key={i} block={b} />)}
        </div>
      </div>
    </main>
  )
}
