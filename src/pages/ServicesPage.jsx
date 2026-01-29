import { useEffect, useRef } from 'react'

function ServicesPage() {
  const mobileAdvanceRef = useRef(null)

  useEffect(() => {
    const sentinel = mobileAdvanceRef.current
    if (!sentinel) return undefined
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (!isMobile) return undefined
    const observer = new IntersectionObserver(() => {}, { threshold: 0.6 })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])
  return (
    <section className="section" id="services">
      <div className="section__head">
        <div>
          <p className="eyebrow">Services</p>
          <h2>Custom work and experiential art.</h2>
          <p className="section__copy">
            From immersive body painting to murals and custom commissions,
            Paesani Studio brings bold color and storytelling to every space.
          </p>
        </div>
      </div>
      <div className="services-grid">
        <article className="service-card">
          <div className="service-card__media">
            <img
              src="/images/body-paint/950508276838819098.jpg"
              alt="Body painting service"
              loading="lazy"
            />
          </div>
          <div className="service-card__body">
            <h3>Body painting</h3>
            <p>
              Live event activations and creative sessions that transform the
              human canvas with color, light, and movement.
            </p>
            <a className="btn btn--ghost" href="#contact">
              Request booking
            </a>
          </div>
        </article>
        <article className="service-card">
          <div className="service-card__media">
            <img
              src="/images/mural/950508276838819098.jpg"
              alt="Mural service"
              loading="lazy"
            />
          </div>
          <div className="service-card__body">
            <h3>Murals</h3>
            <p>
              Site-specific murals for homes, studios, and commercial spaces,
              tailored to your palette and story.
            </p>
            <a className="btn btn--ghost" href="#contact">
              Start a mural
            </a>
          </div>
        </article>
        <article className="service-card">
          <div className="service-card__media">
            <img
              src="/images/commision/974565921523035223.jpg"
              alt="Commission work"
              loading="lazy"
            />
          </div>
          <div className="service-card__body">
            <h3>Commission work</h3>
            <p>
              Original paintings created for collectors, designers, and
              galleries with a collaborative process.
            </p>
            <a className="btn btn--ghost" href="#contact">
              Discuss a commission
            </a>
          </div>
        </article>
      </div>
      <div className="commission-grid">
        {[
          '/images/commision/974565921523035223.jpg',
          '/images/commision/1301267496613699937.jpg',
          '/images/commision/3442666902450892125.jpg',
          '/images/commision/7583630496921358423.jpg',
          '/images/commision/8941745560645170555.jpg',
        ].map((src, index) => (
          <img
            key={`commission-${index}`}
            src={src}
            alt={`Commission work ${index + 1}`}
            loading="lazy"
          />
        ))}
      </div>
      <div className="scroll-sentinel" ref={mobileAdvanceRef} aria-hidden="true" />
    </section>
  )
}

export default ServicesPage
