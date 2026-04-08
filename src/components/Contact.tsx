import { Phone, Mail, MapPin, Clock } from 'lucide-react'
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1.5px solid var(--color-border)',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text)',
  backgroundColor: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  marginBottom: '6px',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body)',
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const headingRef = useReveal()

  const { phone, email, address, serviceArea } = siteData

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ backgroundColor: '#fff', padding: '5rem 0 5.5rem' }}>
      <div className="container-site">

        {/* Header */}
        <div ref={headingRef} className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)', marginBottom: '12px',
          }}>
            Get in Touch
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 3vw, 2.75rem)',
            fontWeight: 700, color: 'var(--color-primary)',
          }}>
            Request a Free Quote
          </h2>
        </div>

        {/* Split layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Form */}
          <div style={{
            backgroundColor: 'var(--color-bg)',
            border: '1.5px solid var(--color-border)',
            borderRadius: '16px',
            padding: '2.25rem',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  backgroundColor: 'rgba(232, 93, 38, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="var(--color-accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                  Enquiry received!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                  We'll call you back within 2 hours during business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Your name</label>
                    <input id="contact-name" type="text" name="name" placeholder="John Smith" required style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" style={labelStyle}>Phone number</label>
                    <input id="contact-phone" type="tel" name="phone" placeholder="07700 000000" required style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" style={labelStyle}>
                    Email address <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input id="contact-email" type="email" name="email" placeholder="john@example.com" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" style={labelStyle}>Tell us about your job</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Describe what you need, including the approximate size or scope if you know it..."
                    required
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '0.95rem',
                    backgroundColor: 'var(--color-accent)', color: '#fff',
                    border: 'none', borderRadius: '8px',
                    fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700,
                    cursor: 'pointer', transition: 'opacity 0.18s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
              Contact Details
            </h3>

            {[
              { Icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
              email ? { Icon: Mail, label: 'Email', value: email, href: `mailto:${email}` } : null,
              { Icon: MapPin, label: 'Service Area', value: serviceArea, href: undefined },
              { Icon: Clock, label: 'Hours', value: 'Mon–Fri, 8am–6pm', href: undefined },
            ].filter(Boolean).map((item, i) => {
              const { Icon, label, value, href } = item!
              const content = (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '42px', height: '42px', flexShrink: 0,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(232, 93, 38, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', marginBottom: '3px' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}>
                      {value}
                    </p>
                  </div>
                </div>
              )
              return href ? (
                <a key={i} href={href} style={{ textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              )
            })}

            {/* Reassurance box */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1.5px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              borderLeft: '4px solid var(--color-accent)',
            }}>
              <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                Free, no-obligation quotes
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                We'll assess your job and give you a clear written price. No pressure, no hidden extras.
              </p>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .contact-name-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
