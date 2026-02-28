'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ContentBlock } from '@/data/projects'

function InnerBlock({ block }: { block: ContentBlock }) {
  if (block.type === 'heading') {
    const cls = block.level === 1
      ? 'font-serif text-2xl font-light text-ink mt-6 mb-2'
      : block.level === 2
      ? 'font-serif text-xl font-light text-ink mt-5 mb-2'
      : 'font-sans text-sm font-semibold text-ink/60 mt-4 mb-1 uppercase tracking-widest'
    return <h3 className={cls}>{block.text}</h3>
  }
  if (block.type === 'text') {
    return <p className="font-sans text-base text-ink/65 leading-relaxed whitespace-pre-wrap">{block.text}</p>
  }
  if (block.type === 'image') {
    return (
      <figure className="w-full">
        <div className="relative w-full aspect-video bg-[#141413] overflow-hidden">
          <Image src={block.url} alt={block.caption ?? ''} fill className="object-cover" unoptimized />
        </div>
        {block.caption && <figcaption className="mt-2 font-mono text-[10px] text-muted text-center">{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'youtube') {
    return (
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${block.videoId}`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }
  if (block.type === 'toggle') {
    return <ToggleBlock title={block.title} children={block.children} />
  }
  return null
}

export default function ToggleBlock({ title, children }: { title: string; children: ContentBlock[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-[#1F1F1D] rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-sans text-base text-ink/80">{title}</span>
        <span className={`font-mono text-muted text-lg transition-transform duration-200 ml-4 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-4 border-t border-[#1F1F1D]">
          {children.map((b, i) => <InnerBlock key={i} block={b} />)}
        </div>
      )}
    </div>
  )
}
