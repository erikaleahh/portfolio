import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Braces, ChevronDown, Code2, GitBranch, Layers3, MoveUpRight, Pause, Play, Sparkles } from 'lucide-react'
import { site, toolkitGroups, toolkitDetails } from '../data'
import { GitHubIcon } from './SocialIcons'

const skillIcons = {
  HTML5: Code2, CSS3: Braces, JavaScript: Braces, React: Layers3,
  'Tailwind CSS': Layers3, GSAP: MoveUpRight, Git: GitBranch, GitHub: GitHubIcon,
}
const brandLogos: Record<string, string> = {
  Figma: '/images/toolkit/figma.svg',
  Claude: '/images/toolkit/claude.svg',
  ChatGPT: '/images/toolkit/openai.svg',
}
const shades = ['#ead3be', '#dec0b9', '#c89486', '#b58190', '#d6c1aa', '#b5aaa0', '#e4b4a5', '#bc9587', '#c6acb5', '#d7afa5', '#d0c7b4']
const tools = toolkitGroups.flatMap((group) => group.skills.map((name) => ({ name, category: group.title })))

function ToolMark({ name }: { name: string }) {
  const logo = brandLogos[name]
  const Icon = skillIcons[name as keyof typeof skillIcons] ?? Code2
  return logo ? (
    <span className="skill-brand-logo" style={{ maskImage: `url("${logo}")` }} aria-hidden="true" />
  ) : <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
}

function ContributionRoutine() {
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const autoplay = !paused && !hovered && !focused && !reducedMotion && pageVisible

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => {
      setSelected((index) => (index + 1) % site.about.capabilities.length)
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [autoplay, selected])

  const capability = site.about.capabilities[selected]
  return (
    <div
      className="beauty-routine"
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <h3 className="eyebrow" id="contribution-title">{site.about.capabilitiesLabel}</h3>
      <p className="beauty-intro">{site.about.beauty.routineIntro}</p>
      <div className="routine-products" role="group" aria-labelledby="contribution-title">
        {site.about.capabilities.map((item, index) => (
          <button
            type="button"
            className={`routine-product routine-product-${index + 1}`}
            key={item.title}
            aria-label={`${site.about.beauty.steps[index]}: ${item.title}`}
            aria-pressed={selected === index}
            aria-controls="contribution-detail"
            onClick={() => {
              setSelected(index)
              setPaused(true)
            }}
          >
            <span className="product-display" aria-hidden="true">
              <span className="product-vessel">
                <span className="product-cap" />
                <span className="product-label">e.<small>0{index + 1}</small></span>
              </span>
            </span>
            <span className="routine-step"><span>0{index + 1}</span> {site.about.beauty.steps[index]}</span>
          </button>
        ))}
      </div>
      <div className="routine-control-row">
        {!reducedMotion && (
          <button type="button" className="routine-autoplay" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume contribution slideshow' : 'Pause contribution slideshow'}>
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            {paused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
      <div className="routine-detail" id="contribution-detail" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">
        <h4>{capability.title}</h4>
        <p>{capability.description}</p>
        <span className="capability-evidence">{capability.evidence}</span>
      </div>
    </div>
  )
}

function ToolkitCompact() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Figma')
  const compactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    // Wait for the revealed palette to participate in layout before measuring.
    const frame = window.requestAnimationFrame(() => {
      const compact = compactRef.current
      if (!compact) return
      const panel = compact.closest('.about-beauty-studio') ?? compact
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 88
      const clearance = headerHeight + 12
      const bounds = panel.getBoundingClientRect()
      // Keep both headings and the mirror in view, even if the tools extend below the fold.
      if (Math.abs(bounds.top - clearance) <= 24) return
      window.scrollTo({
        top: Math.max(0, window.scrollY + bounds.top - clearance),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  const activeTool = tools.find((tool) => tool.name === selected)!
  return (
    <div className="beauty-toolkit" data-reveal>
      <h3 id="toolkit-title" className="eyebrow">{site.about.skillsLabel}</h3>
      <p className="beauty-intro">{site.about.beauty.compactHint}</p>
      <div ref={compactRef} className={`makeup-compact ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          className="compact-lid"
          aria-expanded={open}
          aria-controls="compact-palette"
          onClick={() => setOpen(!open)}
        >
          <span className="compact-mirror" aria-hidden="true">
            <span className="compact-monogram">e.</span>
            <span className="compact-edition">{site.about.beauty.compactLabel}</span>
            <Sparkles size={20} strokeWidth={1} />
          </span>
          <span className="compact-toggle-label">
            {open ? site.about.beauty.compactOpen : site.about.beauty.compactClosed}
            <ChevronDown size={16} aria-hidden="true" />
          </span>
        </button>
        <div className="compact-hinge" aria-hidden="true"><i /><i /></div>
        <div id="compact-palette" className="compact-palette" hidden={!open}>
          <p className="beauty-hint">{site.about.beauty.swatchHint}</p>
          <ul className="tool-swatch-grid" aria-label="Creative tools">
            {tools.map((tool, index) => (
              <li key={tool.name}>
                <button
                  type="button"
                  className="tool-swatch"
                  style={{ '--swatch': shades[index % shades.length] } as CSSProperties}
                  aria-pressed={selected === tool.name}
                  aria-controls="tool-detail"
                  onClick={() => setSelected(tool.name)}
                >
                  <span className="swatch-pan"><ToolMark name={tool.name} /></span>
                  <span className="swatch-name">{tool.name}</span>
                </button>
              </li>
            ))}
            <li className="palette-signature" aria-hidden="true">e.<span>THE EDIT</span></li>
          </ul>
          <div className="tool-detail" id="tool-detail" aria-live="polite" aria-atomic="true">
            <span className="tool-category">{activeTool.category}</span>
            <h4>{selected}</h4>
            <p>{toolkitDetails[selected]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toolkit() {
  return (
    <div className="about-beauty-studio">
      <ContributionRoutine />
      <ToolkitCompact />
    </div>
  )
}
