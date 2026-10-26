import { act, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAPAnimation } from '../hooks/useGSAPAnimation'

function MotionScope() {
  const scope = useGSAPAnimation()
  return <div ref={scope}><main>Visible content</main></div>
}

describe('Animation layout lifecycle', () => {
  it('refreshes scroll positions after layout changes and disconnects its observer on unmount', () => {
    let notify: ResizeObserverCallback | undefined
    let frameCallback: FrameRequestCallback | undefined
    const disconnect = vi.fn()
    const observe = vi.fn()
    class LayoutObserver {
      constructor(callback: ResizeObserverCallback) { notify = callback }
      observe = observe
      disconnect = disconnect
      unobserve = vi.fn()
    }
    vi.stubGlobal('ResizeObserver', LayoutObserver)
    const refresh = vi.spyOn(ScrollTrigger, 'refresh')
    const frame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => { frameCallback = callback; return 42 })
    const cancel = vi.spyOn(window, 'cancelAnimationFrame')
    try {
      const { unmount } = render(<MotionScope />)
      expect(observe).toHaveBeenCalledTimes(1)
      act(() => notify!([], {} as ResizeObserver))
      refresh.mockClear()
      act(() => frameCallback!(0))
      expect(refresh).toHaveBeenCalledTimes(1)
      unmount()
      expect(disconnect).toHaveBeenCalledTimes(1)
      expect(cancel).toHaveBeenCalledWith(42)
      refresh.mockClear()
      act(() => frameCallback!(0))
      expect(refresh).not.toHaveBeenCalled()
    } finally {
      refresh.mockRestore()
      frame.mockRestore()
      cancel.mockRestore()
      vi.unstubAllGlobals()
    }
  })
})
