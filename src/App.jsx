import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './App.css'

const navClassName = ({ isActive }) => (isActive ? 'is-active' : '')

function getContactCopy(pathname) {
  if (pathname === '/services') {
    return {
      heading: 'Ready to book?',
      copy: 'Request a booking, start a mural, or discuss a commission. Tell us what you have in mind.',
    }
  }
  if (pathname === '/about') {
    return {
      heading: "Let's connect.",
      copy: 'Interested in collaborating or learning more? Send a message and we\'ll be in touch.',
    }
  }
  if (pathname.startsWith('/collections')) {
    return {
      heading: 'Inquire about a piece.',
      copy: 'Ask about pricing, availability, or a studio visit. We\'ll get back to you soon.',
    }
  }
  return {
    heading: "Let's make your walls glow.",
    copy: 'Want a commission, a custom palette, or a studio visit? Reach out for availability and pricing.',
  }
}

function App() {
  const location = useLocation()
  const [theme, setTheme] = useState('noir')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const contactCopy = getContactCopy(location.pathname)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
  }

  return (
    <div className="app" data-theme={theme}>
      <header className="site-header">
        <NavLink className="logo" to="/" onClick={handleNavClick}>
          <span className="logo__mark" aria-hidden="true" />
          <div>
            <p className="logo__name">Paesani Designs</p>
            <p className="logo__tagline">Surreal art + cultural portraits</p>
          </div>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
        >
          Menu
        </button>
        <nav
          className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
          id="site-menu"
          aria-label="Main"
        >
          <NavLink to="/" end className={navClassName} onClick={handleNavClick}>
            Home
          </NavLink>
          <NavLink
            to="/collections"
            className={navClassName}
            onClick={handleNavClick}
          >
            Collections
          </NavLink>
          <NavLink to="/about" className={navClassName} onClick={handleNavClick}>
            About
          </NavLink>
          <NavLink
            to="/services"
            className={navClassName}
            onClick={handleNavClick}
          >
            Services
          </NavLink>
          <a href="#contact" onClick={handleNavClick}>
            Contact
          </a>
        </nav>
      </header>

      <main className="page">
        <Outlet context={{ theme, setTheme }} />
      </main>

      <footer className="footer" id="contact">
        <div>
          <h3>{contactCopy.heading}</h3>
          <p>{contactCopy.copy}</p>
        </div>
        {contactSubmitted ? (
          <div className="contact-form__success" aria-live="polite">
            <p className="contact-form__success-title">Message sent!</p>
            <p className="contact-form__success-note">
              Testing only — no email was actually sent.
            </p>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
            noValidate
          >
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                className="contact-form__input"
                type="text"
                name="name"
                autoComplete="name"
                required
              />
            </div>
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                className="contact-form__input"
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="contact-form__input contact-form__textarea"
                name="message"
                rows={4}
                required
              />
            </div>
            <div className="footer__actions">
              <button type="submit" className="btn btn--primary">
                Send message
              </button>
              <a
                className="btn btn--ghost"
                href="https://www.etsy.com/"
                target="_blank"
                rel="noreferrer"
              >
                Shop Etsy
              </a>
            </div>
          </form>
        )}
      </footer>
    </div>
  )
}

export default App
