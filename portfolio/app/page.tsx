import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Publications from '@/components/Publications'
import Awards from '@/components/Awards'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0C0C0B] text-ink">
      <Nav />
      <Hero />
      <div className="border-t border-[#1F1F1D]" />
      <About />
      <div className="border-t border-[#1F1F1D]" />
      <Experience />
      <div className="border-t border-[#1F1F1D]" />
      <Projects />
      <div className="border-t border-[#1F1F1D]" />
      <Publications />
      <div className="border-t border-[#1F1F1D]" />
      <Awards />
      <div className="border-t border-[#1F1F1D]" />
      <Skills />
      <Footer />
    </main>
  )
}
