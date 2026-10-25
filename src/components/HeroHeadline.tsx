import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { site } from '../data'

export function HeroHeadline() {
  const scope = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const panels = scope.current!.querySelectorAll('[data-headline-panel]')
      const rotation = gsap.timeline({ repeat: -1, delay: 1.6, paused: pausedRef.current })
      timeline.current = rotation
      // Both phrases occupy the same grid cell, reserving the larger footprint.
      rotation
        .to(panels[0], { y: -18, autoAlpha: 0, duration: 0.45 }, '+=3.5')
        .fromTo(panels[1], { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out', immediateRender: false }, '<0.15')
        .to(panels[1], { y: -18, autoAlpha: 0, duration: 0.45 }, '+=3.5')
        .fromTo(panels[0], { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out', immediateRender: false }, '<0.15')
      return () => { timeline.current = null }
    })
    return () => media.revert()
  }, { scope })

  const toggle = () => {
    const next = !pausedRef.current
    pausedRef.current = next
    setPaused(next)
    timeline.current?.paused(next)
  }

  return (
    <div ref={scope} className="hero-headline">
      <h1
        id="hero-title"
        className="hero-title"
        aria-label={site.hero.taglines.map((lines) => lines.join(' ')).join(' ')}
      >
        {site.hero.taglines.map((lines, index) => (
          <span className="hero-headline-panel" data-headline-panel aria-hidden="true" key={lines[0]}>
            {lines.map((line, lineIndex) => (
              <span className="hero-line-wrap" key={line}>
                <span data-hero-line={index === 0 ? '' : undefined} className={`hero-line ${lineIndex === 1 ? 'accent-text' : ''}`}>
                  {line}
                  {lineIndex === 1 && <span className="hero-asterisk">✳</span>}
                </span>
              </span>
            ))}
          </span>
        ))}
      </h1>
      <button type="button" className="hero-headline-toggle" onClick={toggle} aria-label={paused ? 'Resume headline animation' : 'Pause headline animation'}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        <span>{paused ? 'Resume' : 'Pause'} animation</span>
      </button>
    </div>
  )
}
