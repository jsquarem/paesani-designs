import { useState } from 'react'
import artworks from './data/artworks.json'
import './App.css'

const currentCollection = artworks.filter((art) => art.collection === 'current')
const portraitCollection = artworks.filter(
  (art) => art.collection === 'portraits',
)
const heroArtworks = currentCollection.slice(0, 3)

function App() {
  const [theme, setTheme] = useState('noir')

  return (
    <div className="app" data-theme={theme}>
      <header className="hero">
        <div className="hero__content">
          <div className="top-bar">
            <div className="theme-toggle">
              <button
                className={`toggle-btn ${theme === 'noir' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setTheme('noir')}
              >
                Noir
              </button>
              <button
                className={`toggle-btn ${theme === 'twilight' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setTheme('twilight')}
              >
                Twilight
              </button>
              <button
                className={`toggle-btn ${theme === 'light' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setTheme('light')}
              >
                Light
              </button>
            </div>
          </div>
          <p className="eyebrow">Paesani Studio</p>
          <h1>Surreal architecture and portrait studies by Paesani.</h1>
          <p className="hero__copy">
            Discover the current treehouse and mushroom-house series alongside
            the Brazilian portrait collection. Originals and select releases
            are available with pricing on request.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#current-collection">
              View Current Collection
            </a>
            <a className="btn btn--ghost" href="#portrait-collection">
              View Portraits
            </a>
          </div>
          <div className="hero__details">
            <div>
              <p className="eyebrow">Available</p>
              <p>Originals + limited releases</p>
            </div>
            <div>
              <p className="eyebrow">Pricing</p>
              <p>Inquire for current availability</p>
            </div>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__stack">
            {heroArtworks.map((art, index) => (
              <div className={`hero__tile hero__tile--${index + 1}`} key={art.id}>
                <img src={art.imageUrl} alt={art.name} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="glow-card">
            <p className="glow-card__label">Current spotlight</p>
            <h3>{heroArtworks[0]?.name}</h3>
            <p>{heroArtworks[0]?.description}</p>
            <span className="glow-card__price">
              {heroArtworks[0]?.price}
            </span>
          </div>
        </div>
      </header>

      <section className="section" id="current-collection">
        <div className="section__head">
          <div>
            <p className="eyebrow">Current collection</p>
            <h2>Tree houses &amp; mushroom homes.</h2>
            <p className="section__copy">
              Midnight scenes, glowing accents, and surreal architecture in the
              forest canopy.
            </p>
          </div>
          <a
            className="btn btn--ghost"
            href="https://www.etsy.com/"
            target="_blank"
            rel="noreferrer"
          >
            Shop current work
          </a>
        </div>

        <div className="gallery-grid">
          {currentCollection.map((art) => (
            <article className="art-card" key={art.id}>
              <div className="art-card__media">
                <img src={art.imageUrl} alt={art.name} loading="lazy" />
                <span className="art-card__price">{art.price}</span>
              </div>
              <div className="art-card__body">
                <div className="art-card__title">
                  <h3>{art.name}</h3>
                  <span className="pill">{art.tags[0]}</span>
                </div>
                <p>{art.description}</p>
                <div className="art-card__tags">
                  {art.tags.map((tag) => (
                    <span className="chip" key={`${art.id}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="art-card__actions">
                  <a
                    className="btn btn--primary"
                    href={art.etsyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shop on Etsy
                  </a>
                  <a className="btn btn--ghost" href="mailto:hello@paesani.studio">
                    Ask about pricing
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="portrait-collection">
        <div className="section__head">
          <div>
            <p className="eyebrow">Previous collection</p>
            <h2>Brazilian portrait series.</h2>
            <p className="section__copy">
              Abstract portraits with elongated silhouettes, rhythmic color, and
              expressive movement.
            </p>
          </div>
          <a
            className="btn btn--ghost"
            href="https://www.etsy.com/"
            target="_blank"
            rel="noreferrer"
          >
            Shop portrait series
          </a>
        </div>

        <div className="gallery-grid">
          {portraitCollection.map((art) => (
            <article className="art-card" key={art.id}>
              <div className="art-card__media">
                <img src={art.imageUrl} alt={art.name} loading="lazy" />
                <span className="art-card__price">{art.price}</span>
              </div>
              <div className="art-card__body">
                <div className="art-card__title">
                  <h3>{art.name}</h3>
                  <span className="pill">{art.tags[0]}</span>
                </div>
                <p>{art.description}</p>
                <div className="art-card__tags">
                  {art.tags.map((tag) => (
                    <span className="chip" key={`${art.id}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="art-card__actions">
                  <a
                    className="btn btn--primary"
                    href={art.etsyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shop on Etsy
                  </a>
                  <a className="btn btn--ghost" href="mailto:hello@paesani.studio">
                    Ask about pricing
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
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
