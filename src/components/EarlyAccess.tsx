import React, { useEffect, useRef, useState } from 'react'

const BENEFITS = [
  'Personalised AI guidance for every student',
  'Counsellor dashboard with real-time cohort insights',
  'Gamified skills journeys across 11 career domains',
  'Instant Study Pathway Card generation',
]

const EarlyAccessSection: React.FC = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef   = useRef<HTMLDivElement>(null)
  const rightRef  = useRef<HTMLDivElement>(null)
  const firedRef  = useRef(false)

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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    const subject = encodeURIComponent('Early Access Request — Noor AI')
    const body = encodeURIComponent(`Contact email: ${email}\n\nInterested in a free Demo.`)
    window.location.href = `mailto:nooraiadvisor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section className="ea-section" id="early-access" ref={sectionRef}>
      <div className="ea-inner">

        {/* Left: copy */}
        <div className="ea-left" ref={leftRef}>
          <div className="ea-eyebrow">✦ Limited Early Access</div>
          <h2 className="ea-h2">
            Ready to bring <em>Noor</em><br />to your school?
          </h2>
          <p className="ea-lead">
            We're running free Demos with selected schools right now. Be among the first to see Noor in action — no commitment required.
          </p>
          <div className="ea-benefits">
            {BENEFITS.map(b => (
              <div key={b} className="ea-benefit">
                <div className="ea-benefit-icon">
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5l3 3 6-6" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="ea-benefit-text">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <div className="ea-right" ref={rightRef}>
          {submitted ? (
            <div className="ea-card ea-card-success">
              <div className="ea-success-emoji">🎉</div>
              <h3 className="ea-card-title">You're on the list!</h3>
              <p className="ea-card-body">
                We'll reach out within <strong>48 hours</strong> to discuss your school's free Demo. Exciting things ahead!
              </p>
            </div>
          ) : (
            <div className="ea-card">
              <div className="ea-card-top">
                <div className="ea-card-emoji">🌟</div>
                <h3 className="ea-card-title">Request your free Demo</h3>
                <p className="ea-card-sub">No credit card · No setup fee · Reply within 48 hrs</p>
              </div>
              <form className="ea-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Your school email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className={`ea-input${focused ? ' focused' : ''}`}
                />
                <button type="submit" className="btn-primary ea-submit">
                  Request Free Demo →
                </button>
                <div className="ea-trust-row">
                  {['✅ No credit card', '📅 Flexible timing', '🤝 Onboarding included'].map(t => (
                    <span key={t} className="ea-trust-badge">{t}</span>
                  ))}
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default EarlyAccessSection
