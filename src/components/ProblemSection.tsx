import React, { useEffect, useRef } from 'react'

const TIMELINE_DELAYS = [0, 320, 620, 900]

const ITEMS = [
  {
    emoji: '😕', color: '#F97316',
    label: 'Awareness',
    title: 'Students guess, not choose',
    desc: 'Most teens pick subjects based on friends or "what seems easier" — not a clear link to their strengths or future careers.',
  },
  {
    emoji: '⏳', color: '#EF4444',
    label: 'Capacity',
    title: 'Counsellors are stretched',
    desc: 'One counsellor supports hundreds of students — repeating the same basic conversations instead of doing meaningful guidance.',
  },
  {
    emoji: '📄', color: '#8B5CF6',
    label: 'Tools',
    title: 'Static tools for dynamic choices',
    desc: 'Subject options live in long PDFs. There\'s no interactive way to test the fit between a student\'s profile and their future options.',
  },
  {
    emoji: '📊', color: '#3B82F6',
    label: 'Visibility',
    title: 'Leadership has no visibility',
    desc: "School leaders can't easily see which cohorts are confident, which domains are in demand, or who still needs support.",
  },
]

const ProblemSection: React.FC = () => {
  const sectionRef   = useRef<HTMLElement>(null)
  const leftRef      = useRef<HTMLDivElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)
  const fillRef      = useRef<HTMLDivElement>(null)
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([])
  const firedRef     = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return
        firedRef.current = true

        // Reveal left column
        leftRef.current?.classList.add('revealed')
        // Reveal timeline container
        timelineRef.current?.classList.add('revealed')

        // Fill bar animation — runs over DELAYS[last] + 600ms = 1500ms
        const totalMs = TIMELINE_DELAYS[TIMELINE_DELAYS.length - 1] + 600
        const start = performance.now()
        const fill = fillRef.current

        const animFill = (now: number) => {
          const p = Math.min((now - start) / totalMs, 1)
          if (fill) fill.style.height = `${p * 100}%`
          if (p < 1) requestAnimationFrame(animFill)
        }
        requestAnimationFrame(animFill)

        // Staggered item reveal
        TIMELINE_DELAYS.forEach((delay, i) => {
          setTimeout(() => {
            itemRefs.current[i]?.classList.add('visible')
          }, delay)
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="problem-section" id="problem" ref={sectionRef}>
      {/* Left */}
      <div className="problem-left" ref={leftRef}>
        <div className="problem-eyebrow">
          <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3.5" fill="currentColor"/></svg>
          The Problem
        </div>
        <h2 className="problem-h2">
          Subject choice is broken —<br /><em>and schools know it.</em>
        </h2>
        <p className="problem-lead">
          Students make life-defining decisions with one meeting, a PDF booklet, and a guess. The current system is failing them — and counsellors.
        </p>
      </div>

      {/* Right: timeline */}
      <div className="problem-timeline" ref={timelineRef}>
        <div className="timeline-track">
          <div className="timeline-track-fill" ref={fillRef} />
        </div>

        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="timeline-item"
            ref={el => { itemRefs.current[i] = el }}
          >
            <div className="timeline-dot" style={{ color: item.color }}>
              {item.emoji}
            </div>
            <div className="timeline-label" style={{ color: item.color }}>
              {item.label}
            </div>
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection
