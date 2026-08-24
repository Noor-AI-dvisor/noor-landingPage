import React from 'react'
import AppMock from './AppMock'
import { GraduationCapIcon, BoltIcon, TrophyIcon, FlameIcon, BrainIcon, StarIcon } from './Icons'

const CHIPS = [
  { Icon: GraduationCapIcon, label: 'Ages 14–18' },
  { Icon: BoltIcon, label: '10-min missions' },
  { Icon: TrophyIcon, label: '11 skill domains' },
]

const HeroStage: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero-stage"
      className="hidden lg:grid grid-cols-2 items-center min-h-screen bg-transparent max-w-[2800px] mx-auto"
    >
      {/* Left: text */}
      <div className="flex flex-col justify-center px-[clamp(64px,13vw,220px)] pr-[clamp(16px,1.5vw,24px)] pt-[clamp(100px,12vh,140px)] pb-[clamp(80px,10vh,120px)]">

        <div className="inline-flex items-center gap-2 w-fit mb-6 px-[18px] py-[9px] rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass">
          <span className="w-[7px] h-[7px] rounded-full bg-accent shrink-0 animate-status-pulse" />
          <span className="text-[13px] font-semibold text-accent">For schools · Ages 14–18</span>
        </div>

        <h1 className="font-sans text-[clamp(34px,4.5vw,58px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--text-h)] mb-5">
          Noor AI Career &amp; Skills<br />Companion for Schools
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
          {CHIPS.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 px-3 py-[5px] bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-full text-[0.78rem] font-medium text-[var(--text-b)]">
              <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Right: app mock */}
      <div className="flex flex-col justify-center items-center pl-[clamp(16px,1.5vw,24px)] pr-[clamp(64px,13vw,220px)] pt-[clamp(100px,12vh,140px)] pb-[clamp(80px,10vh,120px)]">
        <div className="relative w-full max-w-[480px]">
          {/* Streak badge */}
          <div className="absolute top-[24%] -left-16 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[14px] py-[9px] shadow-badge-float flex flex-col text-[11px] z-10 animate-badge-float">
            <div className="font-bold text-[var(--text-h)] flex items-center gap-1.5 text-[12px]">
              <FlameIcon className="w-3.5 h-3.5 text-[var(--accent-amber)] shrink-0" /> 3-day streak
            </div>
            <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)] mt-0.5">Keep going!</div>
          </div>

          {/* Match badge */}
          <div className="absolute -right-3 top-[45%] bg-[var(--text-h)] text-[var(--bg)] rounded-[10px] px-3 py-2 flex items-center gap-[7px] text-[11px] font-bold shadow-badge-float whitespace-nowrap z-10 animate-badge-float [animation-delay:-3s]">
            <BrainIcon className="w-4 h-4 shrink-0" />
            <div>
              <div>AI matched</div>
              <div className="font-medium opacity-65 text-[10px]">3 career paths</div>
            </div>
          </div>

          {/* Points badge */}
          <div className="absolute -bottom-3 -left-3 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[13px] py-2 flex items-center gap-2 shadow-badge-float text-[11px] z-10 animate-badge-float [animation-delay:-1.5s]">
            <div className="w-7 h-7 rounded-lg bg-[#fbe8c8] flex items-center justify-center">
              <StarIcon className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
            </div>
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
