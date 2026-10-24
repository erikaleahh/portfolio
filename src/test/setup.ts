import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom has no layout engine, native modal UI, or scrolling implementation.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
window.scrollTo = vi.fn()
HTMLElement.prototype.scrollIntoView = vi.fn()
// axe can inspect semantics here; canvas/contrast need actual browser rendering.
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null)
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function () {
  if (!this.open) return
  this.removeAttribute('open')
  this.dispatchEvent(new Event('close'))
}
afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
})
