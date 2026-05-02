import React from 'react'
import AppMock from './AppMock'

const HeroMobile: React.FC = () => {
  return (
    <section className="hero-mobile" id="hero-mobile">
      <div className="hero-mobile-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow" style={{ marginBottom: 16 }}>
          <span className="hero-eyebrow-dot" />
          AI Career &amp; Skills Companion
        </div>

        {/* Heading */}
        <h1>
          Noor <em>AI Career &amp; Skills</em><br />
          Companion for Schools
        </h1>

        {/* Subtitle */}
        <p className="hero-mobile-sub">
          An AI-powered advisor that helps students aged 14–18 choose the right subjects, discover their strengths, and build the skills that actually matter for their future.
        </p>

        {/* CTAs */}
        <div className="hero-mobile-ctas">
          <button
            className="btn-primary"
            onClick={() => {
              const el = document.getElementById('early-access')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Request a Free Demo →
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              const el = document.getElementById('solution-wrap')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            See How It Works
          </button>
        </div>

        {/* Chips */}
        <div className="hero-chips">
          <span className="hero-chip">🎓 Ages 14–18</span>
          <span className="hero-chip">⚡ 10-min missions</span>
          <span className="hero-chip">🏆 11 skill domains</span>
        </div>

        {/* Trust pills */}
        <div className="trust-pills" style={{ marginBottom: 28 }}>
          <div className="trust-pill" style={{ background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.2)' }}>
            <div className="trust-dot" style={{ background: '#1D9E75' }} />
            <span style={{ color: '#1D9E75' }}>Personalised pathways</span>
          </div>
          <div className="trust-pill" style={{ background: 'rgba(29,158,117,0.06)', border: '1px solid rgba(29,158,117,0.16)' }}>
            <div className="trust-dot" style={{ background: '#1D9E75' }} />
            <span style={{ color: '#1D9E75' }}>Real-time AI</span>
          </div>
          <div className="trust-pill" style={{ background: 'rgba(43,67,189,0.07)', border: '1px solid rgba(43,67,189,0.18)' }}>
            <div className="trust-dot" style={{ background: '#2B43BD' }} />
            <span style={{ color: '#2B43BD' }}>Career intelligence</span>
          </div>
        </div>

        {/* App mock (compact) */}
        <AppMock compact={true} />
      </div>
    </section>
  )
}

export default HeroMobile
