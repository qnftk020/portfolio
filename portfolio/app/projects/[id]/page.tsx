import projects, { Project, ContentBlock } from '@/data/projects'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// notion-projects.json 이 비어있을 때를 위한 fallback slugs
const FALLBACK_SLUGS = [
  'hyper-last-will', 'sophybara', 'golden-capsule', 'minwon-99',
  'paw-pulse', 'jumanji-ar', 'see-the-music', 'doccia',
  'rolling-pizza', 'conference-ar', 'gyroscope-kickboard',
]

export async function generateStaticParams() {
  const slugs = projects.length > 0
    ? projects.map(p => p.slug)
    : FALLBACK_SLUGS
  return slugs.map(id => ({ id }))
}

const topicColors: Record<string, string> = {
  'Mixed Reality':      'bg-gray-100 text-gray-500',
  'Media Art':          'bg-violet-50 text-violet-600',
  'Mobility Design':    'bg-red-50 text-red-600',
  'LLM':               'bg-orange-50 text-orange-600',
  'Multi-agent':        'bg-orange-50 text-orange-700',
  'User Experience':    'bg-yellow-50 text-yellow-600',
  'Ergonomics':         'bg-blue-50 text-blue-600',
  'CAE':               'bg-gray-100 text-gray-500',
  'Product Design':     'bg-pink-50 text-pink-600',
  'Experiment Design':  'bg-purple-50 text-purple-600',
  'Game':              'bg-yellow-50 text-yellow-600',
  'Augmented Reality':  'bg-green-50 text-green-600',
  'Service Design':     'bg-green-50 text-green-700',
  'Hackathon':          'bg-gray-100 text-gray-500',
  'Philosophy':         'bg-indigo-50 text-indigo-600',
  'Virtual Reality':    'bg-cyan-50 text-cyan-600',
}

const statusStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'Done':        { dot: 'bg-[#4DAB9A]',               label: 'Done',        badge: 'bg-[#EDFAF5] text-[#4DAB9A]' },
  'In-progress': { dot: 'bg-[#4F93D0] animate-pulse', label: 'In Progress', badge: 'bg-[#EDF4FB] text-[#4F93D0]' },
  'Not started': { dot: 'bg-[#9B9B9B]',               label: 'Not Started', badge: 'bg-[#F5F5F5] text-[#9B9B9B]' },
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === 'heading') {
    const cls = block.level === 1
      ? 'font-serif text-2xl sm:text-3xl font-light text-ink mt-10 mb-3'
      : block.level === 2
      ? 'font-serif text-xl sm:text-2xl font-light text-ink mt-8 mb-2'
      : 'font-sans text-base font-semibold text-ink mt-6 mb-1 uppercase tracking-wider'
    return <h2 className={cls}>{block.text}</h2>
  }

  if (block.type === 'text') {
    return (
      <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed whitespace-pre-wrap">
        {block.text}
      </p>
    )
  }

  if (block.type === 'image') {
    return (
      <figure className="w-full">
        <div className="relative w-full aspect-video bg-[#EDEBE7] overflow-hidden">
          <Image src={block.url} alt={block.caption ?? ''} fill className="object-cover" unoptimized />
        </div>
        {block.caption && (
          <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block.type === 'video') {
    return (
      <figure className="w-full">
        <video src={block.url} controls className="w-full aspect-video bg-black" />
        {block.caption && (
          <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block.type === 'youtube') {
    return (
      <figure className="w-full">
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${block.videoId}`}
            title={block.caption ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">
            {block.caption}
          </figcaption>
        )}
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
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors"
        >
          <span>←</span><span>Back to Projects</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-24">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide px-2 py-1 ${st.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
            {st.label}
          </span>
          {(project.topic ?? []).map(t => (
            <span key={t} className={`font-mono text-[10px] tracking-wide px-2 py-1 ${topicColors[t] ?? 'bg-gray-100 text-gray-500'}`}>
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink leading-tight mb-3">
          {project.title}
        </h1>
        <p className="font-mono text-xs text-muted mb-2">{project.year}</p>
        {project.authors && (
          <p className="font-mono text-xs text-muted mb-2">{project.authors}</p>
        )}
        {project.paper && (
          <a
            href={project.paper}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-xs text-muted underline underline-offset-2 hover:text-ink mb-6"
          >
            View Paper / Link →
          </a>
        )}

        {/* Cover */}
        {project.coverUrl && (
          <div className="aspect-video w-full bg-[#EDEBE7] overflow-hidden relative mb-16">
            <Image src={project.coverUrl} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}

        {/* Content */}
        <div className="border-t border-border pt-10 flex flex-col gap-8">
          {project.content.length > 0
            ? project.content.map((b, i) => <Block key={i} block={b} />)
            : <p className="font-sans text-base text-muted">Content coming soon.</p>
          }
        </div>
      </div>
    </main>
  )
}
