import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionLink } from '../components/SectionLink'

export function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="page-container section-spacing flex min-h-svh flex-col justify-center">
      <p className="mb-6 font-mono text-sm uppercase tracking-widest text-accent">404 / Page not found</p>
      <h1 className="max-w-3xl text-5xl leading-tight tracking-tight sm:text-7xl">A little off course.</h1>
      <p className="mt-6 max-w-lg leading-relaxed text-secondary">This page doesn't exist. Head back to the portfolio or explore the projects section.</p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link to="/" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 font-medium text-background hover:bg-primary">
          <ArrowLeft size={18} aria-hidden="true" /> Back to home
        </Link>
        <SectionLink section="projects" className="inline-flex min-h-12 items-center text-accent underline underline-offset-4">Explore projects</SectionLink>
      </div>
    </main>
  )
}
