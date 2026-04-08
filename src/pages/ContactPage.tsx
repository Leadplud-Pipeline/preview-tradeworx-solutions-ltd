import Header from '../components/Header'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import siteData from '../siteData'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page hero */}
        <section
          className="pt-[72px] py-16 lg:py-20"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="container-site">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
              Contact Us
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white">
              Get a Free Quote
            </h1>
            <p className="text-white/65 mt-3 text-lg max-w-[480px]">
              Call us on{' '}
              <a
                href={`tel:${siteData.phone.replace(/\s/g, '')}`}
                className="text-white font-semibold hover:opacity-80 transition-opacity"
              >
                {siteData.phone}
              </a>{' '}
              or fill in the form and we'll get back to you within 2 hours.
            </p>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  )
}
