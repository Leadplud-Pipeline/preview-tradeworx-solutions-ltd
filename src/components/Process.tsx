import { useRef, useEffect } from 'react'
import siteData from '../siteData'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function Process() {
  const headingRef = useReveal()
  const stepsRef = useReveal()
  const { process: steps } = siteData

  if (!steps || steps.length === 0) return null

  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary)',
        padding: '5.5rem 0',
      }}
    >
      <div className="container-site">

        {/* Header */}
        <div
          ref={headingRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)', marginBottom: '10px',
          }}>
            How It Works
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 3vw, 2.75rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '10px',
          }}>
            The {siteData.businessName} Process
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '14px',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Simple. Clear. Reliable.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="reveal-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '14px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.backgroundColor = 'rgba(255,255,255,0.07)'
                el.style.borderColor = 'rgba(255,255,255,0.18)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.backgroundColor = 'rgba(255,255,255,0.04)'
                el.style.borderColor = 'rgba(255,255,255,0.09)'
              }}
            >
              {/* Ghost number background */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '8rem',
                  fontWeight: 700,
                  color: '#fff',
                  opacity: 0.03,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {i + 1}
              </div>

              {/* Step label */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '0.85rem',
              }}>
                Step {String(i + 1).padStart(2, '0')}
              </p>

              {/* Heading */}
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#fff',
                marginBottom: '10px',
                lineHeight: 1.3,
              }}>
                {step.heading}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '13.5px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-body)',
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
          }}>
            Get honest answers. Fast, free, and no obligation.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '2px solid var(--color-accent)',
              backgroundColor: 'transparent',
              color: 'var(--color-accent)',
              padding: '0.9rem 2rem',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 700,
              transition: 'background-color 0.18s ease, color 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-accent)'
            }}
          >
            Start My Free Quote
          </a>
        </div>

      </div>
    </section>
  )
}
