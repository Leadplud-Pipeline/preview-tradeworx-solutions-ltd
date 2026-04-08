import { ArrowRight, Phone, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import siteData from '../siteData'

// ── Typewriter rotating badge ──────────────────────────────────
const BADGE_MESSAGES = ['Fully Insured', 'Family Run Business', 'Trusted']
const TYPE_SPEED   = 70   // ms per character typed
const DELETE_SPEED = 40   // ms per character deleted
const HOLD_MS      = 1800 // ms to hold the completed word before deleting

function TypewriterBadge() {
  const [displayed, setDisplayed] = useState('')
  const [msgIndex, setMsgIndex]   = useState(0)
  const [phase, setPhase]         = useState<'typing' | 'holding' | 'deleting'>('typing')

  useEffect(() => {
    const target = BADGE_MESSAGES[msgIndex]

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('holding'), HOLD_MS)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'holding') {
      setPhase('deleting')
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setMsgIndex(i => (i + 1) % BADGE_MESSAGES.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, msgIndex])

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '999px',
      padding: '5px 14px',
      marginBottom: '1.5rem',
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="6" fill="var(--color-accent)" opacity="0.3" />
        <path d="M3.5 6l2 2 3-3" stroke="var(--color-accent)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Fixed-width container so pill doesn't resize as text changes */}
      <span style={{
        color: 'rgba(255,255,255,0.85)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-body)',
        display: 'inline-block',
        minWidth: '160px',   // wide enough for longest message
      }}>
        {displayed}
        {/* Blinking cursor */}
        <span style={{
          display: 'inline-block',
          width: '1.5px',
          height: '10px',
          backgroundColor: 'var(--color-accent)',
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'blink 0.7s step-end infinite',
        }} aria-hidden="true" />
      </span>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

// ── Inline style objects (guarantee rendering regardless of Tailwind load order) ──

const s = {
  section: (extra?: React.CSSProperties): React.CSSProperties => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: '88vh',
    paddingTop: '72px',
    overflow: 'hidden',
    backgroundColor: 'var(--color-primary)',
    ...extra,
  }),
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1.25rem',
  } as React.CSSProperties,
  eyebrowLine: {
    width: '28px',
    height: '2px',
    backgroundColor: 'var(--color-accent)',
    flexShrink: 0,
  } as React.CSSProperties,
  eyebrowText: {
    color: 'var(--color-accent)',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },
  h1: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1.1,
    marginBottom: '1.25rem',
  } as React.CSSProperties,
  sub: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: '1.1rem',
    lineHeight: 1.65,
    marginBottom: '2.25rem',
    maxWidth: '500px',
  } as React.CSSProperties,
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
    marginBottom: '2rem',
  } as React.CSSProperties,
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    padding: '1rem 1.75rem',
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 0.18s ease',
  } as React.CSSProperties,
  btnGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '1rem 1.75rem',
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    fontWeight: 600,
    border: '2px solid rgba(255,255,255,0.35)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'border-color 0.18s ease, background-color 0.18s ease',
  } as React.CSSProperties,
  trustRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '16px 24px',
  } as React.CSSProperties,
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    color: 'rgba(255,255,255,0.58)',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
  } as React.CSSProperties,
}

function Eyebrow() {
  return (
    <div style={s.eyebrow}>
      <span style={s.eyebrowLine} aria-hidden="true" />
      <span style={s.eyebrowText}>
        {siteData.trade} &middot; {siteData.city}
      </span>
    </div>
  )
}

function TrustItems() {
  return (
    <div style={s.trustRow}>
      {siteData.trustItems.map((item, i) => (
        <span key={i} style={s.trustItem}>
          <CheckCircle size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  )
}

// ── Geometric decorations ──────────────────────────────────

function DotPattern() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }}
    />
  )
}

function AccentCircle({ size = 400, opacity = 0.07, right = '-60px', top = '-80px' }: {
  size?: number; opacity?: number; right?: string; top?: string
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right, top,
        width: size, height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent)',
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}

// ── Variant A: Split with stacked CTA panel (default) ─────
function HeroA() {
  const { hero, phone, trustItems, yearsExperience } = siteData
  return (
    <section style={s.section()} aria-label="Hero">
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />
      <AccentCircle size={480} opacity={0.06} right="-100px" top="-120px" />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingTop: '3.5rem', paddingBottom: '3.5rem', width: '100%' }}>
        <div className="hero-a-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* Left: text content */}
          <div style={{ maxWidth: '580px' }}>
            {/* Typewriter rotating badge */}
            <TypewriterBadge />

            <h1 style={s.h1}>{hero.heading}</h1>

            <p style={s.sub}>{hero.subheading}</p>

            {/* Bullet trust items */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {trustItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="8" fill="var(--color-accent)" opacity="0.2" />
                    <path d="M5 8l2 2 4-4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Local lads, Family run business
            </p>
          </div>

          {/* Right: stacked CTA buttons — Gravity Roofing style */}
          <div className="hero-a-cta-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            minWidth: '252px',
          }}>
            {/* Book Online — most prominent, filled accent */}
            <a href={siteData.bookingUrl ?? '/contact#book'} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              backgroundColor: 'var(--color-accent)', color: '#fff',
              padding: '0.7rem 1.5rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: '2px solid var(--color-accent)',
              transition: 'opacity 0.18s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Online
            </a>

            {/* Get a Free Quote */}
            <a href="/contact" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'transparent', color: '#fff',
              padding: '0.7rem 1.5rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: '2px solid rgba(255,255,255,0.45)',
              transition: 'border-color 0.18s ease, background-color 0.18s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Get a Free Quote
            </a>

            {/* Call Us Now */}
            <a href={`tel:${phone.replace(/\s/g, '')}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              backgroundColor: 'transparent', color: '#fff',
              padding: '0.7rem 1.5rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'border-color 0.18s ease, background-color 0.18s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <Phone size={15} aria-hidden="true" /> Call Us Now
            </a>

            {/* Request a Callback */}
            <a href="/contact" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'transparent', color: 'rgba(255,255,255,0.65)',
              padding: '0.7rem 1.5rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: '2px solid rgba(255,255,255,0.14)',
              transition: 'border-color 0.18s ease, color 0.18s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            >
              Request a Callback
            </a>

            {/* Review count badge */}
            <div style={{
              padding: '0.7rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '6px' }}>
                {[1,2,3,4,5].map(n => (
                  <svg key={n} width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 1l2.4 7.4H20l-6.2 4.5 2.4 7.4L10 16l-6.2 4.3 2.4-7.4L0 8.4h7.6z" fill="#F59E0B" />
                  </svg>
                ))}
              </div>
              <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', margin: 0 }}>
                5.0 Google Rating
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontFamily: 'var(--font-body)', margin: '2px 0 0' }}>
                {yearsExperience}+ years in the trade
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* Mobile: stack hero grid, show CTA panel full-width */
        @media (max-width: 900px) {
          .hero-a-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-a-cta-panel {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            min-width: unset !important;
            width: 100% !important;
          }
          .hero-a-cta-panel > a:first-child {
            grid-column: span 2 !important;
          }
          .hero-a-cta-panel > div:last-child {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 480px) {
          .hero-a-cta-panel {
            grid-template-columns: 1fr !important;
          }
          .hero-a-cta-panel > a:first-child {
            grid-column: unset !important;
          }
          .hero-a-cta-panel > div:last-child {
            grid-column: unset !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── Variant B: Centred Premium ─────────────────────────────
function HeroB() {
  const { hero, phone } = siteData
  return (
    <section style={s.section({ textAlign: 'center', justifyContent: 'center' })} aria-label="Hero">
      {/* Full-bg line texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(-55deg, transparent, transparent 10px, rgba(255,255,255,0.035) 10px, rgba(255,255,255,0.035) 11px)',
          pointerEvents: 'none',
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,255,255,0.045) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Angled bottom cut */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
          backgroundColor: 'var(--color-bg)',
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {/* Thin accent rule */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }} aria-hidden="true">
            <div style={{ height: '2px', width: '48px', backgroundColor: 'var(--color-accent)' }} />
          </div>
          <Eyebrow />

          <h1 style={{ ...s.h1, fontSize: 'clamp(2.6rem, 5vw, 4.25rem)', maxWidth: '720px', margin: '0 auto 1.25rem' }}>
            {hero.heading}
          </h1>

          <p style={{ ...s.sub, margin: '0 auto 2.25rem', textAlign: 'center' }}>{hero.subheading}</p>

          <div style={{ ...s.ctaRow, justifyContent: 'center' }}>
            <a href="/contact" style={s.btnPrimary} onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {hero.primaryCta} <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href={`tel:${phone.replace(/\s/g, '')}`} style={s.btnGhost}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <Phone size={15} aria-hidden="true" /> {phone}
            </a>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
            Free quotes &middot; Fully insured &middot; No call-out fee
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Variant C: Split Conversion ────────────────────────────
function HeroC() {
  const { hero, phone, trustItems } = siteData
  return (
    <section style={s.section()} aria-label="Hero">
      <DotPattern />
      <AccentCircle size={600} opacity={0.05} right="-150px" top="auto" />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingTop: '3.5rem', paddingBottom: '3.5rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            <Eyebrow />
            <h1 style={s.h1}>{hero.heading}</h1>
            <p style={s.sub}>{hero.subheading}</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trustItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: 'var(--font-body)' }}>
              <Phone size={14} aria-hidden="true" /> {phone}
            </a>
          </div>

          {/* Right: quote form */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
              Get a Free Quote
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '14px', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
              We'll call you back within 2 hours.
            </p>

            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Your name', name: 'name', type: 'text', placeholder: 'John Smith' },
                { label: 'Phone number', name: 'phone', type: 'tel', placeholder: '07700 000000' },
                { label: 'Email address', name: 'email', type: 'email', placeholder: 'john@example.com' },
              ].map(f => (
                <div key={f.name}>
                  <label htmlFor={`hero-c-${f.name}`} style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
                    {f.label}
                  </label>
                  <input id={`hero-c-${f.name}`} type={f.type} name={f.name} placeholder={f.placeholder} required
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '7px', border: '1.5px solid var(--color-border)', fontSize: '14px', fontFamily: 'var(--font-body)', color: 'var(--color-text)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <button type="submit" style={{ ...s.btnPrimary, width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '4px' }}>
                Send Enquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Variant D: Bold Full-Width Overlay ─────────────────────
function HeroD() {
  const { hero, phone } = siteData
  return (
    <section
      style={{
        ...s.section(),
        background: 'linear-gradient(145deg, var(--color-primary) 0%, #0d1e2e 100%)',
      }}
      aria-label="Hero"
    >
      {/* Large circles */}
      <AccentCircle size={700} opacity={0.07} right="-200px" top="-200px" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '-100px', left: '20%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(255,255,255,0.18)', borderRadius: '999px',
          padding: '7px 16px', marginBottom: '1.75rem',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            {siteData.trade} &middot; {siteData.city}
          </span>
        </div>

        {/* Very large heading */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
          fontWeight: 700, color: '#fff', lineHeight: 1.05,
          marginBottom: '1.25rem', maxWidth: '900px',
        }}>
          {hero.heading}
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.15rem', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '540px', fontFamily: 'var(--font-body)' }}>
          {hero.subheading}
        </p>

        <div style={s.ctaRow}>
          <a href="/contact" style={s.btnPrimary} onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {hero.primaryCta} <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a href={`tel:${phone.replace(/\s/g, '')}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            border: '2px solid rgba(255,255,255,0.25)', borderRadius: '8px',
            color: '#fff', padding: '1rem 1.75rem',
            fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600,
            transition: 'border-color 0.18s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          >
            <Phone size={17} aria-hidden="true" /> {phone}
          </a>
        </div>
      </div>

      {/* Angled bottom cut */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '72px',
          backgroundColor: 'var(--color-bg)',
          clipPath: 'polygon(0 100%, 100% 25%, 100% 100%)',
        }}
      />
    </section>
  )
}

// ── Export ─────────────────────────────────────────────────
export default function Hero() {
  switch (siteData.variant) {
    case 'B': return <HeroB />
    case 'C': return <HeroC />
    case 'D': return <HeroD />
    default:  return <HeroA />
  }
}
