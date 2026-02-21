import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Publications from '@/components/Publications'
import Awards from '@/components/Awards'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <hr className="section-rule" />
      <About />
      <hr className="section-rule" />
      <Experience />
      <hr className="section-rule" />
      <Publications />
      <hr className="section-rule" />
      <Awards />
      <hr className="section-rule" />
      <Skills />
      <Footer />
    </main>
  )
}
