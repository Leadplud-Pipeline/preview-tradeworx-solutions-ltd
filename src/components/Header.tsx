import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import siteData from '../siteData'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: 'var(--color-primary)',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.25)' : 'none',
      }}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo / Business name */}
          <a
            href="/"
            className="font-heading text-white text-xl font-semibold tracking-tight hover:opacity-90 transition-opacity"
          >
            {siteData.businessName}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <a href="/#services" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Services
            </a>
            <a href="/about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              About
            </a>
            <a href="/contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Phone CTA — always visible */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
              aria-label={`Call us on ${siteData.phone}`}
            >
              <Phone size={15} aria-hidden="true" />
              {siteData.phone}
            </a>

            {/* Mobile: just icon link */}
            <a
              href={`tel:${siteData.phone.replace(/\s/g, '')}`}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
              aria-label={`Call ${siteData.phone}`}
            >
              <Phone size={18} aria-hidden="true" />
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? '240px' : '0' }}
        aria-hidden={!menuOpen}
      >
        <nav className="container-site pb-4 flex flex-col gap-1">
          {[
            { href: '/#services', label: 'Services' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-3 text-white/85 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
