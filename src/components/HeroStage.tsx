import React from 'react'
import AppMock from './AppMock'
import badgeButterfly from '../assets/images/badge-butterfly.png'

const HeroStage: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero-stage"
      className="hidden lg:grid grid-cols-2 items-center min-h-screen bg-transparent transition-[background] duration-300 max-w-[2800px] mx-auto"
    >
      {/* Left: text */}
      <div className="flex flex-col justify-center px-[clamp(64px,13vw,220px)] pr-[clamp(16px,1.5vw,24px)] pt-[clamp(100px,12vh,140px)] pb-[clamp(80px,10vh,120px)]">

        <div className="relative inline-flex items-center mb-5 w-fit">
          <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full shrink-0 shadow-glass">
            <img src={badgeButterfly} alt="" className="w-full h-full rounded-full object-cover" />
            <span
              className="absolute inset-0 rounded-full animate-status-pulse"
              style={{ boxShadow: "0 0 0 5px rgba(245,158,11,0.22)" }}
            />
          </span>
          <span className="-ml-4 pl-5 pr-5 py-[7px] rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass text-[0.72rem] font-bold tracking-[0.09em] uppercase text-[var(--text-h)]">
            AI Career &amp; Skills Companion
          </span>
        </div>

        <h1 className="font-sans text-[clamp(34px,4.5vw,58px)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--text-h)] mb-5">
          Noor <em className="not-italic font-normal font-display text-accent">AI Career &amp; Skills</em><br />
          Companion for Schools
        </h1>

        <p className="text-[1.05rem] font-normal text-[var(--text-b)] leading-[1.65] max-w-[480px] mb-8">
          An AI-powered advisor that helps students aged 14–18 choose the right subjects, discover their strengths, and build the skills that actually matter for their future.
        </p>

        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button className="btn-primary" onClick={() => scrollTo('early-access')}>
            Request a free demo →
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('solution-wrap')}>
            See How It Works
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {['🎓 Ages 14–18', '⚡ 10-min missions', '🏆 11 skill domains'].map((chip) => (
            <span key={chip} className="px-3 py-[5px] bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-full text-[0.78rem] font-medium text-[var(--text-b)]">
              {chip}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.2)' }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: '#1D9E75' }} />
            <span style={{ color: '#1D9E75' }}>Personalised pathways</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(29,158,117,0.06)', border: '1px solid rgba(29,158,117,0.16)' }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: '#1D9E75' }} />
            <span style={{ color: '#1D9E75' }}>Real-time AI</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(43,67,189,0.07)', border: '1px solid rgba(43,67,189,0.18)' }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: '#2B43BD' }} />
            <span style={{ color: '#2B43BD' }}>Career intelligence</span>
          </div>
        </div>
      </div>

      {/* Right: app mock */}
      <div className="flex flex-col justify-center items-center pl-[clamp(16px,1.5vw,24px)] pr-[clamp(64px,13vw,220px)] pt-[clamp(100px,12vh,140px)] pb-[clamp(80px,10vh,120px)]">
        <div className="relative w-full max-w-[480px]">
          {/* Streak badge */}
          <div className="absolute top-[24%] -left-16 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[14px] py-[9px] shadow-badge-float flex flex-col text-[11px] z-10 animate-badge-float">
            <div className="font-bold text-[var(--text-h)] flex items-center gap-1 text-[12px]">🔥 3-day streak</div>
            <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)] mt-0.5">Keep going!</div>
          </div>

          {/* Match badge */}
          <div className="absolute -right-3 top-[45%] bg-[var(--text-h)] text-[var(--bg)] rounded-[10px] px-3 py-2 flex items-center gap-[7px] text-[11px] font-bold shadow-badge-float whitespace-nowrap z-10 animate-badge-float [animation-delay:-3s] transition-[background,color] duration-300">
            <span className="text-[16px]">🧠</span>
            <div>
              <div>AI matched</div>
              <div className="font-medium opacity-65 text-[10px]">3 career paths</div>
            </div>
          </div>

          {/* Points badge */}
          <div className="absolute -bottom-3 -left-3 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[13px] py-2 flex items-center gap-2 shadow-badge-float text-[11px] z-10 animate-badge-float [animation-delay:-1.5s]">
            <div className="w-7 h-7 rounded-lg bg-[#fef3c7] flex items-center justify-center text-sm">⭐</div>
            <div>
              <div className="font-bold text-[var(--text-h)] text-[13px]">120 pts</div>
              <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)]">This week</div>
            </div>
          </div>

          <AppMock compact={false} />
        </div>
      </div>
    </section>
  )
}

export default HeroStage
