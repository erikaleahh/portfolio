import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { Toolkit } from '../components/Toolkit'
import { site, toolkitDetails } from '../data'

describe('Interactive About toolkit', () => {
  it('cycles only while the toolkit is open, pauses for interaction, and wraps back to the first tool', () => {
    vi.useFakeTimers()
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn((query) => ({ ...originalMatchMedia(query), matches: false }))
    const step = () => act(() => vi.advanceTimersByTime(site.about.beauty.toolIntervalMs))
    const selected = (name: string) => expect(screen.getByRole('button', { name }).getAttribute('aria-pressed')).toBe('true')
    try {
      const { unmount } = render(<Toolkit />)
      act(() => vi.advanceTimersByTime(12000))
      fireEvent.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      selected('Figma')
      const palette = screen.getByRole('list', { name: 'Creative tools' })
      fireEvent.mouseEnter(palette)
      step()
      selected('Figma')
      fireEvent.mouseLeave(palette)
      step()
      selected('HTML5')
      fireEvent.focus(screen.getByRole('button', { name: 'HTML5' }))
      step()
      selected('HTML5')
      fireEvent.blur(screen.getByRole('button', { name: 'HTML5' }), { relatedTarget: null })
      step()
      selected('CSS3')
      fireEvent.click(screen.getByRole('button', { name: 'Claude' }))
      step()
      selected('Claude')
      fireEvent.click(screen.getByRole('button', { name: 'Resume toolkit slideshow' }))
      step()
      selected('ChatGPT')
      step()
      selected('Figma')
      fireEvent.click(screen.getByRole('button', { name: 'Close my toolkit' }))
      act(() => vi.advanceTimersByTime(12000))
      fireEvent.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      selected('Figma')
      step()
      selected('HTML5')
      unmount()
      expect(vi.getTimerCount()).toBe(0)
    } finally {
      window.matchMedia = originalMatchMedia
      vi.useRealTimers()
    }
  })

  it('does not automatically change tools when reduced motion is preferred', () => {
    vi.useFakeTimers()
    try {
      render(<Toolkit />)
      fireEvent.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      act(() => vi.advanceTimersByTime(12000))
      expect(screen.getByRole('button', { name: 'Figma' }).getAttribute('aria-pressed')).toBe('true')
      expect(screen.queryByRole('button', { name: 'Pause toolkit slideshow' })).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('aligns the whole studio below the header without scrolling further for a tall palette', async () => {
    const user = userEvent.setup()
    let panelTop = 300
    let panelHeight = 500
    let mobile = false
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn((query) => ({
      ...originalMatchMedia(query),
      matches: query === '(max-width: 767px)' ? mobile : originalMatchMedia(query).matches,
    }))
    const measure = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const top = this.classList.contains('about-beauty-studio') ? panelTop
        : this.classList.contains('beauty-toolkit') ? 420 : window.innerHeight + 100
      const height = panelHeight
      return { top, bottom: top + height, height, left: 0, right: 300, width: 300, x: 0, y: top, toJSON: () => ({}) }
    })
    const frame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => { callback(0); return 1 })
    vi.mocked(window.scrollTo).mockClear()
    try {
      render(<Toolkit />)
      await user.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 200, behavior: 'instant' })
      await user.click(screen.getByRole('button', { name: 'Close my toolkit' }))
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      panelHeight = window.innerHeight + 500
      await user.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 200, behavior: 'instant' })
      await user.click(screen.getByRole('button', { name: 'Close my toolkit' }))
      panelTop = 100
      await user.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      expect(window.scrollTo).toHaveBeenCalledTimes(2)
      await user.click(screen.getByRole('button', { name: 'Close my toolkit' }))
      mobile = true
      await user.click(screen.getByRole('button', { name: 'Open my toolkit' }))
      expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 320, behavior: 'instant' })
    } finally {
      window.matchMedia = originalMatchMedia
      measure.mockRestore()
      frame.mockRestore()
    }
  })

  it('cycles through all three steps, pauses for interaction, and clears its timer on unmount', () => {
    vi.useFakeTimers()
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn((query) => ({ ...originalMatchMedia(query), matches: false }))
    try {
      const { container, unmount } = render(<Toolkit />)
      const routine = container.querySelector('.beauty-routine')!
      const selected = () => within(screen.getByRole('group', { name: 'How I contribute' })).getByRole('button', { pressed: true }).getAttribute('aria-label')
      expect(selected()).toMatch(/^Prep:/)
      act(() => vi.advanceTimersByTime(3000))
      expect(selected()).toMatch(/^Shape:/)
      act(() => vi.advanceTimersByTime(3000))
      expect(selected()).toMatch(/^Polish:/)
      act(() => vi.advanceTimersByTime(3000))
      expect(selected()).toMatch(/^Prep:/)
      fireEvent.mouseEnter(routine)
      act(() => vi.advanceTimersByTime(10000))
      expect(selected()).toMatch(/^Prep:/)
      fireEvent.mouseLeave(routine)
      act(() => vi.advanceTimersByTime(3000))
      expect(selected()).toMatch(/^Shape:/)
      fireEvent.click(screen.getByRole('button', { name: 'Pause contribution slideshow' }))
      act(() => vi.advanceTimersByTime(10000))
      expect(selected()).toMatch(/^Shape:/)
      fireEvent.click(screen.getByRole('button', { name: 'Resume contribution slideshow' }))
      act(() => vi.advanceTimersByTime(3000))
      expect(selected()).toMatch(/^Polish:/)
      const prep = screen.getByRole('button', { name: 'Prep: Design with intent' })
      fireEvent.focus(prep)
      act(() => vi.advanceTimersByTime(10000))
      expect(selected()).toMatch(/^Polish:/)
      fireEvent.blur(prep, { relatedTarget: null })
      unmount()
      expect(vi.getTimerCount()).toBe(0)
    } finally {
      window.matchMedia = originalMatchMedia
      vi.useRealTimers()
    }
  })

  it('keeps the contributions static when reduced motion is preferred', () => {
    vi.useFakeTimers()
    try {
      render(<Toolkit />)
      act(() => vi.advanceTimersByTime(20000))
      expect(screen.getByRole('button', { name: 'Prep: Design with intent' }).getAttribute('aria-pressed')).toBe('true')
      expect(screen.queryByRole('button', { name: 'Pause contribution slideshow' })).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('opens with the keyboard, selects tools, and removes closed tools from keyboard access', async () => {
    const user = userEvent.setup()
    render(<Toolkit />)
    const lid = screen.getByRole('button', { name: 'Open my toolkit' })
    expect(lid.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('button', { name: 'Claude' })).toBeNull()
    lid.focus()
    await user.keyboard('{Enter}')
    expect(lid.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('button', { name: 'Figma' }).getAttribute('aria-pressed')).toBe('true')
    const claude = screen.getByRole('button', { name: 'Claude' })
    claude.focus()
    await user.keyboard(' ')
    expect(claude.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText(toolkitDetails.Claude)).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Figma' }).getAttribute('aria-pressed')).toBe('false')
    await user.click(lid)
    expect(screen.queryByRole('button', { name: 'Claude' })).toBeNull()
    expect(document.activeElement).toBe(lid)
  })

  it('connects each beauty routine step to the actual contribution and evidence', async () => {
    const user = userEvent.setup()
    render(<Toolkit />)
    const group = screen.getByRole('group', { name: 'How I contribute' })
    const polish = within(group).getByRole('button', { name: 'Polish: Refine the experience' })
    await user.click(polish)
    expect(polish.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText(site.about.capabilities[2].description)).toBeTruthy()
    expect(screen.getByText('RSVP · Frontend QA & SMM')).toBeTruthy()
    expect(within(group).getByRole('button', { name: 'Prep: Design with intent' }).getAttribute('aria-pressed')).toBe('false')
  })

  it('has no detectable accessibility violations with the compact open', async () => {
    const user = userEvent.setup()
    const { container } = render(<main><Toolkit /></main>)
    await user.click(screen.getByRole('button', { name: 'Open my toolkit' }))
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
    expect(results.violations).toEqual([])
  })
})

