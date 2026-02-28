interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-14 sm:py-20 px-5 sm:px-8 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink mb-8 sm:mb-12">{title}</h2>
        {children}
      </div>
    </section>
  )
}
