import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { sectionLinks } from '../data/navigation'
import { portfolio, site } from '../data'
import { useActiveSection } from '../hooks/useActiveSection'
import { SectionLink } from './SectionLink'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previous
        dialog.close()
      }
    }
    dialog.close()
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    const closeOnHistory = () => setOpen(false)
    desktop.addEventListener('change', closeOnDesktop)
    window.addEventListener('popstate', closeOnHistory)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('popstate', closeOnHistory)
    }
  }, [])

  const closeMenu = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="page-container nav-inner">
          <SectionLink
            section="home"
            className="brand"
            aria-label={`${portfolio.fullName ?? 'Portfolio'} — Home`}
          >
            {site.monogram}
            <span className="brand-mark" aria-hidden="true" />
          </SectionLink>
          <nav className="desktop-nav" aria-label="Main navigation">
            {sectionLinks.map(({ id, label }) => (
              <SectionLink
                key={id}
                section={id}
                className={`nav-link ${active === id ? 'is-active' : ''}`}
                aria-current={active === id ? 'location' : undefined}
              >
                {label}
              </SectionLink>
            ))}
          </nav>
          <SectionLink section="contact" className="nav-cta" data-hover>
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </SectionLink>
          <button
            ref={triggerRef}
            className="menu-trigger icon-button"
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={23} aria-hidden="true" />
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-dialog"
        aria-label="Mobile navigation"
        onCancel={(event) => {
          event.preventDefault()
          closeMenu()
        }}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-dialog-top">
          <span className="brand" aria-hidden="true">
            {site.monogram}
          </span>
          <button
            type="button"
            className="icon-button"
            aria-label="Close navigation"
            onClick={closeMenu}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <p className="eyebrow">Take a look around</p>
        <nav aria-label="Mobile sections" className="mobile-links">
          {sectionLinks.map(({ id, label }, index) => (
            <SectionLink
              key={id}
              section={id}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="mono-label">0{index + 1}</span>
              {label}
              <ArrowUpRight size={26} aria-hidden="true" />
            </SectionLink>
          ))}
        </nav>
        <p className="mobile-dialog-location">
          {[portfolio.location.city, portfolio.location.country]
            .filter(Boolean)
            .join(', ')}
        </p>
      </dialog>
    </>
  )
}
