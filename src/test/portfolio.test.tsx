import { describe, expect, it, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import axe from 'axe-core'
import App from '../App'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { ProjectCard } from '../components/ProjectCard'
import { ExternalLink } from '../components/ExternalLink'
import { portfolio, projects, type PortfolioProject } from '../data'
import { isWebUrl } from '../utils/links'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const renderApp = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('Portfolio navigation and content', () => {
  it('renders all sections with honest missing-content states', () => {
    const { container } = renderApp()
    for (const id of ['home', 'about', 'projects', 'certificates', 'contact'])
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(container.querySelectorAll('#projects article')).toHaveLength(3)
    expect(container.textContent).toContain('Erika Leah Habaradas')
    expect(container.textContent).toContain('Digos City, Philippines')
    expect(
      screen
        .getByRole('link', { name: /Send me an email/ })
        .getAttribute('href'),
    ).toBe('mailto:erikaleahabaradas@gmail.com')
    expect(
      container.querySelector(
        'a[href="null"], a[href="undefined"], a[href="[LIVE DEMO URL]"]',
      ),
    ).toBeNull()
    expect(window.matchMedia).toHaveBeenCalledWith(
      '(prefers-reduced-motion: no-preference)',
    )
  })

  it('opens the mobile menu, locks scroll, and restores focus on Escape', async () => {
    const user = userEvent.setup()
    renderApp()
    const trigger = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', {
      name: 'Mobile navigation',
    }) as HTMLDialogElement
    expect(dialog.open).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent(dialog, new Event('cancel', { cancelable: true }))
    await waitFor(() => expect(dialog.open).toBe(false))
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger)
  })

  it('closes the mobile menu after section navigation and focuses the target', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const dialog = screen.getByRole('dialog') as HTMLDialogElement
    await user.click(within(dialog).getByRole('link', { name: /Projects/ }))
    await waitFor(() => expect(dialog.open).toBe(false))
    expect(document.activeElement?.id).toBe('projects')
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('returns from a wildcard page directly to the projects section', async () => {
    const user = userEvent.setup()
    renderApp('/unknown-page')
    expect(
      screen.getByRole('heading', { name: 'A little off course.' }),
    ).toBeTruthy()
    await user.click(screen.getByRole('link', { name: 'Explore projects' }))
    await waitFor(() => expect(document.activeElement?.id).toBe('projects'))
    expect(
      screen.getByRole('heading', { name: 'Ideas, made interactive.' }),
    ).toBeTruthy()
  })

  it('handles direct hashes and malformed hashes without crashing', () => {
    const { unmount } = renderApp('/#about')
    expect(document.activeElement?.id).toBe('about')
    unmount()
    renderApp('/#%E0%A4%A')
    expect(document.activeElement?.id).toBe('main-content')
  })

  it('has no detected semantic accessibility violations on Home or 404', async () => {
    const { container, unmount } = renderApp()
    const options = { rules: { 'color-contrast': { enabled: false } } }
    expect(
      (await axe.run(container, options)).violations.map((item) => item.id),
    ).toEqual([])
    unmount()
    const missing = renderApp('/missing')
    expect(
      (await axe.run(missing.container, options)).violations.map(
        (item) => item.id,
      ),
    ).toEqual([])
  })

  it('keeps content static under reduced motion, and cleans up animated ScrollTriggers on unmount', () => {
    const baseline = ScrollTrigger.getAll().length
    const reduced = renderApp()
    expect(ScrollTrigger.getAll()).toHaveLength(baseline)
    expect(
      reduced.container.querySelector<HTMLElement>('[data-hero-line]')?.style
        .transform,
    ).toBe('')
    reduced.unmount()
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: no-preference)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    const animated = renderApp()
    expect(ScrollTrigger.getAll().length).toBeGreaterThan(baseline)
    animated.unmount()
    expect(ScrollTrigger.getAll()).toHaveLength(baseline)
  })
})

describe('Configured content behavior', () => {
  it('credits the RSVP role and links to the live site without exposing private source', () => {
    render(
      <ProjectCard
        project={{
          ...projects[0],
          repositoryUrl: 'https://github.com/example/private-test-fixture',
        }}
        index={0}
      />,
    )
    expect(
      screen.getByRole('heading', { name: 'RSVP — Digital Invitations' }),
    ).toBeTruthy()
    expect(screen.getByText('Frontend QA & SMM')).toBeTruthy()
    expect(screen.getByText('Private source')).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Source code/ })).toBeNull()
    expect(
      screen.getByRole('link', { name: /Live demo/ }).getAttribute('href'),
    ).toBe('https://rsvpa.netlify.app/')
    expect(
      within(screen.getByRole('list', { name: 'Technologies' }))
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(['Next.js', 'React', 'Tailwind CSS'])
  })
  it('falls back to the decorative hero art if a configured portrait fails', () => {
    const original = portfolio.profileImage
    portfolio.profileImage = {
      src: '/portrait-test.webp',
      alt: 'Erika portrait test fixture',
    }
    try {
      const { container } = render(
        <MemoryRouter>
          <Hero />
        </MemoryRouter>,
      )
      fireEvent.error(
        screen.getByRole('img', { name: 'Erika portrait test fixture' }),
      )
      expect(container.querySelector('.orbital-art')).not.toBeNull()
      expect(container.querySelector('img')).toBeNull()
    } finally {
      portfolio.profileImage = original
    }
  })
  it('renders real project images and safe external links when configured, with image failure fallback', () => {
    const project: PortfolioProject = {
      id: 'actual-project',
      status: 'verified',
      title: 'Test project',
      description: 'Test fixture only',
      technologies: ['React'],
      image: { src: '/test-fixture.webp', alt: 'Project test preview' },
      repositoryUrl: 'https://github.com/example/test',
      liveUrl: 'https://example.com/',
    }
    render(<ProjectCard project={project} index={0} />)
    const image = screen.getByRole('img', { name: 'Project test preview' })
    expect(image.getAttribute('loading')).toBe('lazy')
    const source = screen.getByRole('link', { name: /Source code/ })
    expect(source.getAttribute('target')).toBe('_blank')
    expect(source.getAttribute('rel')).toBe('noopener noreferrer')
    fireEvent.error(image)
    expect(screen.getByText('Project image unavailable')).toBeTruthy()
  })

  it('rejects unsafe and placeholder external destinations', () => {
    for (const url of [
      null,
      '',
      '#',
      'javascript:alert(1)',
      'data:text/html,test',
      '[REPOSITORY URL]',
    ])
      expect(isWebUrl(url)).toBe(false)
    const { container } = render(
      <ExternalLink href="javascript:alert(1)">Unsafe</ExternalLink>,
    )
    expect(container.querySelector('a')).toBeNull()
  })

  it('enables mailto and copying only after a public email is configured', async () => {
    const user = userEvent.setup()
    const original = portfolio.contact.email
    portfolio.contact.email = 'test@example.com'
    const copy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    try {
      render(<Contact />)
      expect(
        screen
          .getByRole('link', { name: /Send me an email/ })
          .getAttribute('href'),
      ).toBe('mailto:test@example.com')
      await user.click(
        screen.getByRole('button', { name: 'Copy email address' }),
      )
      expect(copy).toHaveBeenCalledWith('test@example.com')
      expect(screen.getByRole('status').textContent).toBe('Email copied')
    } finally {
      portfolio.contact.email = original
    }
  })
})
