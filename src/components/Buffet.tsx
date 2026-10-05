import { useRef } from 'react'
import { BUFFET } from '../config'
import { gsap, useGSAP, DESKTOP } from '../lib/gsap'
import { Picture } from './Picture'
import { BuffetArt } from './BuffetArt'
import { Lines } from './Lines'

export function Buffet() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(DESKTOP, () => {
        const track = root.current!.querySelector<HTMLElement>('.buffet__track')!
        const steps = gsap.utils.toArray<HTMLElement>('.buffet__progress li')
        const distance = () => track.scrollWidth - window.innerWidth

        let last = -1
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.buffet__pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (s) => {
              const i = Math.round(s.progress * (steps.length - 1))
              if (i !== last) {
                last = i
                steps.forEach((li, k) => li.classList.toggle('is-active', k <= i))
              }
            },
          },
        })

        // leve parallax da arte dentro de cada card enquanto o trilho anda
        gsap.utils.toArray<HTMLElement>('.buffet__visual > *').forEach((art) => {
          gsap.fromTo(
            art,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: art, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="buffet" className="buffet sheet sheet--light" ref={root} data-header="light">
      <div className="buffet__pin">
        <div className="buffet__track">
          <header className="buffet__intro">
            <div className="bignum buffet__bignum" aria-hidden="true">03</div>
            <p className="eyebrow eyebrow--plum" data-reveal="fade">03 — Buffet</p>
            <Lines className="display buffet__title" lines={['E a experiência', <em key="e">continua à mesa.</em>]} />
            <p className="lead" data-reveal="fade">Uma festa completa também precisa ser lembrada pelo sabor.</p>
            <p className="buffet__hint" aria-hidden="true">
              <span className="buffet__hint-d">Continue rolando</span>
              <span className="buffet__hint-m">Deslize para o lado</span>
              <i>→</i>
            </p>
          </header>

          <ul className="buffet__cards">
            {BUFFET.map((b, i) => (
              <li className={`buffet__card buffet__card--${b.art}`} key={b.title}>
                <div className="buffet__visual">
                  {b.image ? (
                    // FOTO REAL DO BUFFET (quando BUFFET[i].image estiver preenchido em src/config.ts)
                    <Picture src={b.image} alt={b.title} />
                  ) : (
                    <BuffetArt art={b.art} />
                  )}
                </div>
                <div className="buffet__body">
                  <span className="buffet__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ol className="buffet__progress" aria-hidden="true">
          {BUFFET.map((b) => (
            <li key={b.title}>{b.title}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}
