import { useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Animations enhance visible content; reduced motion and initialization failures keep it static.
export function usePanelMotion(value: string | number) {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const media = gsap.matchMedia()
    try {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        if (!scope.current) return
        gsap.from(scope.current.children, {
          y: 7,
          opacity: 0,
          stagger: 0.04,
          duration: 0.42,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        })
      })
    } catch { media.revert() }
    return () => media.revert()
  }, { scope, dependencies: [value], revertOnUpdate: true })
  return scope
}

export function useCompactMotion(scope: RefObject<HTMLDivElement | null>, open: boolean) {
  useGSAP(() => {
    if (!open || !scope.current) return
    const media = gsap.matchMedia()
    try {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const root = scope.current!
        const opening = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
        opening.from(root.querySelectorAll('.palette-controls, .tool-detail'), {
          y: 10, opacity: 0, duration: 0.5, stagger: 0.12,
        }, 0.08).from(root.querySelectorAll('.tool-swatch, .palette-signature'), {
          y: 8, scale: 0.94, opacity: 0, duration: 0.5, stagger: 0.025,
        }, 0.12)
        gsap.fromTo(root.querySelector('.compact-sheen'),
          { xPercent: -110, opacity: 0.4 },
          { xPercent: 110, opacity: 0, duration: 1.25, ease: 'power2.out', delay: 0.12, clearProps: 'transform,opacity' },
        )
      })
    } catch { media.revert() }
    return () => media.revert()
  }, { scope, dependencies: [open], revertOnUpdate: true })
}
