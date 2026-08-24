import React, { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    num: 1,
    title: 'AI-guided conversation',
    desc: 'Noor engages students through natural, adaptive dialogue — uncovering interests, strengths, and aspirations at their own pace.',
    more: "Unlike static quizzes, Noor's conversations evolve. Each session builds on the last, creating a rich, longitudinal picture of every student's journey. Students feel heard, not assessed.",
  },
  {
    num: 2,
    title: 'Career domains that feel real',
    desc: 'Explore 11 real-world career domains with authentic stories, day-in-the-life experiences, and subject pathway maps.',
    more: "Each domain is curated with UK-specific labour market data, growth projections, and diverse role models. Students discover careers they never knew existed — and connect them to subjects they're studying today.",
  },
  {
    num: 3,
    title: 'Gamified skills journeys',
    desc: 'Bite-sized 10-minute missions build transferable skills across communication, critical thinking, creativity, and more.',
    more: 'Students earn points, unlock badges, and track their progress across a skills map that schools can see. Completion rates are dramatically higher than traditional career learning programmes.',
  },
  {
    num: 4,
    title: 'Counsellor dashboard',
    desc: 'Powerful analytics give counsellors and leaders real-time visibility into student career readiness and engagement.',
    more: 'Filter by year group, subject option group, or at-risk students. Spot intervention opportunities early, evidence destination data, and demonstrate the impact of your careers programme — all in one place.',
  },
]

const DOMAIN_TAGS = ['Healthcare', 'Creative & Media', 'Green Energy', 'Tech & Data']

const SolutionSection: React.FC = () => {
  const introRef        = useRef<HTMLDivElement>(null)
  const rowRefs         = useRef<(HTMLDivElement | null)[]>([])
  const ripple1Ref      = useRef<HTMLDivElement>(null)
  const ripple2Ref      = useRef<HTMLDivElement>(null)
  const [statusText, setStatusText]   = useState('Initialising AI…')
  const [statusReady, setStatusReady] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const hasAnimated = useRef(false)
  const typewriterTarget = "Your school's AI guidance companion — illuminating every student's path."

  useEffect(() => {
    const intro = introRef.current
    if (!intro) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        intro.classList.add('visible')

        setTimeout(() => {
          setStatusText('Noor is ready ✓')
          setStatusReady(true)
          ripple1Ref.current?.classList.add('burst')
          ripple2Ref.current?.classList.add('burst2')
        }, 1000)

        setTimeout(() => {
          let i = 0
          setTypewriterText('')
          const tw = setInterval(() => {
            i++
            setTypewriterText(typewriterTarget.slice(0, i))
            if (i >= typewriterTarget.length) clearInterval(tw)
          }, 24)
        }, 1400)
      },
      { threshold: 0.2 }
    )

    observer.observe(intro)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.2 }
    )
    rowRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="solution-wrap"
      className="relative py-[clamp(96px,12vh,150px)] px-[clamp(24px,5vw,60px)] bg-transparent overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(232,248,241,0.6) 40%, transparent)' }}
    >
      <div className="max-w-[1140px] mx-auto relative">

        {/* Intro */}
        <div className="solution-card text-center max-w-[680px] mx-auto mb-20" ref={introRef}>
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="ripple-ring" ref={ripple1Ref} />
            <div className="ripple-ring" ref={ripple2Ref} />
            <div className="inline-flex items-center gap-2 px-[18px] py-[8px] rounded-full bg-[var(--glass-bg-strong)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass text-[14px] font-bold text-accent">
              <span className={`status-dot${statusReady ? ' ready' : ''}`} />
              {statusText}
            </div>
          </div>

          <h2 className="font-sans text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-[var(--text-h)] mb-4 min-h-[2.4em] sm:min-h-0">
            {typewriterText}
            <span style={{ display: 'inline-block', width: 3, height: '0.9em', background: 'var(--accent)', marginLeft: 2, animation: 'pulse 1s ease-in-out infinite', verticalAlign: 'text-bottom' }} />
          </h2>
          <p className="text-[17px] text-[var(--text-b)] font-medium">Noor means 'light' in Arabic.</p>
        </div>

        {/* Feature 1 — AI-guided conversation */}
        <div className="feature-row grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24" ref={el => { rowRefs.current[0] = el }}>
          <FeatureText f={FEATURES[0]} />
          <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-3.5 transition-transform duration-300 hover:-translate-y-1">
            <div className="self-end max-w-[80%] px-[16px] py-[12px] rounded-[16px_16px_4px_16px] bg-gradient-to-br from-accent to-accent-soft text-white text-[14px] leading-[1.55] font-medium">
              I like designing things but I'm not sure that's a real job…
            </div>
            <div className="self-start max-w-[85%] px-[16px] py-[12px] rounded-[16px_16px_16px_4px] bg-white/85 border border-[var(--border)] text-[14px] leading-[1.55] text-[var(--text-b)]">
              That's a great starting point. Design shows up in more careers than most people think — want to see three that connect to subjects you're already taking?
            </div>
            <div className="flex gap-2 flex-wrap">
              {['Product design', 'Architecture', 'Game art'].map(t => (
                <span key={t} className="px-[13px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 2 — Career domains */}
        <div className="feature-row grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24" ref={el => { rowRefs.current[1] = el }}>
          <div className="md:order-2"><FeatureText f={FEATURES[1]} /></div>
          <div className="md:order-1 relative rounded-[26px] p-6 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass transition-transform duration-300 hover:-translate-y-1">
            <div className="h-[220px] rounded-2xl flex flex-col items-center justify-center gap-2 text-center" style={{ background: 'linear-gradient(150deg, rgba(15,168,143,0.14), rgba(58,159,192,0.1))' }}>
              <div className="text-[48px] font-extrabold text-gradient leading-none">11</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-light)]">Career domains explored</div>
            </div>
            <div className="absolute -bottom-[18px] left-6 right-6 flex gap-2 flex-wrap justify-center">
              {DOMAIN_TAGS.map(t => (
                <span key={t} className="px-4 py-[9px] rounded-full bg-white/90 backdrop-blur-md border border-white text-[12px] font-bold text-[var(--text-h)] shadow-[0_10px_24px_-10px_rgba(13,90,80,0.3)]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 3 — Gamified skills journeys */}
        <div className="feature-row grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24" ref={el => { rowRefs.current[2] = el }}>
          <FeatureText f={FEATURES[2]} />
          <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-[18px] transition-transform duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-center gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent">Mission · 10 min</div>
                <div className="text-[16px] font-bold mt-1 text-[var(--text-h)]">Pitch an idea in 60 seconds</div>
              </div>
              <div className="px-[14px] py-2 rounded-full bg-[var(--accent-dim)] text-accent text-[13px] font-extrabold whitespace-nowrap">+120 pts</div>
            </div>
            <div className="h-[10px] rounded-full bg-[var(--accent-dim)] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft" style={{ width: '68%' }} />
            </div>
            <div className="flex gap-3.5 items-center flex-wrap">
              <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-extrabold text-[12px] shadow-[0_8px_18px_-6px_var(--accent-glow-h)]" style={{ background: 'radial-gradient(circle at 32% 30%, #8ff0da, var(--accent))' }}>Co</span>
              <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-extrabold text-[12px] shadow-[0_8px_18px_-6px_rgba(58,159,192,0.5)]" style={{ background: 'radial-gradient(circle at 32% 30%, #c9f2ff, var(--accent-2))' }}>Cr</span>
              <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-extrabold text-[12px] text-[var(--text-light)]" style={{ background: 'rgba(14,47,44,0.06)', border: '1.5px dashed var(--border-s)' }}>Ct</span>
              <span className="text-[13px] font-semibold text-[var(--text-b)]">Communication · Creativity · Critical thinking</span>
            </div>
          </div>
        </div>

        {/* Feature 4 — Counsellor dashboard */}
        <div className="feature-row grid grid-cols-1 md:grid-cols-2 gap-12 items-center" ref={el => { rowRefs.current[3] = el }}>
          <div className="md:order-2"><FeatureText f={FEATURES[3]} /></div>
          <div className="md:order-1 rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex gap-2 flex-wrap">
              <span className="px-[14px] py-[7px] rounded-full bg-gradient-to-br from-accent to-accent-soft text-white text-[12px] font-bold">Year 10</span>
              <span className="px-[14px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">Option group B</span>
              <span className="px-[14px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">At-risk</span>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/80 border border-[var(--border)]">
                <div className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--text-h)]">72%</div>
                <div className="text-[12px] font-semibold text-[var(--text-b)] mt-0.5">Cohort confidence</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 border border-[var(--border)]">
                <div className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--text-h)]">14</div>
                <div className="text-[12px] font-semibold text-[var(--text-b)] mt-0.5">Students flagged</div>
              </div>
            </div>
            <div className="flex items-end gap-[10px] h-[90px] px-1">
              {[45, 62, 55, 82, 70, 92].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-[8px] rounded-b-[4px]" style={{ height: `${h}%`, background: h > 75 ? 'linear-gradient(180deg, var(--accent-soft), var(--accent))' : `rgba(15,168,143,${0.22 + h / 300})` }} />
              ))}
            </div>
            <div className="text-[12px] font-semibold text-[var(--text-b)]">Engagement by domain · last 6 weeks</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureText: React.FC<{ f: typeof FEATURES[number] }> = ({ f }) => (
  <div>
    <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-accent to-accent-soft text-white flex items-center justify-center font-extrabold text-[18px] shadow-[0_10px_24px_-8px_var(--accent-glow-h)] mb-5">
      {f.num}
    </div>
    <h3 className="text-[clamp(24px,2.6vw,32px)] font-extrabold tracking-[-0.02em] leading-[1.15] text-[var(--text-h)] mb-3.5">{f.title}</h3>
    <p className="text-[17px] leading-[1.6] font-semibold text-[var(--text-b)] mb-3.5">{f.desc}</p>
    <p className="text-[15px] leading-[1.7] text-[var(--text-light)]">{f.more}</p>
  </div>
)

export default SolutionSection
