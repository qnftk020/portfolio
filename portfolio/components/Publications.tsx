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
          {i < parts.length - 1 && <span className="text-accent font-bold">{name}</span>}
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

function YearAccordion({ year, count, defaultOpen, children }: {
  year: number; count: number; defaultOpen: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#1F1F1D] last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 group" aria-expanded={open}>
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl sm:text-3xl font-light text-ink group-hover:text-accent transition-colors">{year}</span>
          <span className="font-mono text-[10px] text-muted tracking-wide">{count} paper{count > 1 ? 's' : ''}</span>
        </div>
        <span className={`font-mono text-muted text-xl transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <div className="pb-4">{children}</div>}
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
      <div className="mb-12">
        <h3 className="font-mono text-[11px] tracking-widest uppercase text-muted mb-6 flex items-center gap-3">
          International
          <span className="text-ink/25 normal-case tracking-normal">({publicationsIntl.length})</span>
        </h3>
        <div>
          {intlByYear.map(({ year, pubs }, gi) => {
            const startIndex = intlCounter
            intlCounter -= pubs.length
            return (
              <YearAccordion key={year} year={year} count={pubs.length} defaultOpen={gi === 0}>
                {pubs.map((pub, i) => (
                  <div key={i} className="group py-5 border-b border-[#1F1F1D]/50 last:border-b-0 hover:pl-2 sm:hover:pl-3 transition-all duration-200">
                    <div className="flex items-start justify-between gap-4 sm:gap-6">
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] text-muted/50 mr-2">[{String(startIndex - i).padStart(2, '0')}]</span>
                        <h4 className="font-mono text-sm text-ink leading-snug inline">{pub.title}</h4>
                        <p className="font-mono text-[11px] text-ink/45 mt-2 leading-loose">
                          {highlightAuthor(pub.authors, pub.highlight)}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                          <span className="font-mono text-[11px] text-ink/80">{pub.venue}</span>
                          {pub.badge && (
                            <span className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent tracking-wider">{pub.badge}</span>
                          )}
                        </div>
                      </div>
                      {pub.doi && (
                        <a href={pub.doi} target="_blank" rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 border border-ink/20 font-mono text-xs text-ink hover:border-accent hover:text-accent transition-all duration-200 whitespace-nowrap mt-1">
                          DOI →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </YearAccordion>
            )
          })}
        </div>
      </div>

      {/* Domestic */}
      <div>
        <h3 className="font-mono text-[11px] tracking-widest uppercase text-muted mb-6 flex items-center gap-3">
          Domestic (Korea)
          <span className="text-ink/25 normal-case tracking-normal">({publicationsDomestic.length})</span>
        </h3>
        <div>
          {domesticByYear.map(({ year, pubs }, gi) => (
            <YearAccordion key={year} year={year} count={pubs.length} defaultOpen={gi === 0}>
              {pubs.map((pub, i) => (
                <div key={i} className="py-4 border-b border-[#1F1F1D]/50 last:border-b-0 hover:pl-2 sm:hover:pl-3 transition-all duration-200">
                  <h4 className="font-mono text-sm text-ink leading-snug">
                    {pub.title}
                    {pub.badge && (
                      <span className="ml-2 font-mono text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent tracking-wider align-middle">{pub.badge}</span>
                    )}
                  </h4>
                  <p className="font-mono text-[11px] text-ink/45 mt-1.5 leading-loose">
                    {highlightAuthor(pub.authors, 'Yeonghwan Shin')}
                  </p>
                  <p className="font-mono text-[11px] text-ink/75 mt-1">{pub.venue}</p>
                </div>
              ))}
            </YearAccordion>
          ))}
        </div>
      </div>
    </Section>
  )
}
