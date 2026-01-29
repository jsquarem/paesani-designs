import { useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import artworks from '../data/artworks.json'
import { buildCollections } from '../utils/collectionUtils.js'

function CollectionsPage() {
  const navigate = useNavigate()
  const mobileAdvanceRef = useRef(null)
  const collections = useMemo(() => buildCollections(artworks), [])

  useEffect(() => {
    const sentinel = mobileAdvanceRef.current
    if (!sentinel) return undefined
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (!isMobile) return undefined
    let triggered = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true
          navigate('/about')
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [navigate])

  return (
    <section className="section collections">
      <div className="section__head">
        <div>
          <p className="eyebrow">Collections</p>
          <h2>Explore every series.</h2>
          <p className="section__copy">
            Browse the full catalog by collection. Current series appear first,
            followed by previous releases.
          </p>
        </div>
      </div>

      <div className="collections-list">
        {collections.map((collection) => (
          <div className="collection-preview" key={collection.slug}>
            <div className="collection-preview__head">
              <div>
                <p className="eyebrow">
                  {collection.current ? 'Current collection' : 'Previous collection'}
                </p>
                <h3>{collection.name}</h3>
              </div>
              <Link
                className="btn btn--ghost"
                to={`/collections/${collection.slug}`}
              >
                View collection
              </Link>
            </div>
            <div className="gallery-grid">
              {collection.items.slice(0, 4).map((art) => (
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
                    <div className="art-card__actions">
                      <Link
                        className="btn btn--primary"
                        to={`/collections/${collection.slug}`}
                      >
                        View more
                      </Link>
                      <a className="btn btn--ghost" href="#contact">
                        Ask about pricing
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-sentinel" ref={mobileAdvanceRef} aria-hidden="true" />
    </section>
  )
}

export default CollectionsPage
