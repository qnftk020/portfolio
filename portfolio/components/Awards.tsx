import Section from './Section'
import { awards, exhibitions } from '@/lib/data'

export default function Awards() {
  return (
    <Section id="awards" title="Awards &amp; Recognition" className="bg-paper">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Awards list */}
        <div>
          <div className="space-y-0">
            {awards.map((award, i) => (
              <div
                key={i}
                className="group flex items-start gap-5 py-4 border-b border-border last:border-b-0"
              >
                <span className="font-mono text-[10px] text-muted tracking-wider mt-0.5 shrink-0 w-16">
                  {award.year}
                </span>
                <div>
                  <span className="font-serif text-lg font-medium text-ink block leading-tight group-hover:text-accent transition-colors">
                    {award.title}
                  </span>
                  <span className="font-sans text-sm text-ink/55 mt-0.5 block">
                    {award.event}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibitions */}
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-8">
            Exhibitions
          </span>
          <div className="space-y-0">
            {exhibitions.map((ex, i) => (
              <div
                key={i}
                className="py-4 border-b border-border last:border-b-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-serif text-base italic text-accent block">
                      {ex.work}
                    </span>
                    <span className="font-sans text-sm text-ink/70 mt-0.5 block">
                      {ex.venue}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted shrink-0">{ex.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Notable stat */}
          <div className="mt-12 p-6 border border-accent/20 bg-accent/5">
            <div className="font-serif text-5xl font-light text-accent mb-2">
              {awards.length}+
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-muted">
              Awards &amp; Honors
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
