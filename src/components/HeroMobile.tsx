import React from 'react'
import AppMock from './AppMock'
import badgeButterfly from '../assets/images/badge-butterfly.png'

const HeroMobile: React.FC = () => {
  return (
    <section
      id="hero-mobile"
      className="lg:hidden flex flex-col justify-center min-h-screen px-6 pt-[100px] pb-[60px] relative overflow-hidden bg-transparent transition-[background] duration-300"
    >

      <div className="relative z-10 max-w-[480px] mx-auto w-full">

        <div className="relative inline-flex items-center mb-4 w-fit">
          <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 shadow-glass">
            <img src={badgeButterfly} alt="" className="w-full h-full rounded-full object-cover" />
            <span
              className="absolute inset-0 rounded-full animate-status-pulse"
              style={{ boxShadow: "0 0 0 4px rgba(245,158,11,0.22)" }}
            />
          </span>
          <span className="-ml-3.5 pl-4 pr-4 py-[6px] rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[var(--text-h)]">
            AI Career &amp; Skills Companion
          </span>
        </div>

        <h1 className="font-display text-[clamp(1.8rem,6vw,2.8rem)] font-medium leading-[1.2] mb-4 text-[var(--text-h)]">
          Noor <em className="italic text-accent">AI Career &amp; Skills</em><br />
          Companion for Schools
        </h1>

        <p className="text-[0.95rem] leading-[1.65] text-[var(--text-b)] mb-7">
          An AI-powered advisor that helps students aged 14–18 choose the right subjects, discover their strengths, and build the skills that actually matter for their future.
        </p>

        <div className="flex flex-col gap-2.5 mb-6">
          <button
            className="btn-primary text-center"
            onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request a Free Demo →
          </button>
          <button
            className="btn-secondary text-center"
            onClick={() => document.getElementById('solution-wrap')?.scrollIntoView({ behavior: 'smooth' })}
          >
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

        <div className="flex flex-wrap gap-2 mb-7">
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

        <AppMock compact={true} />
      </div>
    </section>
  )
}

export default HeroMobile
