import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

const navClassName = ({ isActive }) => (isActive ? 'is-active' : '')

function App() {
  const [theme, setTheme] = useState('noir')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="app" data-theme={theme}>
      <header className="site-header">
        <NavLink className="logo" to="/" onClick={handleNavClick}>
          <span className="logo__mark" aria-hidden="true" />
          <div>
            <p className="logo__name">Paesani Studio</p>
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
          <h3>Let’s make your walls glow.</h3>
          <p>
            Want a commission, a custom palette, or a studio visit? Reach out
            for availability and pricing.
          </p>
        </div>
        <div className="footer__actions">
          <a
            className="btn btn--primary"
            href="https://www.etsy.com/"
            target="_blank"
            rel="noreferrer"
          >
            Shop Etsy
          </a>
          <a className="btn btn--ghost" href="mailto:hello@paesani.studio">
            Email Studio
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
