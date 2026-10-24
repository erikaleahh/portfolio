import { ArrowUpRight } from 'lucide-react'
import { portfolioRepositoryUrl } from '../data'
import { SectionLink } from '../components/SectionLink'
import { sectionLinks } from '../data/navigation'

export function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="page-container flex min-h-svh flex-col py-8 sm:py-12">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-6 font-mono text-xs uppercase tracking-widest">
        <span>Portfolio / Foundation</span>
        <span className="text-accent">Phase 03</span>
      </div>
      <nav aria-label="Portfolio sections" className="flex flex-wrap gap-x-6 gap-y-2 py-6 text-sm text-secondary">
        {sectionLinks.map(({ id, label }) => <SectionLink key={id} section={id} className="inline-flex min-h-11 items-center hover:text-accent">{label}</SectionLink>)}
      </nav>
      <section id="home" tabIndex={-1} className="section-spacing flex min-h-[65svh] flex-col justify-center" aria-labelledby="foundation-title">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-secondary">Design system · Development preview</p>
        <h1 id="foundation-title" className="max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
          A thoughtful<br />foundation.<span className="text-accent">*</span>
        </h1>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
          Dark surfaces. Clear typography. Room to create.
          The portfolio will take shape here, one phase at a time.
        </p>
        <a className="mt-10 inline-flex min-h-12 w-fit items-center gap-4 rounded-full bg-accent px-6 font-medium text-background transition-colors hover:bg-primary motion-reduce:transition-none" href={portfolioRepositoryUrl} target="_blank" rel="noopener noreferrer">
          View repository <ArrowUpRight size={18} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
      <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
        <div className="flex items-center gap-3" aria-label="Palette: near black, charcoal, white, gray, electric lime">
          {['bg-background', 'bg-surface', 'bg-primary', 'bg-secondary', 'bg-accent'].map((color) => (
            <span key={color} className={`size-6 rounded-full border border-white/20 ${color}`} aria-hidden="true" />
          ))}
        </div>
        <p className="font-mono text-xs leading-relaxed text-secondary sm:text-right">Space Grotesk / Inter / JetBrains Mono</p>
      </div>
      {sectionLinks.filter(({ id }) => id !== 'home').map(({ id, label }) => (
        <section key={id} id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className="section-spacing border-b border-border">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">Section placeholder</p>
          <h2 id={`${id}-title`} className="text-4xl tracking-tight sm:text-5xl">{label}</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-secondary">This section will be built in its own upcoming phase.</p>
          <SectionLink section="home" className="mt-6 inline-flex min-h-11 items-center text-sm text-accent">Back to top</SectionLink>
        </section>
      ))}
    </main>
  )
}

