import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { Projects } from '../components/Projects'
import { useGSAPAnimation } from '../hooks/useGSAPAnimation'

export function Home() {
  const scope = useGSAPAnimation()
  return (
    <div ref={scope}>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
