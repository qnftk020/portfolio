'use client'

import { useState } from 'react'
import Section from './Section'
import { publicationsIntl, publicationsDomestic } from '@/lib/data'

function highlightAuthor(authors: string, name: string) {
  const parts = authors.split(name)
  if (parts.length === 1) return <span>{authors}</span>
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-accent font-medium">{name}</span>}
        </span>
      ))}
    </>
  )
}

function groupByYear<T extends { year: number }>(items: T[]) {
  const map: Record<number, T[]> = {}
  for (const item of items) {
    if (!map[item.year]) map[item.year] = []
    map[item.year].push(item)
  }
  return Object.entries(map)
    .map(([year, pubs]) => ({ year: Number(year), pubs }))
    .sort((a, b) => b.year - a.year)
}

function YearAccordion({
  year,
  count,
  defaultOpen,
  children,
}: {
  year: number
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
            {count} paper{count > 1 ? 's' : ''}
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

function IntlPubItem({
  pub,
  index,
}: {
  pub: (typeof publicationsIntl)[0]
  index: number
}) {
  return (
    <div className="group py-5 border-b border-border/50 last:border-b-0 hover:pl-3 transition-all duration-200">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <span className="font-mono text-[10px] text-muted/50 mr-2">[{String(index).padStart(2, '0')}]</span>
          <h4 className="font-serif text-lg font-medium text-ink leading-snug inline">
            {pub.title}
          </h4>
          <p className="font-sans text-sm text-ink/60 mt-2 leading-relaxed">
            {highlightAuthor(pub.authors, pub.highlight)}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="font-mono text-xs text-muted italic">{pub.venue}</span>
            {pub.badge && (
              <span className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent tracking-wider">
                {pub.badge}
              </span>
            )}
          </div>
        </div>
        {pub.doi && (
          <a
            href={pub.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 border border-ink/20 font-mono text-xs text-ink hover:border-accent hover:text-accent transition-all duration-200 whitespace-nowrap mt-1"
          >
            DOI →
          </a>
        )}
      </div>
    </div>
  )
}

function DomesticPubItem({ pub }: { pub: (typeof publicationsDomestic)[0] }) {
  return (
    <div className="py-4 border-b border-border/50 last:border-b-0 hover:pl-3 transition-all duration-200">
      <h4 className="font-serif text-base font-medium text-ink leading-snug">
        {pub.title}
        {pub.badge && (
          <span className="ml-2 font-mono text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent tracking-wider align-middle">
            {pub.badge}
          </span>
        )}
      </h4>
      <p className="font-sans text-xs text-ink/50 mt-1">{pub.authors}</p>
      <p className="font-mono text-xs text-muted italic mt-1">{pub.venue}</p>
    </div>
  )
}

export default function Publications() {
  const intlByYear = groupByYear(publicationsIntl)
  const domesticByYear = groupByYear(publicationsDomestic)

  let intlCounter = publicationsIntl.length

  return (
    <Section id="publications" title="Publications">
      {/* International */}
      <div className="mb-16">
        <h3 className="font-mono text-xs tracking-widest uppercase text-muted mb-6 flex items-center gap-4">
          International
          <span className="font-mono text-xs text-ink/30 normal-case tracking-normal">
            ({publicationsIntl.length})
          </span>
        </h3>

        <div>
          {intlByYear.map(({ year, pubs }, gi) => {
            const startIndex = intlCounter
            intlCounter -= pubs.length
            return (
              <YearAccordion key={year} year={year} count={pubs.length} defaultOpen={gi === 0}>
                {pubs.map((pub, i) => (
                  <IntlPubItem key={i} pub={pub} index={startIndex - i} />
                ))}
              </YearAccordion>
            )
          })}
        </div>
      </div>

      {/* Domestic */}
      <div>
        <h3 className="font-mono text-xs tracking-widest uppercase text-muted mb-6 flex items-center gap-4">
          Domestic (Korea)
          <span className="font-mono text-xs text-ink/30 normal-case tracking-normal">
            ({publicationsDomestic.length})
          </span>
        </h3>

        <div>
          {domesticByYear.map(({ year, pubs }, gi) => (
            <YearAccordion key={year} year={year} count={pubs.length} defaultOpen={gi === 0}>
              {pubs.map((pub, i) => (
                <DomesticPubItem key={i} pub={pub} />
              ))}
            </YearAccordion>
          ))}
        </div>
      </div>
    </Section>
  )
}
