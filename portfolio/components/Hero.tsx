import { profile, researchInterests } from '@/lib/data'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-12 sm:pb-16 pt-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">

      {/* Top label */}
      <div className="mb-6 sm:mb-8 animate-fade-in opacity-0">
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-muted">
          Portfolio · {new Date().getFullYear()}
        </span>
      </div>

      {/* Main heading */}
      <div className="mb-10 sm:mb-12">
        <h1 className="font-serif text-[clamp(3rem,12vw,9rem)] leading-[0.9] font-light text-ink animate-fade-up opacity-0 delay-100">
          YeongHwan
          <br />
          <span className="italic">Shin</span>
          <span className="text-accent">.</span>
        </h1>
      </div>

      {/* Research interest tags */}
      <div className="flex flex-wrap gap-2 mb-10 animate-fade-up opacity-0 delay-200">
        {researchInterests.map((interest) => (
          <span
            key={interest}
            className="font-mono text-[11px] tracking-wide border border-border px-3 py-1.5 text-muted hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
          >
            {interest}
          </span>
        ))}
      </div>

      {/* Bio + links */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between animate-fade-up opacity-0 delay-300">
        <div className="flex-1 max-w-xl">
          <p className="font-sans text-sm sm:text-base md:text-lg font-light leading-relaxed text-ink/80">
            {profile.bio}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-row md:flex-col gap-4 md:gap-2 shrink-0 flex-wrap">
          <span className="hidden md:block font-mono text-[10px] tracking-widest uppercase text-muted mb-1">
            Connect
          </span>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-ink hover:text-accent transition-colors hover-underline">
            LinkedIn →
          </a>
          <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-ink hover:text-accent transition-colors hover-underline">
            Scholar →
          </a>
          <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-ink hover:text-accent transition-colors hover-underline">
            Instagram →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-12 sm:mt-16 animate-fade-in opacity-0 delay-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-border" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted">Scroll</span>
        </div>
      </div>
    </section>
  )
}
