import siteData from '../siteData'

export default function TrustBar() {
  const { trustItems } = siteData

  return (
    <section
      aria-label="Trust indicators"
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: '#fff',
        padding: '1rem 0',
      }}
    >
      <div
        className="container-site"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0',
        }}
      >
        {trustItems.map((item, i) => {
          const isLast = i === trustItems.length - 1
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.75rem 2rem',
                borderRight: isLast ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {/* Simple inline checkmark — no container box */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <circle cx="8" cy="8" r="8" fill="var(--color-accent)" opacity="0.12" />
                <path
                  d="M5 8l2 2 4-4"
                  stroke="var(--color-accent)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
