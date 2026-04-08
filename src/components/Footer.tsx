import { Phone, Mail, MapPin } from 'lucide-react'
import siteData from '../siteData'

export default function Footer() {
  const { businessName, phone, email, address, serviceArea, tagline } = siteData
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--color-primary)' }} aria-label="Footer">
      <div className="container-site" style={{ padding: '3.5rem 0 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '2.5rem 3rem',
          paddingBottom: '3rem',
        }}>

          {/* Column 1: Business */}
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              {businessName}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13.5px', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '1.5rem' }}>
              {tagline}. Serving {serviceArea}.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                <Phone size={13} aria-hidden="true" /> {phone}
              </a>
              {email && (
                <a href={`mailto:${email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  <Mail size={13} aria-hidden="true" /> {email}
                </a>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                <MapPin size={13} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" /> {address}
              </div>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '1rem' }}>
              Quick Links
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/#services', label: 'Services' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Get a Quote' },
              ].map(link => (
                <a key={link.href} href={link.href} style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13.5px', fontFamily: 'var(--font-body)', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.58)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Service area */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '1rem' }}>
              Service Area
            </p>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13.5px', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '1.5rem' }}>
              We cover {serviceArea}. Get in touch and we'll confirm if we can reach you.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center',
                backgroundColor: 'var(--color-accent)', color: '#fff',
                padding: '9px 18px', borderRadius: '7px',
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700,
                transition: 'opacity 0.18s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Free Quote
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '1.25rem 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '8px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            &copy; {year} {businessName}. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            Built by{' '}
            <a href="https://leadplug.co.uk" target="_blank" rel="noopener noreferrer"
              style={{ transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              Leadplug
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
