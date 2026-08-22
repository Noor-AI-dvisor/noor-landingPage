import React, { useEffect, useRef, useState } from 'react'

const BENEFITS = [
  'Personalised AI guidance for every student',
  'Counsellor dashboard with real-time cohort insights',
  'Gamified skills journeys across 11 career domains',
  'Instant Study Pathway Card generation',
]

const EarlyAccessSection: React.FC = () => {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<{ text: string; color: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const firedRef   = useRef(false)

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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setMsg({ text: '⚠️ Please enter a valid email.', color: '#F5C842' })
      return
    }
    setSending(true)
    setMsg({ text: 'Sending…', color: 'var(--muted)' })
    try {
      const res = await fetch('https://formspree.io/f/xgonkjne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setMsg({ text: "🎉 Thank you! We'll be in touch within 48 hours.", color: '#2EC4B6' })
        setEmail('')
        setInputDisabled(true)
      } else {
        setMsg({ text: '⚠️ Something went wrong. Please email us directly at nooraiadvisor@gmail.com.', color: '#F5C842' })
      }
    } catch {
      setMsg({ text: '⚠️ Network error. Please email us at nooraiadvisor@gmail.com.', color: '#F5C842' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="early-access"
      ref={sectionRef}
      className="py-[clamp(80px,12vh,140px)] px-[clamp(24px,6vw,80px)] md:px-[clamp(64px,13vw,220px)] bg-transparent border-t border-[var(--border)] relative overflow-hidden transition-[background] duration-300"
    >
      {/* Decorative radial */}
      <div className="absolute -bottom-[120px] -left-[120px] w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(29,158,117,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[clamp(48px,7vw,96px)] items-center">

        {/* Left: copy */}
        <div className="ea-left flex flex-col" ref={leftRef}>
          <div className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass mb-6 w-fit">
            <span className="text-[13px] text-accent">✦</span>
            <span className="text-shimmer text-[11px] font-bold tracking-[0.1em] uppercase">Limited Early Access</span>
          </div>

          <h2 className="font-display text-[clamp(36px,4vw,58px)] font-normal leading-[1.1] tracking-[-0.02em] text-[var(--text-h)] mb-5">
            Ready to bring <em className="italic text-accent">Noor</em><br />to your school?
          </h2>

          <p className="text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-[var(--text-b)] max-w-[420px] mb-9">
            We're running free Demos with selected schools right now. Be among the first to see Noor in action — no commitment required.
          </p>

          <div className="flex flex-col gap-3.5">
            {BENEFITS.map(b => (
              <div key={b} className="flex items-center gap-3.5">
                <div className="w-[22px] h-[22px] rounded-[6px] shrink-0 bg-[var(--accent-dim)] border border-[rgba(29,158,117,0.22)] flex items-center justify-center">
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5l3 3 6-6" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[15px] font-medium text-[var(--text-b)] leading-[1.4]">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <div className="ea-right" ref={rightRef}>
          <div className="bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[28px] px-10 py-11 shadow-glass">
            <div className="text-center mb-7">
              <div className="text-[32px] mb-3">🌟</div>
              <h3 className="font-display text-[clamp(20px,2vw,26px)] font-medium leading-[1.2] text-[var(--text-h)] mb-2">
                Request your free Demo
              </h3>
              <p className="text-[13px] text-[var(--text-light)] font-medium leading-[1.5]">
                No credit card · No setup fee · Reply within 48 hrs
              </p>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                id="email-input"
                type="email"
                required
                placeholder="Your school email address"
                value={email}
                disabled={inputDisabled}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-[18px] py-[14px] rounded-xl border-[1.5px] border-[var(--border-s)] bg-[var(--pill-bg)] text-[var(--text-h)] font-sans text-[15px] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-glow)] placeholder:text-[var(--text-light)] disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                className="btn-primary w-full text-center justify-center rounded-xl text-[15px] py-4"
                disabled={sending || inputDisabled}
              >
                {sending ? 'Sending…' : 'Request Free Demo →'}
              </button>
              {msg && (
                <p className="text-[13px] font-medium text-center" style={{ color: msg.color }}>
                  {msg.text}
                </p>
              )}
              <div className="flex gap-3 justify-center flex-wrap pt-1">
                {['✅ No credit card', '📅 Flexible timing', '🤝 Onboarding included'].map(t => (
                  <span key={t} className="text-[11px] font-semibold text-[var(--text-light)]">{t}</span>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EarlyAccessSection
