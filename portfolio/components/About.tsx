import Section from './Section'
import { education, researchInterests } from '@/lib/data'

export default function About() {
  return (
    <Section id="about" title="Education">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        <div className="space-y-0">
          {[...education].reverse().map((edu, i) => (
            <div key={i} className="relative pl-5 pb-7 last:pb-0 border-l border-[#1F1F1D] group">
              <div className="absolute -left-[3px] top-1 w-[5px] h-[5px] rounded-full bg-[#1F1F1D] group-hover:bg-accent transition-colors" />
              <span className="font-mono text-[11px] tracking-wider text-muted block mb-2">
                {edu.period}
              </span>
              <h3 className="font-mono text-base sm:text-lg font-medium text-ink leading-tight">
                {edu.institution}
              </h3>
              {edu.degree && (
                <p className="font-mono text-xs text-ink/40 mt-1.5">{edu.degree}</p>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted block mb-4">
              Research Interest
            </span>
            <ul className="space-y-2.5">
              {researchInterests.map((focus) => (
                <li key={focus} className="flex items-start gap-3">
                  <span className="font-mono text-accent text-sm mt-0.5">—</span>
                  <span className="font-mono text-xs text-ink/60 leading-relaxed">{focus}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted block mb-4">Languages</span>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-ink">Korean</span>
                <span className="font-mono text-[11px] text-muted tracking-wider">Native</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-ink">English</span>
                <span className="font-mono text-[11px] text-muted tracking-wider">Professional Working</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
