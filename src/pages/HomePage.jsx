import { useMemo } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import artworks from '../data/artworks.json'

function HomePage() {
  const { theme, setTheme } = useOutletContext()
  const currentCollection = useMemo(
    () => artworks.filter((art) => art.current),
    [],
  )
  const heroArtworks = currentCollection.slice(0, 3)

  return (
    <>
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
            Discover the current treehouse and mushroom-house series alongside the
            Brazilian portrait collection. Originals and select releases are
            available with pricing on request.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#current-collection">
              View Current Collection
            </a>
            <Link className="btn btn--ghost" to="/collections">
              View All Collections
            </Link>
          </div>
          <div className="hero__details">
            <div>
              <p className="eyebrow">Available</p>
              <p>Originals + limited releases</p>
            </div>
            <div>
              <p className="eyebrow">Pricing</p>
              <p><a href="#contact" className="hero__inquire-link">Inquire for current availability</a></p>
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
            <span className="glow-card__price">{heroArtworks[0]?.price}</span>
          </div>
        </div>
      </header>

      <section className="section" id="current-collection">
        <div className="section__head">
          <div>
            <p className="eyebrow">Current collection</p>
            <h2>Now on view.</h2>
            <p className="section__copy">
              The latest series, available as originals and limited releases.
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
                  <a className="btn btn--ghost" href="#contact">
                    Ask about pricing
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
