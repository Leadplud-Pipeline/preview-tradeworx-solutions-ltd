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

export default function WhyUs() {
  const headingRef = useReveal()
  const pillarsRef = useReveal()
  const { whyUs } = siteData

  return (
    <section
      style={{
        background: 'linear-gradient(150deg, var(--color-primary) 0%, #0b1925 100%)',
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
            fontFamily: 'var(--font-body)', marginBottom: '12px',
          }}>
            Why Choose Us
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 3vw, 2.75rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '14px',
          }}>
            {whyUs.heading}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '15px',
            lineHeight: 1.65,
            fontFamily: 'var(--font-body)',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            {whyUs.subheading}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          marginBottom: '0',
        }} />

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="reveal-stagger why-us-pillars"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${whyUs.points.length}, 1fr)`,
            gap: '0',
          }}
        >
          {whyUs.points.map((point, i) => (
            <div
              key={i}
              style={{
                padding: '2.75rem 2rem',
                borderRight: i < whyUs.points.length - 1
                  ? '1px solid rgba(255,255,255,0.08)'
                  : 'none',
                textAlign: 'center',
              }}
            >
              {/* Number badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.15)',
                marginBottom: '1.25rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Heading */}
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#fff',
                marginBottom: '12px',
              }}>
                {point.heading}
              </h3>

              <p style={{
                fontSize: '13.5px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-body)',
              }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom rule + CTA */}
        <div style={{
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          marginBottom: '3rem',
        }} />

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '1.5rem',
          }}>
            Not rocket science. Just really good {siteData.trade.toLowerCase()} work.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 700,
              border: 'none',
              transition: 'opacity 0.18s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Book a Free Inspection Today
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-us-pillars {
            grid-template-columns: 1fr 1fr !important;
          }
          .why-us-pillars > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
        @media (max-width: 480px) {
          .why-us-pillars {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
