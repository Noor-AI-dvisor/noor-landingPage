import React from 'react'
import AppMock from './AppMock'
import { GraduationCapIcon, BoltIcon, TrophyIcon } from './Icons'

const CHIPS = [
  { Icon: GraduationCapIcon, label: 'Ages 14–18' },
  { Icon: BoltIcon, label: '10-min missions' },
  { Icon: TrophyIcon, label: '11 skill domains' },
]

const HeroMobile: React.FC = () => {
  return (
    <section
      id="hero-mobile"
      className="lg:hidden flex flex-col justify-center min-h-screen px-6 pt-[100px] pb-[60px] relative overflow-hidden bg-transparent"
    >

      <div className="relative z-10 max-w-[480px] mx-auto w-full">

        <div className="inline-flex items-center gap-2 w-fit mb-5 px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass">
          <span className="w-[7px] h-[7px] rounded-full bg-accent shrink-0 animate-status-pulse" />
          <span className="text-[12px] font-semibold text-accent">For schools · Ages 14–18</span>
        </div>

        <h1 className="font-sans text-[clamp(1.8rem,6vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.02em] mb-4 text-[var(--text-h)]">
          Noor AI Career &amp; Skills<br />Companion for Schools
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
          {CHIPS.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 px-3 py-[5px] bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-full text-[0.78rem] font-medium text-[var(--text-b)]">
              <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(15,168,143,0.09)', border: '1px solid rgba(15,168,143,0.22)' }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
            <span style={{ color: 'var(--accent)' }}>Personalised pathways</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(15,168,143,0.06)', border: '1px solid rgba(15,168,143,0.16)' }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
            <span style={{ color: 'var(--accent)' }}>Real-time AI</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(58,159,192,0.08)', border: '1px solid rgba(58,159,192,0.2)' }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--accent-2)' }} />
            <span style={{ color: 'var(--accent-2)' }}>Career intelligence</span>
          </div>
        </div>

        <AppMock compact={true} />
      </div>
    </section>
  )
}

export default HeroMobile
