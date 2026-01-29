import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function AboutPage() {
  const navigate = useNavigate()
  const mobileAdvanceRef = useRef(null)

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
          navigate('/services')
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [navigate])

  return (
    <section className="section about" id="about">
      <div className="section__head">
        <div>
          <p className="eyebrow">About</p>
          <h2>Artist biography</h2>
        </div>
      </div>
      <div className="about__grid">
        <div className="about__portrait">
          <img
            src="/images/8877509739816057882.jpg"
            alt="Luciano Paesani portrait"
            loading="lazy"
          />
        </div>
        <div className="about__text">
          <p>
            Luciano Paesani was born in Sao Paulo, Brazil in 1965. Since
            childhood, he demonstrated an extreme passion for arts. Realizing
            his interest for arts, his father and family members always provided
            him the necessary materials to play and create.
          </p>
          <p>
            Paesani graduated from EPA - Escola Panamericana de Artes, in Sao
            Paulo. He worked on advertising agencies as an illustrator and in
            1991 he moved to the United States. In America he worked in the
            movie industry as a set painter and learned many techniques with
            experienced Los Angeles artists, including faux-finish and the art
            of painting murals.
          </p>
          <p>
            His passion for acrylic on canvas was always first. Paesani created
            several colorful paintings, including one of his famous collections,
            "BRAZIL", which shows backgrounds influenced by his native country
            and his trademark characters that he called "Magros" (skinnies), an
            inspiration that came from his 12 year old son.
          </p>
          <p>
            Luciano always admired the work of Fernando Botero, figurative
            artist and sculptor from Colombia. You will find Luciano Paesani
            always happy with a brush in hand.
          </p>
        </div>
      </div>
      <div className="scroll-sentinel" ref={mobileAdvanceRef} aria-hidden="true" />
    </section>
  )
}

export default AboutPage
