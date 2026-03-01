import { profile } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="py-10 sm:py-14 border-t border-[#1F1F1D]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <span className="font-serif text-2xl font-light text-ink">{profile.name}</span>
            <p className="font-mono text-xs text-muted mt-1">{profile.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors">LinkedIn</a>
            <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors">Scholar</a>
            <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors">Instagram</a>
          </div>
        </div>
        <div className="mt-7 pt-5 border-t border-[#1F1F1D] flex flex-col sm:flex-row sm:justify-between gap-2">
          <span className="font-mono text-[10px] text-muted/50">© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span className="font-mono text-[10px] text-muted/30">Built with Next.js · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
