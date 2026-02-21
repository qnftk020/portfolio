import { profile } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* Name + tagline */}
          <div>
            <div className="font-serif text-2xl font-light text-ink mb-1">
              Yeonghwan <span className="italic">Shin</span>
            </div>
            <div className="font-mono text-[11px] tracking-wider text-muted">
              HCI Researcher · Hongik University
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex gap-6">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-ink transition-colors hover-underline"
              >
                LinkedIn
              </a>
              <a
                href={profile.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-ink transition-colors hover-underline"
              >
                Scholar
              </a>
              <a
                href={profile.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-ink transition-colors hover-underline"
              >
                Instagram
              </a>
            </div>
            <span className="font-mono text-[10px] text-muted/50">
              Last updated Dec 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
