import { ArrowRight } from 'lucide-react'
import { useRef, useEffect } from 'react'
import siteData from '../siteData'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Services() {
  const headingRef = useReveal()
  const gridRef = useReveal()

  return (
    <section
      id="services"
      style={{ backgroundColor: 'var(--color-bg)', padding: '5rem 0 5.5rem' }}
    >
      <div className="container-site">

        {/* Section header */}
        <div ref={headingRef} className="reveal" style={{ marginBottom: '3.5rem', maxWidth: '560px' }}>
          <p style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)', marginBottom: '12px',
          }}>
            What We Do
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 3vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--color-primary)',
            marginBottom: '12px',
          }}>
            Our {siteData.trade} Services
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '15px', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
            All work is carried out by our own trained team. Every job comes with a written quote and a clear timeline.
          </p>
        </div>

        {/* Card grid — no icon boxes */}
        <div
          ref={gridRef}
          className="reveal-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {siteData.services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <div ref={useReveal()} className="reveal" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get a quote for your job <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: { iconName: string; name: string; description: string }; index: number }) {
  const cardRef = useRef<HTMLElement>(null)

  function lift() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(-4px)'
      cardRef.current.style.boxShadow = '0 12px 32px rgba(0,0,0,0.10)'
      cardRef.current.style.borderColor = 'var(--color-accent)'
    }
  }
  function drop() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(0)'
      cardRef.current.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'
      cardRef.current.style.borderColor = 'var(--color-border)'
    }
  }

  return (
    <article
      ref={cardRef}
      onMouseEnter={lift}
      onMouseLeave={drop}
      style={{
        backgroundColor: '#fff',
        border: '1.5px solid var(--color-border)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost number — decorative only */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.25rem',
          right: '1.25rem',
          fontFamily: 'var(--font-heading)',
          fontSize: '7rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          opacity: 0.04,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {index + 1}
      </div>

      {/* Accent top stripe */}
      <div style={{
        height: '3px', width: '36px',
        backgroundColor: 'var(--color-accent)',
        borderRadius: '2px',
        marginBottom: '1.25rem',
      }} aria-hidden="true" />

      {/* Small number label */}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        marginBottom: '0.6rem',
        display: 'block',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'var(--color-primary)',
        marginBottom: '10px',
        lineHeight: 1.25,
      }}>
        {service.name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '14px',
        lineHeight: 1.65,
        color: 'var(--color-muted)',
        fontFamily: 'var(--font-body)',
      }}>
        {service.description}
      </p>
    </article>
  )
}
