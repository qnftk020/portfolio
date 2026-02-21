import { profile } from '@/lib/data'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-16 pt-24 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Top label */}
      <div className="mb-8 animate-fade-in opacity-0">
        <span className="font-mono text-xs tracking-widest2 uppercase text-muted">
          Portfolio · {new Date().getFullYear()}
        </span>
      </div>

      {/* Main heading */}
      <div className="mb-12">
        <h1 className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] font-light text-ink animate-fade-up opacity-0 delay-100">
          Yeonghwan
          <br />
          <span className="italic">Shin</span>
          <span className="text-accent">.</span>
        </h1>
      </div>

      {/* Divider + descriptor row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-up opacity-0 delay-300">
        <div className="max-w-lg">
          <p className="font-sans text-base md:text-lg font-light leading-relaxed text-ink/80">
            {profile.bio}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="font-mono text-xs tracking-widest uppercase text-muted mb-1">
            Connect
          </span>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ink hover:text-accent transition-colors hover-underline"
          >
            LinkedIn →
          </a>
          <a
            href={profile.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ink hover:text-accent transition-colors hover-underline"
          >
            Google Scholar →
          </a>
          <a
            href={profile.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ink hover:text-accent transition-colors hover-underline"
          >
            Instagram →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-16 animate-fade-in opacity-0 delay-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-border" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
