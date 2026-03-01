import Section from './Section'
import { skills } from '@/lib/data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills & Tools" className="bg-[#0A0A09]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-10">
        {skills.map((group) => (
          <div key={group.category}>
            <span className="font-mono text-[11px] tracking-widest uppercase text-white/25 block mb-3">
              {group.category}
            </span>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="font-mono text-xs text-white/50 flex items-start gap-2">
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
