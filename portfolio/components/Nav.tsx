'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Awards', href: '#awards' },
  { label: 'Skills', href: '#skills' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 h-14 sm:h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-lg font-medium tracking-wide text-ink hover:text-accent transition-colors">
          Y.S
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              className="font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors hover-underline">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu — fullscreen overlay */}
      <div className={`md:hidden fixed inset-0 top-14 sm:top-16 bg-paper/98 backdrop-blur-sm transition-all duration-300 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-4xl font-light text-ink hover:text-accent transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
