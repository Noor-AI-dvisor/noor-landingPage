import React, { useEffect, useRef } from 'react'
import { usePinnedReveal } from '../hooks/useScrollConnect'
import { EARLY_ACCESS_BENEFITS } from '../data/sections'
import EarlyAccessForm from './EarlyAccessForm'

const BENEFITS = EARLY_ACCESS_BENEFITS.map((b) => b.title)

const EarlyAccessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const firedRef   = useRef(false)

  usePinnedReveal(sectionRef, 55)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return
        firedRef.current = true
        leftRef.current?.classList.add('revealed')
        setTimeout(() => rightRef.current?.classList.add('revealed'), 160)
      },
      { threshold: 0.15 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="early-access"
      ref={sectionRef}
      className="relative py-[clamp(96px,12vh,150px)] px-[clamp(24px,6vw,80px)] md:px-[clamp(64px,13vw,220px)] bg-transparent border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[clamp(48px,7vw,96px)] items-center">

        {/* Left: copy */}
        <div className="ea-left flex flex-col" ref={leftRef}>
          <div className="inline-flex items-center gap-2 px-[20px] py-[9px] rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass mb-6 w-fit">
            <span className="text-[13px] text-accent">✦</span>
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">Limited Early Access</span>
          </div>

          <h2 className="font-sans text-[clamp(36px,4vw,58px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--text-h)] mb-5">
            Ready to bring <span className="text-gradient">Noor</span><br />to your school?
          </h2>

          <p className="text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-[var(--text-b)] max-w-[420px] mb-9">
            We're running free Demos with selected schools right now. Be among the first to see Noor in action — no commitment required.
          </p>

          <div className="flex flex-col gap-3.5">
            {BENEFITS.map(b => (
              <div key={b} className="flex items-center gap-3.5">
                <div className="w-[22px] h-[22px] rounded-[7px] shrink-0 flex items-center justify-center text-[12px] font-extrabold text-accent" style={{ background: 'var(--accent-dim)' }}>
                  ✓
                </div>
                <span className="text-[15px] font-medium text-[var(--text-b)] leading-[1.4]">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <div className="ea-right" ref={rightRef}>
          <EarlyAccessForm />
        </div>
      </div>
    </section>
  )
}

export default EarlyAccessSection
