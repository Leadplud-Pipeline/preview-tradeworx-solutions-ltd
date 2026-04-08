import { useState, useRef, useEffect } from 'react'
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

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const leftRef = useReveal()
  const rightRef = useReveal()
  const { faqs, businessName, phone } = siteData

  if (!faqs || faqs.length === 0) return null

  return (
    <section style={{ backgroundColor: 'var(--color-bg)', padding: '5.5rem 0' }}>
      <div className="container-site">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >

          {/* Left: heading block */}
          <div ref={leftRef} className="reveal">
            <p style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--color-accent)',
              fontFamily: 'var(--font-body)', marginBottom: '12px',
            }}>
              Common Questions
            </p>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: '16px',
              lineHeight: 1.15,
            }}>
              {businessName} FAQ
            </h2>
            <p style={{
              color: 'var(--color-muted)',
              fontSize: '14.5px',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
              marginBottom: '2rem',
            }}>
              Everything you need to know before booking. If you have another question, just give us a ring.
            </p>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                padding: '0.85rem 1.5rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                transition: 'opacity 0.18s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.32 6.32l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call {phone}
            </a>
          </div>

          {/* Right: accordion */}
          <div ref={rightRef} className="reveal">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1.25rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                  aria-expanded={open === i}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    lineHeight: 1.4,
                  }}>
                    {faq.question}
                  </span>

                  {/* Toggle icon */}
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '1.5px solid',
                    borderColor: open === i ? 'var(--color-accent)' : 'var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: open === i ? 'var(--color-accent)' : 'transparent',
                    transition: 'all 0.2s ease',
                    color: open === i ? '#fff' : 'var(--color-muted)',
                  }}>
                    {open === i ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 6h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: open === i ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.32s ease',
                  }}
                >
                  <p style={{
                    fontSize: '14.5px',
                    lineHeight: 1.75,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    paddingBottom: '1.25rem',
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
