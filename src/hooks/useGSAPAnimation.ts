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
                duration: 0.95,
                stagger: 0.1,
              })
              .from(
                root.querySelectorAll('[data-hero-reveal]'),
                { y: 12, opacity: 0, duration: 0.65, stagger: 0.08 },
                0.2,
              )

            const lanyardRig = root.querySelector('[data-lanyard-swing]')
            let removeLanyardInteraction = () => {}
            if (lanyardRig) {
              // One timeline owns the rig rotation; strap, clip and card move together.
              const sway = gsap.timeline({
                delay: 0.35,
                scrollTrigger: {
                  trigger: root.querySelector('#home'),
                  start: 'top bottom',
                  end: 'bottom top',
                  toggleActions: 'play pause resume pause',
                },
              })
              sway
                .fromTo(
                  lanyardRig,
                  { rotation: -5 },
                  {
                    rotation: 0,
                    duration: 1.8,
                    ease: 'elastic.out(1, 0.6)',
                    force3D: false,
                  },
                )
                .to(lanyardRig, {
                  rotation: 1,
                  duration: 2.8,
                  ease: 'sine.inOut',
                  force3D: false,
                })
                .to(lanyardRig, {
                  rotation: -1,
                  duration: 5.6,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  force3D: false,
                })

              // Clicks temporarily take ownership of rotation, then restore idle sway.
              const swing = gsap.timeline({
                paused: true,
                defaults: { ease: 'sine.inOut', force3D: false },
                onComplete: () => { sway.play(1.8) },
              })
              swing
                .to(lanyardRig, { rotation: 8, duration: 0.22 })
                .to(lanyardRig, { rotation: -6, duration: 0.4 })
                .to(lanyardRig, { rotation: 4, duration: 0.36 })
                .to(lanyardRig, { rotation: -2, duration: 0.32 })
                .to(lanyardRig, { rotation: 0, duration: 0.3 })
              const activate = () => {
                sway.pause()
                // Repeated taps do not stack competing rotation animations.
                if (!swing.isActive()) swing.invalidate().restart()
              }
              const button = root.querySelector('[data-lanyard-activate]')
              button?.addEventListener('click', activate)
              removeLanyardInteraction = () => {
                button?.removeEventListener('click', activate)
              }
            }
            hero.from(
              root.querySelectorAll('[data-hero-visual]'),
              { opacity: 0, scale: 0.96, duration: 1.2 },
              0.3,
            )

            root.querySelectorAll<HTMLElement>('[data-heading]').forEach((heading) => {
              const reveal = gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
              })
              reveal.from(heading.querySelector('.eyebrow'), { y: 8, opacity: 0, duration: 0.55 })
                .from(heading.querySelectorAll('[data-heading-word]'), {
                  yPercent: 110,
                  duration: 0.8,
                  stagger: 0.045,
                  clearProps: 'transform',
                }, 0.1)
            })

            root
              .querySelectorAll<HTMLElement>('[data-reveal]')
              .forEach((element) => {
                gsap.from(element, {
                  y: 18,
                  opacity: 0,
                  duration: 0.7,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 94%',
                    once: true,
                  },
                })
              })

            const hoverCleanups: (() => void)[] = []
            // Each project gets a separate sequence so mobile cards wait for their own viewport entry.
            root
              .querySelectorAll<HTMLElement>('[data-project]')
              .forEach((element) => {
                const preview = element.querySelector('[data-project-preview]')
                const reveal = gsap.timeline({
                  defaults: { ease: 'power3.out' },
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 94%',
                    once: true,
                  },
                })
                reveal.from(preview, {
                  y: 24,
                  opacity: 0,
                  clipPath: 'inset(0 0 8% 0 round 12px)',
                  duration: 0.95,
                  clearProps: 'transform,opacity,clipPath',
                }).from(element.querySelectorAll('.project-info > *'), {
                  y: 12,
                  opacity: 0,
                  duration: 0.6,
                  stagger: 0.065,
                  clearProps: 'transform,opacity',
                }, 0.2)
                // A focused project action should never remain behind a reveal mask.
                const finish = () => { reveal.progress(1) }
                element.addEventListener('focusin', finish)
                hoverCleanups.push(() => element.removeEventListener('focusin', finish))
              })

            root
              .querySelectorAll<HTMLElement>('[data-hover]')
              .forEach((element) => {
                const tween = gsap.to(element, {
                  y: -2,
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
            const stage = root.querySelector<HTMLElement>(
              '[data-lanyard-stage]',
            )
            const visual = stage?.closest<HTMLElement>('.hero-visual')
            if (stage && visual) {
              const moveX = gsap.quickTo(stage, 'x', {
                duration: 0.6,
                ease: 'power2.out',
                force3D: false,
              })
              const moveY = gsap.quickTo(stage, 'y', {
                duration: 0.6,
                ease: 'power2.out',
                force3D: false,
              })
              const move = (event: PointerEvent) => {
                if (
                  event.pointerType === 'touch' ||
                  !window.matchMedia('(hover: hover) and (pointer: fine)')
                    .matches
                )
                  return
                const rect = visual.getBoundingClientRect()
                if (!rect.width || !rect.height) return
                moveX(
                  gsap.utils.clamp(
                    -1,
                    1,
                    ((event.clientX - rect.left) / rect.width) * 2 - 1,
                  ) * 3,
                )
                moveY(
                  gsap.utils.clamp(
                    -1,
                    1,
                    ((event.clientY - rect.top) / rect.height) * 2 - 1,
                  ) * 2,
                )
              }
              const reset = () => {
                moveX(0)
                moveY(0)
              }
              stage.addEventListener('pointermove', move)
              stage.addEventListener('pointerleave', reset)
              hoverCleanups.push(() => {
                stage.removeEventListener('pointermove', move)
                stage.removeEventListener('pointerleave', reset)
              })
            }
            return () => {
              removeLanyardInteraction()
              hoverCleanups.forEach((cleanup) => cleanup())
            }
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
      // Opening the compact changes the height of About and every later scroll trigger.
      let refreshFrame = 0
      const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
        cancelAnimationFrame(refreshFrame)
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh()
        })
      })
      observer?.observe(scope.current)
      return () => {
        disposed = true
        observer?.disconnect()
        cancelAnimationFrame(refreshFrame)
        media.revert()
      }
    },
    { scope },
  )

  return scope
}
