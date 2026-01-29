import { useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import artworks from '../data/artworks.json'
import { buildCollections } from '../utils/collectionUtils.js'

function CollectionDetailPage() {
  const { collectionSlug } = useParams()
  const navigate = useNavigate()
  const mobileAdvanceRef = useRef(null)
  const collections = useMemo(() => buildCollections(artworks), [])
  const collection = collections.find((item) => item.slug === collectionSlug)

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

  if (!collection) {
    return (
      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Collection</p>
            <h2>Collection not found</h2>
          </div>
          <Link className="btn btn--ghost" to="/collections">
            Back to collections
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section collection-detail">
      <div className="section__head">
        <div>
          <p className="eyebrow">
            {collection.current ? 'Current collection' : 'Previous collection'}
          </p>
          <h2>{collection.name}</h2>
          <p className="section__copy">
            {collection.items.length} pieces in this collection.
          </p>
        </div>
        <Link className="btn btn--ghost" to="/collections">
          Back to collections
        </Link>
      </div>

      <div className="gallery-grid">
        {collection.items.map((art) => (
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

      <div className="scroll-sentinel" ref={mobileAdvanceRef} aria-hidden="true" />
    </section>
  )
}

export default CollectionDetailPage
