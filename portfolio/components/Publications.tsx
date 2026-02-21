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
          {i < parts.length - 1 && (
            <span className="text-accent font-medium">{name}</span>
          )}
        </span>
      ))}
    </>
  )
}

export default function Publications() {
  return (
    <Section id="publications" title="Publications">
      {/* International */}
      <div className="mb-16">
        <h3 className="font-mono text-xs tracking-widest uppercase text-muted mb-8 flex items-center gap-4">
          International
          <span className="font-mono text-xs text-ink/30 normal-case tracking-normal">
            ({publicationsIntl.length})
          </span>
        </h3>

        <div className="space-y-0">
          {publicationsIntl.map((pub, i) => (
            <div
              key={i}
              className="group py-7 border-b border-border last:border-b-0 hover:pl-3 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Number */}
                  <span className="font-mono text-[10px] text-muted/50 mr-3">
                    [{String(publicationsIntl.length - i).padStart(2, '0')}]
                  </span>
                  {/* Title */}
                  <h4 className="font-serif text-lg font-medium text-ink leading-snug inline">
                    {pub.title}
                  </h4>

                  {/* Authors */}
                  <p className="font-sans text-sm text-ink/60 mt-2 leading-relaxed">
                    {highlightAuthor(pub.authors, pub.highlight)}
                  </p>

                  {/* Venue + badge */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="font-mono text-[11px] text-muted italic">{pub.venue}</span>
                    {pub.badge && (
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent tracking-wider">
                        {pub.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* DOI link */}
                {pub.doi && (
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-mono text-[11px] text-muted hover:text-accent transition-colors mt-1"
                    aria-label="DOI link"
                  >
                    DOI →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domestic */}
      <div>
        <h3 className="font-mono text-xs tracking-widest uppercase text-muted mb-8 flex items-center gap-4">
          Domestic (Korea)
          <span className="font-mono text-xs text-ink/30 normal-case tracking-normal">
            ({publicationsDomestic.length})
          </span>
        </h3>

        <div className="space-y-0">
          {publicationsDomestic.map((pub, i) => (
            <div
              key={i}
              className="group py-5 border-b border-border last:border-b-0 hover:pl-3 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h4 className="font-serif text-base font-medium text-ink leading-snug">
                    {pub.title}
                    {pub.badge && (
                      <span className="ml-2 font-mono text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent tracking-wider align-middle">
                        {pub.badge}
                      </span>
                    )}
                  </h4>
                  <p className="font-sans text-xs text-ink/50 mt-1">{pub.authors}</p>
                  <p className="font-mono text-[11px] text-muted italic mt-1">{pub.venue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
