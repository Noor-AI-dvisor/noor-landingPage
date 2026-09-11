import React, { useEffect, useRef, useState } from 'react'

interface Feature {
  num: string
  icon: string
  borderColor: string
  title: string
  desc: string
  more: string
}

const FEATURES: Feature[] = [
  {
    num: '01', icon: '💬',
    borderColor: '#1d9e75',
    title: 'AI-guided conversation',
    desc: 'Noor engages students through natural, adaptive dialogue that uncovers interests, strengths, and aspirations at their own pace.',
    more: "Unlike static quizzes, Noor's conversations evolve. Each session builds on the last, creating a rich, longitudinal picture of every student's journey. Students feel heard, not assessed.",
  },
  {
    num: '02', icon: '🌐',
    borderColor: '#22c55e',
    title: 'Career domains that feel real',
    desc: 'Explore 11 real-world career domains with authentic stories, day-in-the-life experiences, and subject pathway maps.',
    more: "Each domain is curated with UK-specific labour market data, growth projections, and diverse role models. Students discover careers they never knew existed and connect them to subjects they're studying today.",
  },
  {
    num: '03', icon: '⭐',
    borderColor: '#f59e0b',
    title: 'Gamified skills journeys',
    desc: 'Bite-sized 10-minute missions build transferable skills across communication, critical thinking, creativity, and more.',
    more: 'Students earn points, unlock badges, and track their progress across a skills map that schools can see. Completion rates are dramatically higher than traditional career learning programmes.',
  },
  {
    num: '04', icon: '📊',
    borderColor: '#3b82f6',
    title: 'Counsellor dashboard',
    desc: 'Powerful analytics give counsellors and leaders real-time visibility into student career readiness and engagement.',
    more: 'Filter by year group, subject option group, or at-risk students. Spot intervention opportunities early, evidence destination data, and demonstrate the impact of your careers programme, all in one place.',
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SolutionCard: React.FC<{
  feature: Feature
  isOpen: boolean
  onToggle: () => void
}> = ({ feature, isOpen, onToggle }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [hovering, setHovering] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setSpot({ x: px * 100, y: py * 100 })
    if (prefersReducedMotion()) return
    setRot({ x: (0.5 - py) * 9, y: (px - 0.5) * 11 })
  }

  const handleLeave = () => {
    setRot({ x: 0, y: 0 })
    setHovering(false)
  }

  return (
    <div className="shrink-0 w-[78%] snap-center sm:w-auto sm:shrink h-full" style={{ perspective: 1200 }}>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
        className="group relative h-full rounded-[28px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] p-[26px] 3xl:p-8 cursor-pointer overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateY(${hovering ? -8 : 0}px)`,
          transition: 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s',
          boxShadow: hovering
            ? `0 28px 52px -16px ${feature.borderColor}40, 0 6px 20px rgba(0,0,0,0.08)`
            : '0 2px 14px rgba(0,0,0,0.05)',
        }}
      >
        {/* cursor-tracking sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(460px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.16), transparent 45%)`,
          }}
        />

        {/* ghost watermark number */}
        <div
          className="absolute -top-3 right-2 font-display select-none pointer-events-none leading-none"
          style={{ fontSize: '5.2rem', fontWeight: 600, color: feature.borderColor, opacity: 0.09, transform: 'translateZ(6px)' }}
        >
          {feature.num}
        </div>

        {/* icon badge — pops forward in 3D */}
        <div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] mb-5"
          style={{
            background: `linear-gradient(135deg, ${feature.borderColor}26, ${feature.borderColor}0a)`,
            border: `1px solid ${feature.borderColor}40`,
            transform: 'translateZ(50px)',
            boxShadow: hovering ? `0 14px 28px -8px ${feature.borderColor}66` : 'none',
            transition: 'box-shadow 0.4s',
          }}
        >
          {feature.icon}
        </div>

        <h3
          className="relative text-[1.08rem] font-bold text-[var(--text-h)] mb-2"
          style={{ transform: 'translateZ(30px)' }}
        >
          {feature.title}
        </h3>

        <p
          className="relative text-[0.9rem] leading-[1.65] text-[var(--text-b)]"
          style={{ transform: 'translateZ(20px)' }}
        >
          {feature.desc}
        </p>

        <div className={`feature-more${isOpen ? ' open' : ''}`} style={{ transform: 'translateZ(20px)' }}>
          {feature.more}
        </div>

        <button
          className="relative inline-flex items-center gap-1 mt-3 text-[0.83rem] font-semibold bg-none border-none cursor-pointer p-0"
          style={{ color: feature.borderColor, transform: 'translateZ(24px)' }}
          onClick={e => { e.stopPropagation(); onToggle() }}
        >
          {isOpen ? 'Show less' : 'Learn more'}
        </button>

        {/* accent underline — extends on hover */}
        <div
          className="absolute left-[26px] right-[26px] bottom-0 h-[2px] rounded-full origin-left"
          style={{
            background: `linear-gradient(90deg, ${feature.borderColor}, transparent)`,
            transform: `translateZ(4px) scaleX(${hovering ? 1 : 0.28})`,
            transition: 'transform 0.4s ease',
          }}
        />
      </div>
    </div>
  )
}

const SolutionSection: React.FC = () => {
  const revealRef      = useRef<HTMLDivElement>(null)
  const arcCircleRef   = useRef<SVGCircleElement>(null)
  const ripple1Ref     = useRef<HTMLDivElement>(null)
  const ripple2Ref     = useRef<HTMLDivElement>(null)
  const [statusText, setStatusText]     = useState('Initialising AI…')
  const [statusReady, setStatusReady]   = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [openCard, setOpenCard]         = useState<number | null>(null)
  const hasAnimated = useRef(false)
  const typewriterTarget = "Your school's AI guidance companion, illuminating every student's path."

  useEffect(() => {
    const el = revealRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        el.classList.add('visible')

        setTimeout(() => {
          arcCircleRef.current?.classList.add('drawn')
        }, 400)

        setTimeout(() => {
          setStatusText('Noor is ready ✓')
          setStatusReady(true)
          ripple1Ref.current?.classList.add('burst')
          ripple2Ref.current?.classList.add('burst2')
        }, 1800)

        setTimeout(() => {
          let i = 0
          setTypewriterText('')
          const tw = setInterval(() => {
            i++
            setTypewriterText(typewriterTarget.slice(0, i))
            if (i >= typewriterTarget.length) clearInterval(tw)
          }, 30)
        }, 2200)
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggleCard = (i: number) => setOpenCard(prev => (prev === i ? null : i))

  return (
    <section
      id="solution-wrap"
      className="relative overflow-hidden py-[clamp(80px,10vh,120px)] px-[clamp(24px,6vw,80px)] transition-[background] duration-300"
    >
      <div className="solution-reveal relative z-10 w-full" ref={revealRef}>

        {/* Intro — narrow reading column */}
        <div className="max-w-[640px] 3xl:max-w-[740px] mx-auto text-center">
          <div className="mb-14">
            {/* Arc heading */}
            <div className="relative flex items-center justify-center mb-5">
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] 3xl:text-[4.2rem] 4xl:text-[4.6rem] font-medium text-[var(--text-h)] relative z-10">
                Meet{' '}
                <span className="relative inline-block">
                  <em className="italic" style={{ color: 'var(--gold)' }}>Noor</em>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none" width="120" height="120" viewBox="0 0 120 120">
                    <circle className="arc-track-circle" cx="60" cy="60" r="54" />
                    <circle className="arc-draw-circle" ref={arcCircleRef} cx="60" cy="60" r="54" transform="rotate(-90 60 60)" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Ripple + status */}
            <div className="relative flex items-center justify-center mb-4">
              <div className="ripple-ring" ref={ripple1Ref} />
              <div className="ripple-ring" ref={ripple2Ref} />
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[0.82rem] text-[var(--text-light)]">
                <span className={`status-dot${statusReady ? ' ready' : ''}`} />
                <span>{statusText}</span>
              </div>
            </div>

            {/* Typewriter */}
            <p className="text-[1.25rem] 3xl:text-[1.4rem] 4xl:text-[1.5rem] text-[var(--text-b)] leading-[1.65] max-w-[640px] 3xl:max-w-[740px] 4xl:max-w-[800px] mx-auto mb-3">
              {typewriterText}
              <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--gold)', marginLeft: 1, animation: 'pulse 1s ease-in-out infinite', verticalAlign: 'text-bottom' }} />
            </p>
            <p className="text-[0.92rem] text-[var(--text-light)] italic">Noor means 'light' in Arabic.</p>
          </div>
        </div>

        {/* Feature grid — full width, 3D tilt cards */}
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-[clamp(24px,6vw,80px)] px-[clamp(24px,6vw,80px)] pb-1 gap-5 sm:mx-auto sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 3xl:gap-7 max-w-[1320px] 3xl:max-w-[1800px] 4xl:max-w-[2000px]">
          {FEATURES.map((f, i) => (
            <SolutionCard
              key={i}
              feature={f}
              isOpen={openCard === i}
              onToggle={() => toggleCard(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
