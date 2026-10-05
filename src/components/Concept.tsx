import { useRef } from 'react'
import { gsap, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'
import { SERVICE_ICONS } from './Icons'
import { Lines } from './Lines'

const STEPS = [
  { n: '01', title: 'Personalizados', text: 'A identidade da festa em cada peça.' },
  { n: '02', title: 'Decoração', text: 'O espaço vira cenário.' },
  { n: '03', title: 'Buffet', text: 'A experiência chega à mesa.' },
]

export function Concept() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current!
      let last = -1
      const steps = gsap.utils.toArray<HTMLElement>('.concept__step')
      const paint = (i: number) =>
        steps.forEach((s, k) => {
          s.classList.toggle('is-on', k <= i)
          s.classList.toggle('is-current', k === i)
        })
      const setActive = (p: number) => {
        // 3 etapas: ativa conforme o progresso cruza 0.12 / 0.5 / 0.88
        const i = p < 0.12 ? -1 : p < 0.5 ? 0 : p < 0.88 ? 1 : 2
        if (i !== last) {
          last = i
          paint(i)
        }
      }
      const mm = gsap.matchMedia()

      mm.add(DESKTOP, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.5,
            onUpdate: (s) => setActive(s.progress),
          },
        })
        tl.fromTo('.concept__fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
          .to('.concept__bignum', { xPercent: -12, ease: 'none', duration: 1 }, 0)
        return () => {
          paint(-1)
          last = -1
        }
      })

      mm.add(MOBILE, () => {
        gsap.fromTo(
          '.concept__fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.concept__steps',
              start: 'top 70%',
              end: 'bottom 55%',
              scrub: true,
              onUpdate: (s) => setActive(s.progress),
            },
          },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        paint(2)
      })
    },
    { scope: root },
  )

  return (
    <section id="conceito" className="concept" ref={root} data-header="light">
      <div className="concept__bignum" aria-hidden="true">01 · 02 · 03</div>
      <div className="concept__inner">
        <div className="concept__head">
          <p className="eyebrow" data-reveal="fade">Do primeiro detalhe à festa completa</p>
          <Lines className="display concept__title" lines={['Uma ideia.', 'Uma equipe.', <em key="e">A festa inteira.</em>]} />
          <p className="lead concept__text" data-reveal="fade">
            Dos primeiros detalhes personalizados à decoração completa e ao buffet, cuidamos de cada etapa para você
            aproveitar o que realmente importa.
          </p>
        </div>

        <div className="concept__steps">
          <span className="concept__track" aria-hidden="true">
            <span className="concept__fill" />
          </span>
          <ol>
          {STEPS.map((s, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <li className="concept__step" key={s.n} data-i={i}>
                <span className="concept__dot" aria-hidden="true" />
                <span className="concept__num">{s.n}</span>
                <span className="concept__icon"><Icon /></span>
                <strong>{s.title}</strong>
                <small>{s.text}</small>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </section>
  )
}
