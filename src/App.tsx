import { ArrowUpRight } from 'lucide-react'
import { portfolioRepositoryUrl } from './data'

function App() {
  return (
    <main className="page-container flex min-h-svh flex-col py-8 sm:py-12">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-6 font-mono text-xs uppercase tracking-widest">
        <span>Portfolio / Foundation</span>
        <span className="text-accent">Phase 01</span>
      </div>
      <section className="section-spacing flex flex-1 flex-col justify-center" aria-labelledby="foundation-title">
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
    </main>
  )
}

export default App
