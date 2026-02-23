import { getProjectBySlug, getProjectBlocks, getAllSlugs, Project, ProjectBlock } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ id: slug }))
}

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

function Block({ block }: { block: ProjectBlock }) {
  if (block.type === 'text') {
    return <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed whitespace-pre-wrap">{block.content}</p>
  }
  if (block.type === 'image') {
    return (
      <figure className="w-full">
        <div className="relative w-full aspect-video bg-[#EDEBE7] overflow-hidden">
          <Image src={block.content} alt={block.caption ?? ''} fill className="object-cover" unoptimized />
        </div>
        {block.caption && <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'video') {
    return (
      <figure className="w-full">
        <video src={block.content} controls className="w-full aspect-video bg-black" />
        {block.caption && <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">{block.caption}</figcaption>}
      </figure>
    )
  }
  return null
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectBySlug(params.id)
  if (!project) notFound()

  const blocks = await getProjectBlocks(project.id)
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
            <span key={t} className={`font-mono text-[10px] tracking-wide px-2 py-1 ${topicColors[t] ?? 'bg-gray-100 text-gray-500'}`}>{t}</span>
          ))}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink leading-tight mb-3">{project.title}</h1>
        <p className="font-mono text-xs text-muted mb-12">{project.year}</p>
        {project.cover_url && (
          <div className="aspect-video w-full bg-[#EDEBE7] overflow-hidden relative mb-16">
            <Image src={project.cover_url} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="border-t border-border pt-10 flex flex-col gap-8">
          {blocks.length > 0 ? (
            blocks.map((b) => <Block key={b.id} block={b} />)
          ) : (
            <p className="font-mono text-sm text-muted italic">Description coming soon.</p>
          )}
        </div>
      </div>
    </main>
  )
}
