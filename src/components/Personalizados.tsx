import { useRef } from 'react'
import { PRODUTOS } from '../config'
import { gsap, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { Picture } from './Picture'
import { Button } from './Button'
import { Lines } from './Lines'

const TAGS = ['Canecas', 'Camisas', 'Lembranças', 'Presentes', 'Personalizados']

/** De onde cada produto entra (relativo ao próprio tamanho) — direções e profundidades diferentes. */
const ENTER = [
  { xPercent: 0, yPercent: 70, rotation: -6, scale: 0.86 },
  { xPercent: 85, yPercent: 10, rotation: 8, scale: 0.9 },
  { xPercent: -80, yPercent: 40, rotation: -8, scale: 0.88 },
  { xPercent: 30, yPercent: 85, rotation: 5, scale: 0.84 },
  { xPercent: 80, yPercent: -30, rotation: -5, scale: 0.9 },
]
/** Posição em foco: leve inclinação alternada. */
const FOCUS = [-2, 2.5, -1.5, 2, -2.5]
/** Para onde o produto anterior recua quando o próximo entra. */
const BACK = [
  { xPercent: -26, yPercent: -10, rotation: -7 },
  { xPercent: 24, yPercent: -12, rotation: 7 },
  { xPercent: -22, yPercent: 10, rotation: -5 },
  { xPercent: 24, yPercent: 8, rotation: 6 },
]
/** Composição final com todos os produtos juntos. */
const COLLAGE = [
  { xPercent: -58, yPercent: -36, rotation: -6, scale: 0.5 },
  { xPercent: 6, yPercent: -52, rotation: 4, scale: 0.46 },
  { xPercent: 54, yPercent: -18, rotation: 5, scale: 0.48 },
  { xPercent: -40, yPercent: 38, rotation: 4, scale: 0.52 },
  { xPercent: 30, yPercent: 40, rotation: -4, scale: 0.56 },
]

export function Personalizados() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(DESKTOP, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.pers__card')
        const caps = gsap.utils.toArray<HTMLElement>('.pers__cap')
        const n = cards.length

        gsap.set(cards, { ...ENTER[0], opacity: 0 })
        cards.forEach((c, i) => gsap.set(c, { ...ENTER[i], opacity: 0, zIndex: i + 1 }))
        gsap.set(caps, { opacity: 0, y: 24 })
        gsap.set('.pers__final > *', { opacity: 0, y: 30 })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=420%',
            pin: '.pers__pin',
            scrub: 0.8,
          },
        })

        // título entra junto com o primeiro produto
        tl.from('.pers__title .line-inner', { yPercent: 110, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, 0)
          .from('.pers__lead, .pers__tags', { opacity: 0, y: 24, stagger: 0.08, duration: 0.5 }, 0.15)

        cards.forEach((card, i) => {
          const at = 0.2 + i * 1
          tl.to(card, { xPercent: 0, yPercent: 0, rotation: FOCUS[i], scale: 1, opacity: 1, duration: 0.8 }, at)
          tl.fromTo(card.querySelector('img'), { scale: 1.18 }, { scale: 1, duration: 0.9, ease: 'power1.out' }, at)
          tl.to(caps[i], { opacity: 1, y: 0, duration: 0.4 }, at + 0.35)
          if (i > 0) {
            tl.to(caps[i - 1], { opacity: 0, y: -24, duration: 0.3 }, at)
            tl.to(cards[i - 1], { ...BACK[i - 1], scale: 0.8, opacity: 0.55, duration: 0.8 }, at)
          }
          if (i > 1) tl.to(cards[i - 2], { opacity: 0, scale: 0.7, duration: 0.6 }, at)
        })

        // composição final com todos os produtos
        const end = 0.2 + n * 1
        tl.to(caps[n - 1], { opacity: 0, y: -24, duration: 0.3 }, end)
          .to('.pers__lead, .pers__tags, .pers__counter', { opacity: 0, y: -20, duration: 0.4 }, end)
          .to(cards, {
            xPercent: (i) => COLLAGE[i].xPercent,
            yPercent: (i) => COLLAGE[i].yPercent,
            rotation: (i) => COLLAGE[i].rotation,
            scale: (i) => COLLAGE[i].scale,
            opacity: 1,
            duration: 1,
            stagger: 0.04,
          }, end)
          .to('.pers__final > *', { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, end + 0.5)
          .to({}, { duration: 0.4 })

        // contador 01–05
        const counter = root.current!.querySelector<HTMLElement>('.pers__counter b')
        tl.eventCallback('onUpdate', () => {
          const t = tl.time()
          const i = Math.max(0, Math.min(n - 1, Math.floor(t - 0.55)))
          const txt = String(i + 1).padStart(2, '0')
          if (counter && counter.textContent !== txt) counter.textContent = txt
        })
      })

      mm.add(MOBILE, () => {
        gsap.from('.pers__title .line-inner', {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.pers__title', start: 'top 85%' },
        })
        // Pilha de cards com position: sticky; o card coberto recua levemente.
        const cards = gsap.utils.toArray<HTMLElement>('.pers__card')
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (next) {
            gsap.to(card.querySelector('.pers__frame'), {
              scale: 0.9,
              opacity: 0.6,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top 95%', end: 'top 20%', scrub: true },
            })
          }
          gsap.from(card.querySelector('img'), {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 30%', scrub: true },
          })
        })
        gsap.from('.pers__final > *', {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pers__final', start: 'top 80%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="personalizados" className="pers" ref={root} data-tone="#3a0d7a">
      <div className="pers__pin">
        <div className="bignum pers__bignum" aria-hidden="true" data-parallax="-0.15">01</div>

        <div className="pers__copy">
          <p className="eyebrow eyebrow--gold">01 — Personalizados</p>
          <Lines className="display pers__title" lines={['Seu tema', <em key="e">em cada detalhe.</em>]} reveal={false} />
          <p className="lead pers__lead">
            Transformamos ideias, nomes e momentos especiais em peças personalizadas que fazem parte da história da sua
            festa.
          </p>
          <ul className="tags pers__tags">
            {TAGS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="pers__caps" aria-live="polite">
            <p className="pers__counter"><b>01</b> / {String(PRODUTOS.length).padStart(2, '0')}</p>
            {PRODUTOS.map((p) => (
              <div className="pers__cap" key={p.src}>
                <span className="eyebrow">{p.eyebrow}</span>
                <p>{p.caption}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="pers__stage">
          {PRODUTOS.map((p, i) => (
            <figure className="pers__card" key={p.src} style={{ ['--i' as string]: i }}>
              <div className="pers__frame">
                <Picture src={p.src} alt={p.alt} hasOptimized={p.hasOptimized} sizes="(min-width: 900px) 40vw, 90vw" />
              </div>
              <figcaption className="pers__mcap">
                <span className="eyebrow eyebrow--gold">{String(i + 1).padStart(2, '0')} · {p.eyebrow}</span>
                <span>{p.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="pers__final">
          <h3 className="display-sm">Tudo com a identidade da sua festa.</h3>
          <Button variant="gold" onClick={() => scrollToId('monte-sua-festa')}>Quero personalizar minha festa</Button>
        </div>
      </div>
    </section>
  )
}
