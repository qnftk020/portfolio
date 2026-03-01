'use client'

import { useState } from 'react'
import Section from './Section'
import { awards } from '@/lib/data'

function groupAwardsByYear(items: typeof awards) {
  const map: Record<string, typeof awards> = {}
  for (const item of items) {
    const y = item.year.slice(0, 4)
    if (!map[y]) map[y] = []
    map[y].push(item)
  }
  return Object.entries(map)
    .map(([year, list]) => ({ year, list }))
    .sort((a, b) => Number(b.year) - Number(a.year))
}

function YearAccordion({ year, count, defaultOpen, children }: {
  year: string; count: number; defaultOpen: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#1F1F1D] last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 group" aria-expanded={open}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl sm:text-3xl font-light text-ink group-hover:text-accent transition-colors">{year}</span>
          <span className="font-mono text-[10px] text-muted tracking-wide">{count} award{count > 1 ? 's' : ''}</span>
        </div>
        <span className={`font-mono text-muted text-xl transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

export default function Awards() {
  const grouped = groupAwardsByYear(awards)
  return (
    <Section id="awards" title="Awards & Recognition">
      <div className="max-w-2xl">
        {grouped.map(({ year, list }, i) => (
          <YearAccordion key={year} year={year} count={list.length} defaultOpen={i === 0}>
            {list.map((award, j) => (
              <div key={j} className="group flex items-start gap-4 sm:gap-6 py-3 border-b border-[#1F1F1D]/50 last:border-b-0">
                <span className="font-mono text-[10px] text-muted tracking-wider mt-0.5 shrink-0 w-10">
                  {award.year.slice(5)}
                </span>
                <div>
                  <span className="font-mono text-sm text-ink block leading-snug group-hover:text-accent transition-colors">
                    {award.title}
                  </span>
                  <span className="font-mono text-[11px] text-ink/40 mt-1 block">{award.event}</span>
                </div>
              </div>
            ))}
          </YearAccordion>
        ))}
      </div>
    </Section>
  )
}
