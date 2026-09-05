import React, { useEffect, useRef, useState } from 'react'
import trophyImg from '../assets/images/awards/trophy-hero.png'
import trophyImgDark from '../assets/images/awards/trophy-hero-dark.png'
import digiCert from '../assets/images/awards/digieduhack-certificate.jpg'
import lpiLogo from '../assets/images/awards/learning-planet-logo.png'
import menaLogo from '../assets/images/awards/mena-dss-logo.png'
import orangeCert from '../assets/images/awards/orange-osvp-certificate.jpg'

interface Stat {
  value: string
  label: string
}

interface Award {
  id: string
  image: string
  imageAlt: string
  fit: 'contain' | 'cover'
  medal: string
  title: string
  org: string
  location: string
  detail?: string
  stats?: Stat[]
  url: string
  linkLabel: string
}

const AWARDS: Award[] = [
  {
    id: 'digieduhack',
    image: digiCert,
    imageAlt: 'DigiEduHack 2025 certificate awarding 2nd place to Team Noor',
    fit: 'cover',
    medal: '🥈',
    title: '2nd Place — DigiEduHack 2025',
    org: 'EduDataHack · European Commission initiative, University of Cyprus',
    location: 'Cyprus',
    url: 'https://digieduhack.com/solutions/noor-an-ai-career-and-skills-companion-for-gen-alpha',
    linkLabel: 'View submission',
  },
  {
    id: 'learning-planet',
    image: lpiLogo,
    imageAlt: 'Learning Planet Institute logo',
    fit: 'contain',
    medal: '🏆',
    title: 'Top 60 Worldwide — Learning Planet YDC 2025–26',
    org: 'Learning Planet Institute, Paris',
    location: 'Paris',
    detail: 'Finalist training bootcamp completed.',
    stats: [
      { value: '702', label: 'projects' },
      { value: '109', label: 'countries' },
      { value: '3,200+', label: 'participants' },
    ],
    url: 'https://projects.learning-planet.org/projects/noor-an-ai-career-and-skills-companion-for-ge/summary',
    linkLabel: 'View project',
  },
  {
    id: 'mena-dss',
    image: menaLogo,
    imageAlt: 'MENA Digital Summer School logo',
    fit: 'contain',
    medal: '🏅',
    title: 'Selected Participant — MENA Digital Summer School 2026',
    org: 'MENA Digital Summer School, Berlin',
    location: 'Berlin',
    detail: 'One of a select cohort chosen from across the Middle East and North Africa.',
    url: 'https://www.mena-ds.com/',
    linkLabel: 'Visit programme',
  },
  {
    id: 'orange-osvp',
    image: orangeCert,
    imageAlt: "Orange Social Venture Prize 2026 certificate, National Women's Prize",
    fit: 'cover',
    medal: '🏆',
    title: "National Women's Prize — Orange Social Venture Prize 2026",
    org: 'Orange Egypt · 16th edition',
    location: 'Egypt',
    url: 'https://www.orange.com/en/our-news/young-entrepreneurs-africa-and-middle-east-apply-2026-osvp',
    linkLabel: 'Read announcement',
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const REST_ROT = { x: -9, y: 17 }

const AwardCube: React.FC<{ image: string; alt: string; fit: 'contain' | 'cover'; medal: string }> = ({
  image,
  alt,
  fit,
  medal,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ w: 260, h: 162.5, d: 30 })
  const [rot, setRot] = useState(REST_ROT)

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      const h = (w * 10) / 16
      setBox({ w, h, d: Math.max(20, w * 0.12) })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return
    const el = sceneRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setRot({ x: (0.5 - py) * 30 - 6, y: (px - 0.5) * 46 + 14 })
  }

  const handleLeave = () => setRot(REST_ROT)

  const { w, h, d } = box
  const sideLeft = (w - d) / 2
  const topOffset = (h - d) / 2

  const face: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
    border: '1px solid var(--gold-dim)',
  }

  return (
    <div
      ref={sceneRef}
      className="relative mb-5"
      style={{ height: h, perspective: 1200 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      tabIndex={0}
    >
      {/* grounding shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ bottom: -d * 0.55, width: w * 0.75, height: d * 0.6, background: 'rgba(0,0,0,0.16)', filter: 'blur(10px)' }}
      />

      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        {/* front — the actual proof */}
        <div
          className="overflow-hidden"
          style={{ ...face, width: w, height: h, background: 'var(--case-mat)', transform: `translateZ(${d / 2}px)` }}
        >
          <img
            src={image}
            alt={alt}
            className={`w-full h-full ${fit === 'contain' ? 'object-contain p-5' : 'object-cover'}`}
            loading="lazy"
          />
        </div>

        {/* back */}
        <div
          className="flex items-center justify-center text-[30px]"
          style={{
            ...face,
            width: w,
            height: h,
            background: 'linear-gradient(135deg, var(--gold-dim), var(--card-bg))',
            transform: `rotateY(180deg) translateZ(${d / 2}px)`,
          }}
          aria-hidden="true"
        >
          {medal}
        </div>

        {/* right */}
        <div
          style={{
            ...face,
            left: sideLeft,
            width: d,
            height: h,
            background: 'linear-gradient(90deg, var(--gold-dim), rgba(0,0,0,0.08))',
            transform: `rotateY(90deg) translateZ(${w / 2}px)`,
          }}
          aria-hidden="true"
        />

        {/* left */}
        <div
          style={{
            ...face,
            left: sideLeft,
            width: d,
            height: h,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.5), var(--gold-dim))',
            transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
          }}
          aria-hidden="true"
        />

        {/* top */}
        <div
          style={{
            ...face,
            top: topOffset,
            width: w,
            height: d,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.55), var(--gold-dim))',
            transform: `rotateX(90deg) translateZ(${h / 2}px)`,
          }}
          aria-hidden="true"
        />

        {/* bottom */}
        <div
          style={{
            ...face,
            top: topOffset,
            width: w,
            height: d,
            background: 'rgba(0,0,0,0.22)',
            transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

const Plaque: React.FC<{ award: Award; index: number }> = ({ award, index }) => {
  return (
    <div
      className="plaque-enter relative rounded-[16px] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-card p-6 text-left overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(0,0,0,0.14)]"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />

      <AwardCube image={award.image} alt={award.imageAlt} fit={award.fit} medal={award.medal} />

      <div className="flex items-start gap-2.5 mb-1.5">
        <span className="text-[17px] leading-none mt-0.5 shrink-0" aria-hidden="true">
          {award.medal}
        </span>
        <h3 className="font-display text-[17px] leading-[1.35] font-medium text-[var(--text-h)]">
          {award.title}
        </h3>
      </div>

      <p className="text-[13px] leading-[1.6] mb-4 pl-[27px] text-[var(--text-b)]">{award.org}</p>

      {award.stats && (
        <div className="flex gap-4 mb-4 pl-[27px]">
          {award.stats.map((s) => (
            <div key={s.label}>
              <div className="text-[15px] font-bold" style={{ color: 'var(--gold-2)' }}>
                {s.value}
              </div>
              <div className="text-[10.5px] tracking-[0.03em] text-[var(--text-light)]">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {award.detail && (
        <p className="text-[13px] leading-[1.6] mb-4 pl-[27px] text-[var(--text-b)]">{award.detail}</p>
      )}

      <div className="flex items-center justify-between pl-[27px] pt-3 border-t border-[var(--border)]">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--gold)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21c-4-4-8-7.58-8-11.5A8 8 0 0 1 12 2a8 8 0 0 1 8 7.5C20 13.42 16 17 12 21z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="9.5" r="2.4" fill="currentColor" />
          </svg>
          {award.location}
        </span>
        <a
          href={award.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--text-h)] hover:text-[var(--gold)] transition-colors"
        >
          {award.linkLabel}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

const AwardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const trophyRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return
        firedRef.current = true
        trophyRef.current?.classList.add('visible')
        gridRef.current?.querySelectorAll('.plaque-enter').forEach((el) => el.classList.add('visible'))
      },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative overflow-hidden py-[clamp(72px,10vh,120px)] px-[clamp(24px,6vw,80px)] bg-[var(--bg)] border-t border-[var(--border)] transition-[background] duration-300"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, var(--gold-dim) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1180px] mx-auto">
        <div className="flex flex-col items-center text-center mb-[clamp(48px,7vh,80px)]">
          <div ref={trophyRef} className="trophy-enter animate-badge-float w-[190px] sm:w-[230px] mb-8" style={{ animationDuration: '7s' }}>
            <img
              src={trophyImg}
              alt="The Orange Social Venture Prize trophy awarded to Noor"
              className="block dark:hidden w-full h-auto"
              style={{ filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.28))' }}
            />
            <img
              src={trophyImgDark}
              alt="The Orange Social Venture Prize trophy awarded to Noor"
              className="hidden dark:block w-full h-auto"
              style={{ filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.45))' }}
            />
          </div>

          <span
            className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] mb-4"
            style={{ color: 'var(--gold)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="currentColor"
              />
            </svg>
            International recognition
          </span>

          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.15] tracking-[-0.015em] mb-5 text-[var(--text-h)]">
            Four juries, four countries —<br className="hidden sm:block" /> the same verdict.
          </h2>

          <p className="text-[clamp(15px,1.1vw,17px)] leading-[1.75] max-w-[540px] text-[var(--text-b)]">
            Cyprus, Paris, Berlin, and Egypt each looked at Noor independently over the past year. All four said yes.
          </p>
        </div>

        <div
          className="hidden lg:block h-px w-full mb-10"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--gold-dim) 15%, var(--gold) 50%, var(--gold-dim) 85%, transparent)',
          }}
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AWARDS.map((award, i) => (
            <Plaque key={award.id} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AwardsSection
