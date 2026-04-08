import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import CTAStrip from '../components/CTAStrip'
import Reviews from '../components/Reviews'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBadges />
        <Services />
        <WhyUs />
        <Process />
        <CTAStrip />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
