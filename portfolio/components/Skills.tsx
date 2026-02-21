import Section from './Section'
import { skills } from '@/lib/data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills & Tools" className="bg-ink">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {skills.map((group) => (
          <div key={group.category}>
            <span className="font-mono text-[11px] tracking-widest uppercase text-white/30 block mb-4">
              {group.category}
            </span>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="font-sans text-sm text-white/70 flex items-start gap-2">
                  <span className="text-accent mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
