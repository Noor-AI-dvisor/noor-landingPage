import React from 'react'
import AppMock from './AppMock'

const HeroStage: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-stage" id="hero-stage">
      {/* Left: text */}
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          AI Career &amp; Skills Companion
        </div>
        <h1 className="hero-h1">
          Noor <em>AI Career &amp; Skills</em><br />
          Companion for Schools
        </h1>
        <p className="hero-sub">
          An AI-powered advisor that helps students aged 14–18 choose the right subjects, discover their strengths, and build the skills that actually matter for their future.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => scrollTo('early-access')}>
            Request a free demo →
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('solution-wrap')}>
            See How It Works
          </button>
        </div>
        <div className="hero-chips">
          <span className="hero-chip">🎓 Ages 14–18</span>
          <span className="hero-chip">⚡ 10-min missions</span>
          <span className="hero-chip">🏆 11 skill domains</span>
        </div>
        <div className="trust-pills">
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
      </div>

      {/* Right: app mock */}
      <div className="hero-right">
        <div className="app-mock-wrap">
          <div className="mock-float-streak">
            <div className="streak-top">🔥 3-day streak</div>
            <div className="streak-sub">Keep going!</div>
          </div>
          <div className="mock-float-match">
            <span style={{ fontSize: 16 }}>🧠</span>
            <div>
              <div>AI matched</div>
              <div className="match-sub">3 career paths</div>
            </div>
          </div>
          <div className="mock-float-pts">
            <div className="pts-icon">⭐</div>
            <div>
              <div className="pts-val">120 pts</div>
              <div className="pts-sub">This week</div>
            </div>
          </div>
          <AppMock compact={false} />
        </div>
      </div>
    </section>
  )
}

export default HeroStage
