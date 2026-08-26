import React, { useState } from 'react'
import { CalendarIcon, UsersIcon, CheckIcon } from './Icons'

export default function EarlyAccessForm() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<{ text: string; color: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setMsg({ text: '⚠️ Please enter a valid email.', color: 'var(--accent-amber)' })
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
        setMsg({ text: "🎉 Thank you! We'll be in touch within 48 hours.", color: 'var(--accent)' })
        setEmail('')
        setInputDisabled(true)
      } else {
        setMsg({ text: '⚠️ Something went wrong. Please email us directly at nooraiadvisor@gmail.com.', color: 'var(--accent-amber)' })
      }
    } catch {
      setMsg({ text: '⚠️ Network error. Please email us at nooraiadvisor@gmail.com.', color: 'var(--accent-amber)' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[30px] px-10 py-11 shadow-glass text-center">
      <div
        className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-[18px] mx-auto mb-4 animate-badge-float"
        style={{ background: 'radial-gradient(circle at 32% 28%, #8ff0da, var(--accent))', boxShadow: '0 12px 26px -8px var(--accent-glow-h)' }}
      >
        ✦
      </div>
      <h3 className="font-sans text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.2] tracking-[-0.01em] text-[var(--text-h)] mb-2">
        Request your free Demo
      </h3>
      <p className="text-[13.5px] text-[var(--text-light)] font-semibold leading-[1.5] mb-7">
        No credit card · No setup fee · Reply within 48 hrs
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Your school email address"
          value={email}
          disabled={inputDisabled}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-[20px] py-[16px] rounded-2xl border-[1.5px] border-[var(--border-s)] bg-white/85 text-[var(--text-h)] font-sans text-[14.5px] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-glow)] placeholder:text-[var(--text-light)] disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          className="btn-primary w-full text-center justify-center text-[15px] py-4"
          disabled={sending || inputDisabled}
        >
          {sending ? 'Sending…' : 'Request Free Demo →'}
        </button>
        {msg && (
          <p className="text-[13px] font-medium text-center" style={{ color: msg.color }}>
            {msg.text}
          </p>
        )}
        <div className="flex gap-2 justify-center flex-wrap pt-1">
          {[
            { Icon: CheckIcon, label: 'No credit card' },
            { Icon: CalendarIcon, label: 'Flexible timing' },
            { Icon: UsersIcon, label: 'Onboarding included' },
          ].map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-[6px] px-[13px] py-[7px] rounded-full bg-white/80 border border-[var(--border)] text-[11px] font-bold text-[var(--text-b)]">
              <Icon className="w-3 h-3 shrink-0 text-accent" />
              {label}
            </span>
          ))}
        </div>
      </form>
    </div>
  )
}
