import { projects } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
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
}

const statusStyle: Record<string, { dot: string; label: string; badge: string }> = {
  'Done':        { dot: 'bg-ink/30',   label: 'Done',        badge: 'bg-ink/5 text-ink/40' },
  'In-progress': { dot: 'bg-accent',   label: 'In Progress', badge: 'bg-accent/10 text-accent' },
  'Not started': { dot: 'bg-muted/40', label: 'Not Started', badge: 'bg-muted/10 text-muted' },
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()

  const st = statusStyle[project.status] ?? statusStyle['Done']

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* 상단 네비 */}
      <div className="px-5 sm:px-8 md:px-12 py-6 border-b border-border">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* 본문 */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-24">

        {/* Status + 키워드 태그 */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide px-2 py-1 ${st.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
            {st.label}
          </span>
          {project.topic.map(t => (
            <span
              key={t}
              className={`font-mono text-[10px] tracking-wide px-2 py-1 ${topicColors[t] ?? 'bg-gray-100 text-gray-500'}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ink leading-tight mb-3">
          {project.title}
        </h1>

        {/* 연도 */}
        <p className="font-mono text-xs text-muted mb-12">{project.year}</p>

        {/* 이미지 */}
        <div className="aspect-video w-full bg-[#EDEBE7] overflow-hidden relative mb-12">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs tracking-widest text-muted uppercase">
                No image
              </span>
            </div>
          )}
        </div>

        {/* 설명 */}
        <div className="border-t border-border pt-10">
          {project.description ? (
            <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
              {project.description}
            </p>
          ) : (
            <p className="font-mono text-sm text-muted italic">
              Description coming soon.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
