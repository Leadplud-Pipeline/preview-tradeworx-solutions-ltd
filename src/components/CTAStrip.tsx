import { Phone, ArrowRight } from 'lucide-react'
import siteData from '../siteData'

export default function CTAStrip() {
  const { phone } = siteData

  return (
    <section
      aria-label="Call to action"
      style={{ backgroundColor: 'var(--color-accent)', padding: '4.5rem 0' }}
    >
      <div className="container-site" style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 700, color: '#fff', marginBottom: '10px',
        }}>
          Ready to get started?
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.78)', fontSize: '15px', lineHeight: 1.6,
          marginBottom: '2rem', fontFamily: 'var(--font-body)',
          maxWidth: '460px', margin: '0 auto 2rem',
        }}>
          Free quotes, no obligation. We'll give you a clear written price before any work begins.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
          {/* White filled */}
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: '#fff', color: 'var(--color-accent)',
              padding: '0.9rem 1.75rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700,
              transition: 'opacity 0.18s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
          </a>

          {/* Ghost */}
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'transparent', color: '#fff',
              padding: '0.9rem 1.75rem', borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600,
              transition: 'border-color 0.18s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
          >
            <Phone size={15} aria-hidden="true" /> Call {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
