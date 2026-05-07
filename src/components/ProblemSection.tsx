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
    desc: "Subject options live in long PDFs. There's no interactive way to test the fit between a student's profile and their future options.",
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

        leftRef.current?.classList.add('revealed')
        timelineRef.current?.classList.add('revealed')

        const totalMs = TIMELINE_DELAYS[TIMELINE_DELAYS.length - 1] + 600
        const start = performance.now()
        const fill = fillRef.current

        const animFill = (now: number) => {
          const p = Math.min((now - start) / totalMs, 1)
          if (fill) fill.style.height = `${p * 100}%`
          if (p < 1) requestAnimationFrame(animFill)
        }
        requestAnimationFrame(animFill)

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
    <section
      id="problem"
      ref={sectionRef}
      className="min-h-screen bg-[var(--bg)] grid grid-cols-1 md:grid-cols-2 items-center gap-[clamp(40px,6vw,100px)] px-[clamp(24px,6vw,80px)] md:px-0 md:pl-[clamp(100px,17vw,300px)] md:pr-[clamp(64px,13vw,220px)] py-[clamp(48px,6vh,72px)] pb-[100px] relative overflow-hidden transition-[background] duration-300 max-w-[2800px] mx-auto"
    >
      {/* Decorative radial */}
      <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(43,67,189,0.08) 0%, transparent 70%)' }} />

      {/* Left */}
      <div className="problem-left flex flex-col" ref={leftRef}>
        <div className="problem-eyebrow-pill inline-flex items-center gap-[7px] px-[13px] py-[5px] rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 w-fit border" style={{ background: 'rgba(43,67,189,0.1)', color: '#2b43bd', borderColor: 'rgba(43,67,189,0.2)' }}>
          <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3.5" fill="currentColor"/></svg>
          The Problem
        </div>

        <h2 className="font-display text-[clamp(38px,4.2vw,62px)] font-normal leading-[1.12] tracking-[-0.02em] text-[var(--text-h)] mb-5">
          Subject choice is broken —<br /><em className="italic text-accent">and schools know it.</em>
        </h2>

        <p className="text-[clamp(16px,1.2vw,19px)] leading-[1.75] text-[var(--text-b)] max-w-[420px] font-normal">
          Students make life-defining decisions with one meeting, a PDF booklet, and a guess. The current system is failing them — and counsellors.
        </p>
      </div>

      {/* Right: timeline */}
      <div className="problem-timeline relative flex flex-col pl-8" ref={timelineRef}>
        <div className="timeline-track">
          <div className="timeline-track-fill" ref={fillRef} />
        </div>

        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="timeline-item relative pb-9 last:pb-0 pl-5"
            ref={el => { itemRefs.current[i] = el }}
          >
            <div className="timeline-dot" style={{ color: item.color }}>
              {item.emoji}
            </div>
            <div className="text-[12px] font-bold tracking-[0.08em] uppercase mb-[5px] opacity-70" style={{ color: item.color }}>
              {item.label}
            </div>
            <div className="text-[clamp(18px,1.6vw,22px)] font-bold text-[var(--text-h)] leading-[1.25] mb-[7px]">
              {item.title}
            </div>
            <div className="text-[15.5px] leading-[1.7] text-[var(--text-b)] max-w-[380px]">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection
