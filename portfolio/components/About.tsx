import Section from './Section'
import { education } from '@/lib/data'

export default function About() {
  return (
    <Section id="about" title="Education">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Left: education timeline */}
        <div className="space-y-0">
          {education.map((edu, i) => (
            <div
              key={i}
              className="relative pl-5 pb-10 last:pb-0 border-l border-border group"
            >
              {/* dot */}
              <div className="absolute -left-[3px] top-1 w-[5px] h-[5px] rounded-full bg-border group-hover:bg-accent transition-colors" />

              <span className="font-mono text-[10px] tracking-wider text-muted block mb-1.5">
                {edu.period}
              </span>
              <h3 className="font-serif text-xl font-medium text-ink leading-tight">
                {edu.institution}
              </h3>
              {edu.degree && (
                <p className="font-sans text-sm text-ink/60 mt-1">{edu.degree}</p>
              )}
            </div>
          ))}
        </div>

        {/* Right: quick stats */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-3">
              Research Focus
            </span>
            <ul className="space-y-2">
              {[
                'AI-based Experience Design',
                'Human-AI Interaction',
                'Brain-Computer Interface (BCI)',
                'Emotion Analysis',
                'Spatial Computing & XR',
              ].map((focus) => (
                <li key={focus} className="flex items-start gap-3">
                  <span className="font-mono text-accent text-xs mt-1">—</span>
                  <span className="font-sans text-sm text-ink/80">{focus}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-3">
              Languages
            </span>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-ink">Korean</span>
                <span className="font-mono text-[10px] text-muted tracking-wider">Native</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-ink">English</span>
                <span className="font-mono text-[10px] text-muted tracking-wider">
                  Professional Working
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
