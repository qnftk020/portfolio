interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex items-center gap-6 mb-12">
          <span className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase text-muted whitespace-nowrap">
            {title}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        {children}
      </div>
    </section>
  )
}
