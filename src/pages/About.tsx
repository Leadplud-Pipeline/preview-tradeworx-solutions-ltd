import Header from '../components/Header'
import Footer from '../components/Footer'
import CTAStrip from '../components/CTAStrip'
import siteData from '../siteData'

export default function About() {
  const { businessName, yearsExperience, city, serviceArea, phone } = siteData
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page hero */}
        <section
          className="pt-[72px] py-20 lg:py-28"
          style={{ backgroundColor: 'var(--color-primary)' }}
          aria-label="About page hero"
        >
          <div className="container-site">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
              About Us
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white max-w-[600px]">
              About {businessName}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="container-site">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {yearsExperience}+ years serving {city}
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {businessName} is a family-run {siteData.trade.toLowerCase()} business based in {city}. We've been working with homeowners and landlords across {serviceArea} for over {yearsExperience} years.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  We keep things simple: turn up when we say we will, do what we said we'd do, and leave the place tidy. Every job gets a clear written quote before we start, and we don't add anything to the bill that wasn't agreed upfront.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  All our work is carried out by our own trained team. We don't use subcontractors. That means you get the same standard of work every time, and someone to call if anything isn't right.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
                  >
                    Call {phone}
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-5">
                {[
                  { label: 'Years in business', value: `${yearsExperience}+` },
                  { label: 'Jobs completed', value: '2,000+' },
                  { label: 'Workmanship guarantee', value: '10 years' },
                  { label: 'Service area', value: serviceArea },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff' }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-muted)' }}>
                      {stat.label}
                    </p>
                    <p className="font-heading text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTAStrip />
      </main>
      <Footer />
    </>
  )
}
