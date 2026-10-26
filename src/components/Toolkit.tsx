import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Braces, ChevronDown, Code2, GitBranch, Layers3, MoveUpRight, Pause, Play, Sparkles } from 'lucide-react'
import { site, toolkitGroups, toolkitDetails } from '../data'
import { GitHubIcon } from './SocialIcons'
import { BrandLogo } from './BrandLogo'
import { useAutoCycle } from '../hooks/useAutoCycle'
import { useCompactMotion, usePanelMotion } from '../hooks/useStudioMotion'

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
  const routineRef = useRef<HTMLDivElement>(null)
  const cycle = useAutoCycle(site.about.capabilities.length, 2000, true, routineRef)
  const { index: selected, reducedMotion, autoplay, paused } = cycle
  const detailRef = usePanelMotion(selected)

  const capability = site.about.capabilities[selected]
  return (
    <div
      ref={routineRef}
      className="beauty-routine"
      data-reveal
      {...cycle.interactionProps}
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
            onClick={() => cycle.select(index)}
          >
            <span className="product-display" aria-hidden="true">
              <span className="product-vessel">
                <span className="product-cap" />
                <span className="product-label"><BrandLogo variant="small" /><small>0{index + 1}</small></span>
              </span>
            </span>
            <span className="routine-step"><span>0{index + 1}</span> {site.about.beauty.steps[index]}</span>
          </button>
        ))}
      </div>
      <div className="routine-control-row">
        {!reducedMotion && (
          <button type="button" className="routine-autoplay" onClick={cycle.togglePaused} aria-label={paused ? 'Resume contribution slideshow' : 'Pause contribution slideshow'}>
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            {paused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
      <div ref={detailRef} className="routine-detail" id="contribution-detail" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">
        <h4>{capability.title}</h4>
        <p>{capability.description}</p>
        <span className="capability-evidence">{capability.evidence}</span>
      </div>
    </div>
  )
}

function ToolkitCompact() {
  const [open, setOpen] = useState(false)
  const toolkitRef = useRef<HTMLDivElement>(null)
  const cycle = useAutoCycle(tools.length, site.about.beauty.toolIntervalMs, open, toolkitRef)
  const activeTool = tools[cycle.index]
  const selected = activeTool.name
  const compactRef = useRef<HTMLDivElement>(null)
  const detailRef = usePanelMotion(selected)
  useCompactMotion(compactRef, open)

  useEffect(() => {
    if (!open) return
    // Wait for the revealed palette to participate in layout before measuring.
    const frame = window.requestAnimationFrame(() => {
      const compact = compactRef.current
      if (!compact) return
      const panel = window.matchMedia('(max-width: 767px)').matches
        ? compact.closest('.beauty-toolkit') ?? compact
        : compact.closest('.about-beauty-studio') ?? compact
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 88
      const clearance = headerHeight + 12
      const bounds = panel.getBoundingClientRect()
      // Desktop keeps both columns in view; mobile starts at the toolkit heading.
      if (Math.abs(bounds.top - clearance) <= 24) return
      window.scrollTo({
        top: Math.max(0, window.scrollY + bounds.top - clearance),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  return (
    <div ref={toolkitRef} className="beauty-toolkit" data-reveal>
      <h3 id="toolkit-title" className="eyebrow">{site.about.skillsLabel}</h3>
      <p className="beauty-intro">{site.about.beauty.compactHint}</p>
      <div ref={compactRef} className={`makeup-compact ${open ? 'is-open' : ''} ${cycle.autoplay ? 'is-cycling' : ''}`} style={{ '--cycle-duration': `${site.about.beauty.toolIntervalMs}ms` } as CSSProperties}>
        <button
          type="button"
          className="compact-lid"
          aria-expanded={open}
          aria-controls="compact-palette"
          onClick={() => setOpen(!open)}
        >
          <span className="compact-mirror" aria-hidden="true">
            <span className="compact-sheen" />
            <span className="compact-monogram"><BrandLogo variant="wordmark" monochrome /></span>
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
          <div className="palette-controls">
            <p className="beauty-hint">{site.about.beauty.swatchHint}</p>
            {!cycle.reducedMotion && (
              <button type="button" className="routine-autoplay" onClick={cycle.togglePaused} aria-label={cycle.paused ? 'Resume toolkit slideshow' : 'Pause toolkit slideshow'}>
                {cycle.paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
                {cycle.paused ? 'Resume' : 'Pause'}
              </button>
            )}
          </div>
          <ul className="tool-swatch-grid" aria-label="Creative tools" {...cycle.interactionProps}>
            {tools.map((tool, index) => (
              <li key={tool.name}>
                <button
                  type="button"
                  className="tool-swatch"
                  style={{ '--swatch': shades[index % shades.length] } as CSSProperties}
                  aria-pressed={selected === tool.name}
                  aria-controls="tool-detail"
                  onClick={() => cycle.select(index)}
                >
                  <span className="swatch-pan">
                    <ToolMark name={tool.name} />
                    {cycle.index === index && <span key={`${index}-${cycle.autoplay}`} className="swatch-timer" aria-hidden="true" />}
                  </span>
                  <span className="swatch-name">{tool.name}</span>
                </button>
              </li>
            ))}
            <li className="palette-signature" aria-hidden="true"><BrandLogo variant="small" /><span>THE EDIT</span></li>
          </ul>
          <div className="tool-detail" id="tool-detail" aria-live={cycle.autoplay ? 'off' : 'polite'} aria-atomic="true">
            <div ref={detailRef} className="tool-detail-content">
              <div className="tool-detail-meta">
                <span className="tool-category">{activeTool.category}</span>
                <span className="tool-position" aria-hidden="true">{String(cycle.index + 1).padStart(2, '0')} / {tools.length}</span>
              </div>
              <h4>{selected}</h4>
              <p>{toolkitDetails[selected]}</p>
            </div>
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
