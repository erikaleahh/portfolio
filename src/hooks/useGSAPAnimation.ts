import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function useGSAPAnimation() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!scope.current) return
      const media = gsap.matchMedia()
      let disposed = false
      try {
        media.add(
          '(prefers-reduced-motion: no-preference)',
          () => {
            const root = scope.current!
            const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })
            hero
              .from(root.querySelectorAll('[data-hero-line]'), {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.12,
              })
              .from(
                root.querySelectorAll('[data-hero-reveal]'),
                { y: 18, opacity: 0, duration: 0.8, stagger: 0.09 },
                0.25,
              )
              .from(
                root.querySelectorAll('[data-hero-visual]'),
                { opacity: 0, scale: 0.96, duration: 1.2 },
                0.3,
              )

            root
              .querySelectorAll<HTMLElement>('[data-reveal]')
              .forEach((element) => {
                gsap.from(element, {
                  y: 26,
                  opacity: 0,
                  duration: 0.85,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 94%',
                    once: true,
                  },
                })
              })

            // Each card has its own trigger so mobile layouts never reveal offscreen cards early.
            root
              .querySelectorAll<HTMLElement>('[data-project]')
              .forEach((element, index) => {
                gsap.from(element, {
                  y: 40,
                  opacity: 0,
                  duration: 0.9,
                  delay: (index % 2) * 0.08,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 94%',
                    once: true,
                  },
                })
              })

            const hoverCleanups: (() => void)[] = []
            root
              .querySelectorAll<HTMLElement>('[data-hover]')
              .forEach((element) => {
                const tween = gsap.to(element, {
                  y: -3,
                  duration: 0.25,
                  ease: 'power2.out',
                  paused: true,
                })
                const enter = () => tween.play()
                const leave = () => tween.reverse()
                element.addEventListener('pointerenter', enter)
                element.addEventListener('pointerleave', leave)
                element.addEventListener('focus', enter)
                element.addEventListener('blur', leave)
                hoverCleanups.push(() => {
                  element.removeEventListener('pointerenter', enter)
                  element.removeEventListener('pointerleave', leave)
                  element.removeEventListener('focus', enter)
                  element.removeEventListener('blur', leave)
                })
              })

            const orbitalArt = root.querySelector('.orbital-art')
            if (orbitalArt)
              gsap.to(orbitalArt, {
                y: 50,
                ease: 'none',
                scrollTrigger: {
                  trigger: root.querySelector('#home'),
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1,
                },
              })
            return () => hoverCleanups.forEach((cleanup) => cleanup())
          },
          scope,
        )
        // Font metrics may change trigger positions; don't refresh after unmount.
        document.fonts?.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh()
        })
      } catch {
        // Static content is the baseline: revert any partial setup on failure.
        media.revert()
      }
      return () => {
        disposed = true
        media.revert()
      }
    },
    { scope },
  )

  return scope
}
