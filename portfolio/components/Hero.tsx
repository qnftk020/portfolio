import { profile } from '@/lib/data'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-12 sm:pb-16 pt-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">

      <div className="mb-8 sm:mb-10 animate-fade-in opacity-0">
        <span className="font-mono text-[11px] tracking-widest uppercase text-muted">
          Portfolio · {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">

        <div className="flex-1">
          <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] font-light text-ink animate-fade-up opacity-0 delay-100 mb-8 sm:mb-12">
            YeongHwan
            <br />
            <span className="italic">Shin</span>
            <span className="text-accent">.</span>
          </h1>

          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between animate-fade-up opacity-0 delay-300">
            <p className="font-sans text-sm sm:text-base font-light leading-relaxed text-ink/60 max-w-md">
              {profile.bio}
            </p>

            <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 shrink-0">
              <span className="hidden sm:block font-mono text-[10px] tracking-widest uppercase text-muted mb-1">Connect</span>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-ink/60 hover:text-accent transition-colors hover-underline">
                LinkedIn →
              </a>
              <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-ink/60 hover:text-accent transition-colors hover-underline">
                Scholar →
              </a>
              <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-ink/60 hover:text-accent transition-colors hover-underline">
                Instagram →
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 shrink-0 overflow-hidden animate-fade-up opacity-0 delay-300 self-center md:self-end">
          <Image
            src="/images/profile.png"
            alt="YeongHwan Shin"
            fill
            priority
            unoptimized
          />
        </div>

      </div>
    </section>
  )
}
