interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-14">
          <span className="font-mono text-[10px] tracking-widest2 uppercase text-muted whitespace-nowrap">
            {title}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        {children}
      </div>
    </section>
  )
}
