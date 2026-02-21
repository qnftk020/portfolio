'use client'

import { useState } from 'react'
import Section from './Section'
import { awards, exhibitions } from '@/lib/data'

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

function YearAccordion({
  year,
  count,
  defaultOpen,
  children,
}: {
  year: string
  count: number
  defaultOpen: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 group"
      >
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl font-light text-ink group-hover:text-accent transition-colors">
            {year}
          </span>
          <span className="font-mono text-xs text-muted">
            {count} award{count > 1 ? 's' : ''}
          </span>
        </div>
        <span
          className={`font-mono text-muted text-lg transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

export default function Awards() {
  const grouped = groupAwardsByYear(awards)

  return (
    <Section id="awards" title="Awards &amp; Recognition" className="bg-paper">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Awards accordion */}
        <div>
          {grouped.map(({ year, list }, i) => (
            <YearAccordion key={year} year={year} count={list.length} defaultOpen={i === 0}>
              {list.map((award, j) => (
                <div
                  key={j}
                  className="group flex items-start gap-5 py-3 border-b border-border/50 last:border-b-0"
                >
                  <span className="font-mono text-[10px] text-muted tracking-wider mt-0.5 shrink-0 w-14">
                    {award.year.slice(5)}
                  </span>
                  <div>
                    <span className="font-serif text-base font-medium text-ink block leading-tight group-hover:text-accent transition-colors">
                      {award.title}
                    </span>
                    <span className="font-sans text-sm text-ink/55 mt-0.5 block">
                      {award.event}
                    </span>
                  </div>
                </div>
              ))}
            </YearAccordion>
          ))}
        </div>

        {/* Exhibitions */}
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-6">
            Exhibitions
          </span>
          <div className="space-y-0">
            {exhibitions.map((ex, i) => (
              <div key={i} className="py-4 border-b border-border last:border-b-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-serif text-base italic text-accent block">{ex.work}</span>
                    <span className="font-sans text-sm text-ink/70 mt-0.5 block">{ex.venue}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted shrink-0">{ex.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
