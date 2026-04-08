// ─────────────────────────────────────────────────────────────
// TrustBadges — 5 UK trust logos, HTML/CSS rendering (not SVG
// text), hover press-down effect. Dark background bar.
// ─────────────────────────────────────────────────────────────

const HOVER_DROP = 5

function Badge({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  function down(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = `translateY(${HOVER_DROP}px)`
  }
  function up(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = 'translateY(0)'
  }
  return (
    <div
      onMouseEnter={down}
      onMouseLeave={up}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        transition: 'transform 0.18s ease',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── 1. Google Reviews ⭐⭐⭐⭐⭐ ──────────────────────────────────
const G_COLORS = ['#4285F4','#EA4335','#FBBC04','#4285F4','#34A853','#EA4335']
const G_LETTERS = ['G','o','o','g','l','e']

function GoogleReviews() {
  return (
    <Badge>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
        {/* "Google" multicolour wordmark */}
        <div style={{ display: 'flex', lineHeight: 1, marginBottom: '1px' }}>
          {G_LETTERS.map((l, i) => (
            <span
              key={i}
              style={{
                color: G_COLORS[i],
                fontSize: '30px',
                fontWeight: 800,
                fontFamily: "'Arial Rounded MT Bold', 'Nunito', Arial, sans-serif",
                letterSpacing: '-0.3px',
                lineHeight: 1,
              }}
            >
              {l}
            </span>
          ))}
        </div>
        {/* "Reviews" + gold stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '15px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1,
          }}>
            Reviews
          </span>
          <span style={{ color: '#FBBC04', fontSize: '13px', letterSpacing: '1px', lineHeight: 1 }}>
            ★★★★★
          </span>
        </div>
      </div>
    </Badge>
  )
}

// ── 2. Checkatrade ────────────────────────────────────────────
// "Chec" red → blue ✓ tick → "a" red → "trade" blue
function Checkatrade() {
  const boldFont = "'Arial Black', 'Arial Bold', Arial, sans-serif"
  const sz = '30px'
  const w = 900

  return (
    <Badge>
      <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
        {/* Chec */}
        <span style={{ color: '#E3001B', fontSize: sz, fontWeight: w, fontFamily: boldFont }}>
          Chec
        </span>

        {/* Blue ✓ — replaces the k's diagonal */}
        <svg
          width="20"
          height="36"
          viewBox="0 0 20 38"
          fill="none"
          style={{ marginBottom: '2px', flexShrink: 0 }}
          aria-hidden="true"
        >
          <path
            d="M2 20 L8 30 L18 6"
            stroke="#003C8F"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* a (red) */}
        <span style={{ color: '#E3001B', fontSize: sz, fontWeight: w, fontFamily: boldFont }}>
          a
        </span>

        {/* trade (blue) */}
        <span style={{ color: '#003C8F', fontSize: sz, fontWeight: w, fontFamily: boldFont }}>
          trade
        </span>
      </div>
    </Badge>
  )
}

// ── 3. Trustpilot ─────────────────────────────────────────────
function TrustpilotStar({ size = 28, color = '#00B67A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" aria-hidden="true">
      <polygon
        points="26,2 32,18 50,18 36,30 42,48 26,38 10,48 16,30 2,18 20,18"
        fill={color}
      />
    </svg>
  )
}

function Trustpilot() {
  return (
    <Badge>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
        {/* Row 1: large star + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', lineHeight: 1 }}>
          <TrustpilotStar size={26} />
          <span style={{
            color: '#fff',
            fontSize: '22px',
            fontWeight: 700,
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1,
          }}>
            Trustpilot
          </span>
        </div>
        {/* Row 2: 5 green tile stars */}
        <div style={{ display: 'flex', gap: '3px' }}>
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#00B67A',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <TrustpilotStar size={16} color="#fff" />
            </div>
          ))}
        </div>
      </div>
    </Badge>
  )
}

// ── 4. TrustATrader circular badge ────────────────────────────
function TrustATrader() {
  return (
    <Badge style={{ height: '88px' }}>
      <svg
        width="88"
        height="88"
        viewBox="0 0 220 220"
        aria-label="TrustATrader.com — Approved Business — Your Trusted Trade Directory"
        role="img"
      >
        <defs>
          {/* Top arc: left→right along top of circle */}
          <path id="tat-top" d="M 28 110 A 82 82 0 0 1 192 110"/>
          {/* Bottom arc: right→left along bottom (so text is right-side-up) */}
          <path id="tat-bot" d="M 196 114 A 86 86 0 0 1 24 114"/>
        </defs>

        {/* Blue outer disc */}
        <circle cx="110" cy="110" r="107" fill="#2072B8"/>

        {/* White separator ring */}
        <circle cx="110" cy="110" r="90"  fill="#fff"/>

        {/* Orange inner disc */}
        <circle cx="110" cy="110" r="82"  fill="#D4730A"/>

        {/* Blue bands (hold APPROVED / BUSINESS text) */}
        <rect x="26"  y="78"  width="168" height="26" fill="#2072B8"/>
        <rect x="26"  y="116" width="168" height="26" fill="#2072B8"/>

        {/* APPROVED */}
        <text
          x="110" y="97"
          textAnchor="middle"
          fill="#fff"
          fontSize="15"
          fontWeight="900"
          fontFamily="'Arial Black', Arial, sans-serif"
          letterSpacing="1.5"
        >
          APPROVED
        </text>

        {/* BUSINESS */}
        <text
          x="110" y="135"
          textAnchor="middle"
          fill="#fff"
          fontSize="15"
          fontWeight="900"
          fontFamily="'Arial Black', Arial, sans-serif"
          letterSpacing="1.5"
        >
          BUSINESS
        </text>

        {/* Blue checkmark in centre */}
        <path
          d="M76 104 L98 130 L144 76"
          stroke="#2072B8"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Curved top text: TRUSTATRADER.COM */}
        <text
          fontSize="11"
          fontWeight="800"
          fontFamily="Arial, sans-serif"
          fill="#fff"
          letterSpacing="1.8"
        >
          <textPath href="#tat-top" startOffset="50%" textAnchor="middle">
            TRUSTATRADER.COM
          </textPath>
        </text>

        {/* Curved bottom text: YOUR TRUSTED TRADE DIRECTORY */}
        <text
          fontSize="9"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
          letterSpacing="0.8"
        >
          <textPath href="#tat-bot" startOffset="50%" textAnchor="middle">
            YOUR TRUSTED TRADE DIRECTORY
          </textPath>
        </text>
      </svg>
    </Badge>
  )
}

// ── 5. Facebook ───────────────────────────────────────────────
function Facebook() {
  return (
    <Badge>
      <span
        style={{
          color: '#1877F2',
          fontSize: '34px',
          fontWeight: 800,
          fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
          letterSpacing: '-0.5px',
          lineHeight: 1,
        }}
      >
        facebook
      </span>
    </Badge>
  )
}

// ── Main export ──────────────────────────────────────────────
export default function TrustBadges() {
  return (
    <section
      aria-label="Trust and review badges"
      style={{
        backgroundColor: '#0e1117',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="container-site"
        style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '44px',
            minWidth: 'max-content',
            padding: '8px 16px',
          }}
        >
          <GoogleReviews />
          <Checkatrade />
          <Trustpilot />
          <TrustATrader />
          <Facebook />
        </div>
      </div>
    </section>
  )
}
