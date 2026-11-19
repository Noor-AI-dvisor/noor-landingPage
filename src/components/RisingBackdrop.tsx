import React from 'react'
import logo from '../assets/images/logo-primary.png'

// Fixed, non-interactive backdrop: books, school icons and short quotes drift
// upward behind every section. Transform/opacity animation only (cheap), and
// frozen under prefers-reduced-motion.
const ICON_PATHS: Record<string, React.ReactNode> = {
  book: (
    <>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2" />
      <path d="M8 7h7" />
    </>
  ),
  bookOpen: (
    <>
      <path d="M12 7v13" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>
  ),
  cap: (
    <>
      <path d="M21.4 10.9a1 1 0 0 0 0-1.8L12.8 5.2a2 2 0 0 0-1.6 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0z" />
      <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M21.2 6.9a2.1 2.1 0 0 0-3-3L4 18l-1 4 4-1z" />
      <path d="m15 5 4 4" />
    </>
  ),
  bulb: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </>
  ),
  star: <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />,
}

type Item = { x: number; dur: number; delay: number; size: number; icon?: keyof typeof ICON_PATHS; quote?: string; logo?: boolean; label?: string }

const ITEMS: Item[] = [
  { x: 4, dur: 38, delay: -4, size: 34, icon: 'book' },
  { x: 11, dur: 52, delay: -30, size: 0, quote: 'Curiosity first.' },
  { x: 17, dur: 44, delay: -16, size: 30, icon: 'cap' },
  { x: 25, dur: 36, delay: -26, size: 28, icon: 'pencil' },
  { x: 31, dur: 58, delay: -8, size: 0, quote: 'Every student has a spark.' },
  { x: 38, dur: 42, delay: -34, size: 36, icon: 'bookOpen' },
  { x: 45, dur: 48, delay: -20, size: 26, icon: 'bulb' },
  { x: 52, dur: 40, delay: -2, size: 32, icon: 'book' },
  { x: 58, dur: 56, delay: -38, size: 0, quote: 'Learn today, lead tomorrow.' },
  { x: 65, dur: 46, delay: -12, size: 30, icon: 'star' },
  { x: 71, dur: 39, delay: -22, size: 34, icon: 'bookOpen' },
  { x: 78, dur: 50, delay: -42, size: 28, icon: 'cap' },
  { x: 84, dur: 54, delay: -14, size: 0, quote: 'Ask. Explore. Grow.' },
  { x: 90, dur: 37, delay: -28, size: 30, icon: 'pencil' },
  { x: 95, dur: 45, delay: -6, size: 32, icon: 'book' },
  { x: 21, dur: 47, delay: -18, size: 44, logo: true },
  { x: 61, dur: 51, delay: -36, size: 44, logo: true },
  { x: 41, dur: 43, delay: -10, size: 0, label: 'Noor' },
  { x: 88, dur: 55, delay: -24, size: 0, label: 'Noor' },
]

const RisingBackdrop: React.FC = () => (
  <div className="rising-bg" aria-hidden="true">
    {ITEMS.map((it, i) => (
      <span
        key={i}
        className="rising-item"
        style={{
          ['--k' as string]: it.size / 34,
          insetInlineStart: `${it.x}%`,
          animationDuration: `${it.dur}s`,
          animationDelay: `${it.delay}s`,
        }}
      >
        {it.logo ? (
          <img src={logo} alt="" width={it.size * 2} height={it.size * 2} className="rounded-xl" />
        ) : it.label ? (
          <strong className="rising-label font-display">{it.label}</strong>
        ) : it.icon ? (
          <svg width={it.size * 2} height={it.size * 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {ICON_PATHS[it.icon]}
          </svg>
        ) : (
          <em className="rising-quote font-display">{it.quote}</em>
        )}
      </span>
    ))}
  </div>
)

export default RisingBackdrop
