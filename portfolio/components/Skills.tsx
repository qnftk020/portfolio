import Section from './Section'
import { skills } from '@/lib/data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills" className="bg-ink">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
        {skills.map((group, i) => (
          <div
            key={i}
            className="bg-ink p-8 hover:bg-white/5 transition-colors"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent block mb-6">
              {group.category}
            </span>
            <ul className="space-y-2.5">
              {group.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="font-mono text-white/20 text-xs mt-0.5">·</span>
                  <span className="font-sans text-sm text-white/70 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
