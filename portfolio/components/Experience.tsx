import Section from './Section'
import { experiences } from '@/lib/data'

export default function Experience() {
  return (
    <Section id="experience" title="Working Experience" className="bg-ink">
      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div key={i} className="group grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-8 md:gap-12 py-7 sm:py-8 border-b border-white/10 last:border-b-0 hover:border-white/20 transition-colors">
            {/* Period */}
            <div className="shrink-0">
              <span className="font-mono text-[11px] tracking-wider text-white/40 block leading-relaxed">
                {exp.period}
              </span>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-[10px] text-accent tracking-wider">Current</span>
                </span>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-white leading-tight">{exp.role}</h3>
                <span className="font-mono text-xs text-white/40">@</span>
                <span className="font-serif text-lg sm:text-xl italic font-bold text-accent/80 leading-tight">{exp.org}</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/50 mb-2">{exp.location}</p>
              <p className="font-sans text-sm text-white/70 leading-relaxed">{exp.description}</p>
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-accent text-accent font-mono text-xs sm:text-sm tracking-wider hover:bg-accent hover:text-white transition-all duration-200">
                  {exp.linkLabel ?? 'Visit Website'} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
