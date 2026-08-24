import React, { useEffect, useRef } from 'react'
import { HelpCircleIcon, HourglassIcon, DocumentIcon, ChartBarIcon } from './Icons'

const TIMELINE_DELAYS = [0, 160, 320, 480]

const ITEMS = [
  {
    Icon: HelpCircleIcon, color: 'var(--accent)', tilt: 'l' as const,
    label: 'Awareness',
    title: 'Students guess, not choose',
    desc: 'Most teens pick subjects based on friends or "what seems easier" — not a clear link to their strengths or future careers.',
  },
  {
    Icon: HourglassIcon, color: 'var(--accent-2)', tilt: 'r' as const,
    label: 'Capacity',
    title: 'Counsellors are stretched',
    desc: 'One counsellor supports hundreds of students — repeating the same basic conversations instead of doing meaningful guidance.',
  },
  {
    Icon: DocumentIcon, color: 'var(--accent)', tilt: 'l' as const,
    label: 'Tools',
    title: 'Static tools for dynamic choices',
    desc: "Subject options live in long PDFs. There's no interactive way to test the fit between a student's profile and their future options.",
  },
  {
    Icon: ChartBarIcon, color: 'var(--accent-2)', tilt: 'r' as const,
    label: 'Visibility',
    title: 'Leadership has no visibility',
    desc: "School leaders can't easily see which cohorts are confident, which domains are in demand, or who still needs support.",
  },
]

// Cascading offsets copied from the reference design so cards drift right
// as they descend, capped so they never overflow the section.
const CARD_OFFSETS = [
  '0px',
  'max(0px,min(17%,190px,calc(100% - 560px)))',
  'max(0px,min(34%,380px,calc(100% - 560px)))',
  'max(0px,min(50%,570px,calc(100% - 560px)))',
]
const CONNECTOR_OFFSETS = [
  'max(0px,min(24%,270px,calc(60% - 336px)))',
  'max(0px,min(41%,460px,calc(75% - 420px)))',
  'max(0px,min(58%,650px,calc(90% - 504px)))',
]

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const stackRef   = useRef<HTMLDivElement>(null)
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([])
  const firedRef   = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return
        firedRef.current = true

        leftRef.current?.classList.add('revealed')
        stackRef.current?.classList.add('revealed')

        TIMELINE_DELAYS.forEach((delay, i) => {
          setTimeout(() => {
            itemRefs.current[i]?.classList.add('visible')
          }, delay)
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-transparent px-[clamp(24px,6vw,80px)] py-[clamp(96px,12vh,150px)] overflow-hidden max-w-[2800px] mx-auto"
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ top: '-140px', right: '-120px', width: 460, height: 460, background: 'radial-gradient(circle, var(--mesh-2), transparent 65%)', filter: 'blur(20px)' }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ bottom: '-160px', left: '-100px', width: 420, height: 420, background: 'radial-gradient(circle, var(--mesh-1), transparent 65%)', filter: 'blur(20px)' }}
      />

      <div className="max-w-[1140px] mx-auto relative">
        {/* Header row */}
        <div className="problem-left grid grid-cols-1 md:grid-cols-2 gap-10 items-end" ref={leftRef}>
          <div>
            <div className="inline-flex items-center gap-2 px-[18px] py-[8px] mb-5 rounded-full text-[12px] font-bold uppercase tracking-[0.12em]" style={{ background: 'rgba(15,168,143,0.1)', border: '1px solid rgba(15,168,143,0.3)', color: 'var(--accent)' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-accent shrink-0 animate-pulse-dot" />
              The Problem
            </div>
            <h2 className="font-sans text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--text-h)]">
              Subject choice is{' '}
              <span className="relative inline-block">
                broken
                <span className="absolute left-0 right-0 bottom-[6px] h-[10px] rounded-[3px] -z-10" style={{ background: 'rgba(58,159,192,0.35)' }} />
              </span>{' '}
              —<br />and schools know it.
            </h2>
          </div>
          <p className="text-[18px] leading-[1.65] text-[var(--text-b)] max-w-[420px] pb-1.5">
            Students make life-defining decisions with one meeting, a PDF booklet, and a guess. The current system is failing them — and counsellors.
          </p>
        </div>

        {/* Cascading card stack */}
        <div className="problem-timeline flex flex-col mt-20" ref={stackRef}>
          {ITEMS.map((item, i) => (
            <React.Fragment key={item.label}>
              <div
                className="timeline-item relative w-full sm:w-[min(560px,100%)]"
                style={{ marginLeft: CARD_OFFSETS[i] }}
                ref={el => { itemRefs.current[i] = el }}
              >
                <div
                  className="hidden sm:block absolute rounded-[24px]"
                  style={
                    item.tilt === 'l'
                      ? { top: 18, left: 18, right: -14, bottom: -14, background: 'linear-gradient(165deg, rgba(15,168,143,0.16), rgba(58,159,192,0.12))' }
                      : { top: 18, left: -14, right: 18, bottom: -14, background: 'linear-gradient(195deg, rgba(58,159,192,0.14), rgba(15,168,143,0.14))' }
                  }
                />
                <div
                  className={`problem-card tilt-${item.tilt} relative p-[1px] rounded-[24px]`}
                  style={{
                    background: item.tilt === 'l'
                      ? 'linear-gradient(165deg, rgba(15,168,143,0.45), rgba(255,255,255,0.95) 45%, rgba(58,159,192,0.25))'
                      : 'linear-gradient(195deg, rgba(58,159,192,0.4), rgba(255,255,255,0.95) 45%, rgba(15,168,143,0.25))',
                  }}
                >
                  <div className="relative box-border p-[30px_32px] rounded-[23px] overflow-hidden" style={{ background: item.tilt === 'l' ? 'linear-gradient(170deg,#ffffff,#f0faf6)' : 'linear-gradient(170deg,#ffffff,#f0f7fa)' }}>
                    <div className="absolute top-[6px] right-4 font-extrabold leading-none tracking-[-0.04em] text-[76px]" style={{ color: item.tilt === 'l' ? 'rgba(15,168,143,0.1)' : 'rgba(58,159,192,0.12)' }}>
                      0{i + 1}
                    </div>
                    <div className="inline-flex items-center gap-[7px] px-[14px] py-[6px] rounded-full text-[11px] font-bold uppercase tracking-[0.1em] mb-[18px]" style={{ background: item.tilt === 'l' ? 'rgba(15,168,143,0.1)' : 'rgba(58,159,192,0.12)', color: item.color }}>
                      <item.Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      {item.label}
                    </div>
                    <h3 className="m-0 mb-3 text-[19px] font-bold tracking-[-0.01em] text-[var(--text-h)]">{item.title}</h3>
                    <p className="m-0 text-[14.5px] leading-[1.65] text-[var(--text-b)]">{item.desc}</p>
                  </div>
                </div>
              </div>
              {i < ITEMS.length - 1 && (
                <div className="hidden sm:block problem-connector" style={{ marginLeft: CONNECTOR_OFFSETS[i] }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
