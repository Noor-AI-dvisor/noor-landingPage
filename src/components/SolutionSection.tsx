import React, { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    num: '01',
    icon: '💬',
    color: 'feature-card-teal',
    title: 'AI-guided conversation',
    desc: 'Noor engages students through natural, adaptive dialogue — uncovering interests, strengths, and aspirations at their own pace.',
    more: 'Unlike static quizzes, Noor\'s conversations evolve. Each session builds on the last, creating a rich, longitudinal picture of every student\'s journey. Students feel heard, not assessed.',
  },
  {
    num: '02',
    icon: '🌐',
    color: 'feature-card-green',
    title: 'Career domains that feel real',
    desc: 'Explore 11 real-world career domains with authentic stories, day-in-the-life experiences, and subject pathway maps.',
    more: 'Each domain is curated with UK-specific labour market data, growth projections, and diverse role models. Students discover careers they never knew existed — and connect them to subjects they\'re studying today.',
  },
  {
    num: '03',
    icon: '⭐',
    color: 'feature-card-amber',
    title: 'Gamified skills journeys',
    desc: 'Bite-sized 10-minute missions build transferable skills across communication, critical thinking, creativity, and more.',
    more: 'Students earn points, unlock badges, and track their progress across a skills map that schools can see. Completion rates are dramatically higher than traditional career learning programmes.',
  },
  {
    num: '04',
    icon: '📊',
    color: 'feature-card-blue',
    title: 'Counsellor dashboard',
    desc: 'Powerful analytics give counsellors and leaders real-time visibility into student career readiness and engagement.',
    more: 'Filter by year group, subject option group, or at-risk students. Spot intervention opportunities early, evidence destination data, and demonstrate the impact of your careers programme — all in one place.',
  },
]

const SolutionSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const arcCircleRef = useRef<SVGCircleElement>(null)
  const ripple1Ref = useRef<HTMLDivElement>(null)
  const ripple2Ref = useRef<HTMLDivElement>(null)
  const [statusText, setStatusText] = useState('Initialising AI…')
  const [statusReady, setStatusReady] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [openCard, setOpenCard] = useState<number | null>(null)
  const hasAnimated = useRef(false)
  const typewriterTarget = "Your school's AI guidance companion — illuminating every student's path."

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          card.classList.add('visible')

          // Arc draw
          setTimeout(() => {
            if (arcCircleRef.current) {
              arcCircleRef.current.classList.add('drawn')
            }
          }, 400)

          // Status transition
          setTimeout(() => {
            setStatusText('Noor is ready ✓')
            setStatusReady(true)

            // Ripple
            if (ripple1Ref.current) ripple1Ref.current.classList.add('burst')
            if (ripple2Ref.current) ripple2Ref.current.classList.add('burst2')
          }, 1800)

          // Typewriter
          let i = 0
          const interval = setInterval(() => {
            i++
            setTypewriterText(typewriterTarget.slice(0, i))
            if (i >= typewriterTarget.length) clearInterval(interval)
          }, 35)
          // Start typewriter after arc completes
          setTimeout(() => {
            i = 0
            setTypewriterText('')
            const tw = setInterval(() => {
              i++
              setTypewriterText(typewriterTarget.slice(0, i))
              if (i >= typewriterTarget.length) clearInterval(tw)
            }, 30)
          }, 2200)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const toggleCard = (i: number) => {
    setOpenCard(prev => (prev === i ? null : i))
  }

  return (
    <section className="solution-wrap" id="solution-wrap">
      <div className="solution-card" ref={cardRef}>
        {/* Top-right label */}
        <div className="solution-card-top">
          <div className="solution-eyebrow">✦ Our Solution</div>
        </div>

        {/* Intro */}
        <div className="solution-intro">

          {/* Heading with arc */}
          <div className="arc-wrap">
            <h2 className="arc-heading">
              Meet{' '}
              <span className="arc-word-wrap">
                <em>Noor</em>
                <svg
                  className="arc-svg"
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                >
                  <circle
                    className="arc-track-circle"
                    cx="60" cy="60" r="54"
                  />
                  <circle
                    className="arc-draw-circle"
                    ref={arcCircleRef}
                    cx="60" cy="60" r="54"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Ripple + status */}
          <div className="ripple-wrap">
            <div className="ripple-ring" ref={ripple1Ref} />
            <div className="ripple-ring" ref={ripple2Ref} />
            <div className="status-line">
              <span className={`status-dot${statusReady ? ' ready' : ''}`} />
              <span>{statusText}</span>
            </div>
          </div>

          {/* Typewriter subtitle */}
          <p className="solution-sub">
            {typewriterText}
            <span style={{
              display: 'inline-block',
              width: 2, height: '1em',
              background: 'var(--accent)',
              marginLeft: 1,
              animation: 'pulse 1s ease-in-out infinite',
              verticalAlign: 'text-bottom',
            }} />
          </p>
          <p className="solution-meaning">Noor means 'light' in Arabic.</p>
        </div>

        {/* Feature grid */}
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-card ${f.color}`}
              onClick={() => toggleCard(i)}
            >
              <div className="feature-num">{f.num}</div>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <div className={`feature-more${openCard === i ? ' open' : ''}`}>
                {f.more}
              </div>
              <button
                className="feature-toggle"
                onClick={e => { e.stopPropagation(); toggleCard(i) }}
              >
                {openCard === i ? 'Show less ↑' : 'Learn more ↓'}
                <span className={`toggle-arrow${openCard === i ? ' open' : ''}`}>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
