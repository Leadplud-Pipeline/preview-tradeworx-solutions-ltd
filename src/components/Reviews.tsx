import { ExternalLink } from 'lucide-react'
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

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1l2.4 7.4H20l-6.2 4.5 2.4 7.4L10 16l-6.2 4.3 2.4-7.4L0 8.4h7.6z"
            fill={n <= rating ? 'var(--color-accent)' : 'var(--color-border)'}
          />
        </svg>
      ))}
    </div>
  )
}

const OPEN_QUOTE = (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
    <path d="M0 20V12.4C0 8.93 1.4 5.93 4.2 3.4 7 0.867 10.4.067 14.4.4L13.2 3.6C11.067 3.6 9.27 4.27 7.8 5.6 6.33 6.87 5.6 8.4 5.6 10.2V11.6H11.2V20H0ZM16.8 20V12.4C16.8 8.93 18.2 5.93 21 3.4 23.8.867 27.2.067 31.2.4L30 3.6C27.867 3.6 26.07 4.27 24.6 5.6 23.13 6.87 22.4 8.4 22.4 10.2V11.6H28V20H16.8Z" fill="var(--color-accent)" opacity="0.2"/>
  </svg>
)

export default function Reviews() {
  const headingRef = useReveal()
  const gridRef = useReveal()
  const { reviews, googleBusinessUrl, city } = siteData
  const hasReviews = reviews.length > 0

  return (
    <section style={{ backgroundColor: 'var(--color-bg)', padding: '5rem 0 5.5rem' }}>
      <div className="container-site">

        {/* Header */}
        <div
          ref={headingRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)', marginBottom: '12px',
          }}>
            What Our Customers Say
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 3vw, 2.75rem)',
            fontWeight: 700, color: 'var(--color-primary)',
          }}>
            Trusted by Homeowners Across {city}
          </h2>
        </div>

        {hasReviews ? (
          <div
            ref={gridRef}
            className="reveal-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {reviews.map((review, i) => (
              <blockquote
                key={i}
                style={{
                  backgroundColor: '#fff',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 0,
                }}
              >
                {/* Opening quote mark */}
                <div style={{ marginBottom: '12px' }}>{OPEN_QUOTE}</div>

                <Stars rating={review.rating} />

                <p style={{
                  fontSize: '14.5px', lineHeight: 1.65,
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  marginTop: '14px', marginBottom: '20px',
                  flex: 1,
                }}>
                  {review.text}
                </p>

                <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <cite style={{
                      fontStyle: 'normal', fontWeight: 700, fontSize: '14px',
                      color: 'var(--color-primary)', fontFamily: 'var(--font-body)',
                      display: 'block',
                    }}>
                      {review.name}
                    </cite>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                      {review.date}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em',
                    color: 'var(--color-accent)',
                    backgroundColor: 'rgba(232, 93, 38, 0.1)',
                    padding: '4px 10px', borderRadius: '999px',
                    fontFamily: 'var(--font-body)',
                  }}>
                    Google
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                border: '2px solid var(--color-accent)', color: 'var(--color-accent)',
                padding: '0.9rem 1.75rem', borderRadius: '8px',
                fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600,
              }}
            >
              See our reviews on Google <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        )}

        {/* Google link */}
        {hasReviews && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: 'var(--color-muted)', fontSize: '13px',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              See all reviews on Google <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        )}

      </div>
    </section>
  )
}
