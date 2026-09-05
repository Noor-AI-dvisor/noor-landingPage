import React, { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    num: '01', icon: '💬',
    borderColor: '#1d9e75',
    title: 'AI-guided conversation',
    desc: 'Noor engages students through natural, adaptive dialogue — uncovering interests, strengths, and aspirations at their own pace.',
    more: "Unlike static quizzes, Noor's conversations evolve. Each session builds on the last, creating a rich, longitudinal picture of every student's journey. Students feel heard, not assessed.",
  },
  {
    num: '02', icon: '🌐',
    borderColor: '#22c55e',
    title: 'Career domains that feel real',
    desc: 'Explore 11 real-world career domains with authentic stories, day-in-the-life experiences, and subject pathway maps.',
    more: "Each domain is curated with UK-specific labour market data, growth projections, and diverse role models. Students discover careers they never knew existed — and connect them to subjects they're studying today.",
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
    more: 'Filter by year group, subject option group, or at-risk students. Spot intervention opportunities early, evidence destination data, and demonstrate the impact of your careers programme — all in one place.',
  },
]

const SolutionSection: React.FC = () => {
  const cardRef        = useRef<HTMLDivElement>(null)
  const arcCircleRef   = useRef<SVGCircleElement>(null)
  const ripple1Ref     = useRef<HTMLDivElement>(null)
  const ripple2Ref     = useRef<HTMLDivElement>(null)
  const [statusText, setStatusText]     = useState('Initialising AI…')
  const [statusReady, setStatusReady]   = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [openCard, setOpenCard]         = useState<number | null>(null)
  const hasAnimated = useRef(false)
  const typewriterTarget = "Your school's AI guidance companion — illuminating every student's path."

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        card.classList.add('visible')

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

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const toggleCard = (i: number) => setOpenCard(prev => (prev === i ? null : i))

  return (
    <section
      id="solution-wrap"
      className="py-[clamp(80px,10vh,120px)] px-[clamp(24px,5vw,60px)] bg-[var(--bg)] transition-[background] duration-300"
    >
      <div className="solution-card max-w-[1200px] mx-auto relative bg-[var(--sol-bg)] dark:bg-[var(--bg)] border border-[var(--gold-dim)] rounded-[32px] px-[clamp(48px,5vw,88px)] py-[clamp(64px,8vh,96px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_48px_rgba(0,0,0,0.07),0_32px_80px_rgba(0,0,0,0.05),0_0_0_1px_var(--gold-dim)]" ref={cardRef}>

        {/* Eyebrow */}
        <div className="flex justify-start mb-10">
          <div className="inline-flex items-center gap-1.5 px-[13px] py-[5px] bg-[var(--accent-dim)] border border-[rgba(29,158,117,0.22)] rounded-full text-[11px] font-bold text-accent tracking-[0.1em] uppercase">
            ✦ Our Solution
          </div>
        </div>

        {/* Intro */}
        <div className="text-center mb-14">
          {/* Arc heading */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-medium text-[var(--text-h)] relative z-10">
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
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="ripple-ring" ref={ripple1Ref} />
            <div className="ripple-ring" ref={ripple2Ref} />
            <div className="flex items-center justify-center gap-1.5 mt-2 text-[0.82rem] text-[var(--text-light)]">
              <span className={`status-dot${statusReady ? ' ready' : ''}`} />
              <span>{statusText}</span>
            </div>
          </div>

          {/* Typewriter */}
          <p className="text-[1.25rem] text-[var(--text-b)] leading-[1.65] max-w-[640px] mx-auto mb-3">
            {typewriterText}
            <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--gold)', marginLeft: 1, animation: 'pulse 1s ease-in-out infinite', verticalAlign: 'text-bottom' }} />
          </p>
          <p className="text-[0.92rem] text-[var(--text-light)] italic">Noor means 'light' in Arabic.</p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-[22px_20px] relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-l-[3px]"
              style={{ borderLeftColor: f.borderColor }}
              onClick={() => toggleCard(i)}
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(circle at 20% 20%, ${f.borderColor}0a, transparent 60%)` }} />

              <div className="text-[0.72rem] font-bold text-[var(--text-light)] tracking-[0.1em] mb-2.5 relative z-10">{f.num}</div>
              <div className="text-[1.6rem] mb-2.5 relative z-10">{f.icon}</div>
              <div className="text-[1.05rem] font-bold text-[var(--text-h)] mb-[7px] relative z-10">{f.title}</div>
              <div className="text-[0.9rem] leading-[1.6] text-[var(--text-b)] relative z-10">{f.desc}</div>

              <div className={`feature-more${openCard === i ? ' open' : ''}`}>
                {f.more}
              </div>

              <button
                className="inline-flex items-center gap-1 mt-2.5 text-[0.83rem] font-medium text-[var(--gold)] bg-none border-none cursor-pointer p-0 transition-colors hover:text-[var(--gold-2)] relative z-10"
                onClick={e => { e.stopPropagation(); toggleCard(i) }}
              >
                {openCard === i ? 'Show less ↑' : 'Learn more ↓'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
