import { useRef } from 'react'
import { gsap, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { SERVICE_ICONS } from './Icons'
import { Button } from './Button'

const SERVICES = ['Personalizados', 'Decoração', 'Buffet']

export function Conclusao() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(DESKTOP, () => {
        const orbs = gsap.utils.toArray<HTMLElement>('.union__orb')
        // separados em linha → triângulo sobreposto no centro
        const SPREAD = [-1, 0, 1]
        const UNION = [
          { x: -0.36, y: -0.2 },
          { x: 0.36, y: -0.2 },
          { x: 0, y: 0.38 },
        ]
        const size = () => orbs[0].offsetWidth

        gsap.set('.union__plus', { opacity: 1 })
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=260%',
            pin: '.concl__pin',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        tl.from('.concl__quote .line-inner', { yPercent: 110, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, 0)
          .to('.concl__quote', { yPercent: -60, scale: 0.6, opacity: 0, duration: 0.8 }, 0.9)
          .fromTo('.union', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 1.1)
          .fromTo(
            orbs,
            { x: (i) => SPREAD[i] * window.innerWidth * 0.3, y: 0, scale: 0.85 },
            { x: (i) => SPREAD[i] * window.innerWidth * 0.3, scale: 1, duration: 0.4, stagger: 0.06 },
            1.1,
          )
          .to(orbs, { x: (i) => UNION[i].x * size(), y: (i) => UNION[i].y * size(), duration: 1.2 }, 1.7)
          .to('.union__plus', { opacity: 0, scale: 0.4, duration: 0.4 }, 1.7)
          .fromTo('.union__glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1 }, 2.2)
          .fromTo('.union__equals', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 2.6)
          .to('.union', { scale: 0.72, transformOrigin: '50% 0%', duration: 0.8 }, 3.3)
          .fromTo('.concl__close > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, 3.5)
          .to({}, { duration: 0.4 })
      })

      mm.add(MOBILE, () => {
        const orbs = gsap.utils.toArray<HTMLElement>('.union__orb')
        gsap.from('.concl__quote .line-inner', {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.concl__quote', start: 'top 80%' },
        })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.union', start: 'top 85%', end: 'center 45%', scrub: 0.5 },
        })
        tl.fromTo(orbs, { y: (i) => i * 130 - 30, x: 0 }, { y: (i) => [-0.2, -0.2, 0.36][i] * orbs[0].offsetWidth, x: (i) => [-0.34, 0.34, 0][i] * orbs[0].offsetWidth, ease: 'power2.inOut' })
          .fromTo('.union__plus', { opacity: 1 }, { opacity: 0 }, 0)
          .fromTo('.union__glow', { opacity: 0 }, { opacity: 1 }, 0.5)
          .fromTo('.union__equals', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.6)
        gsap.from('.concl__close > *', {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.concl__close', start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="festa-completa" className="concl sheet sheet--dark" ref={root}>
      <div className="concl__pin">
        <h2 className="display concl__quote">
          <span className="line"><span className="line-inner">Você imagina.</span></span>
          <span className="line"><span className="line-inner"><em>A Tayná Festas</em></span></span>
          <span className="line"><span className="line-inner"><em>faz acontecer.</em></span></span>
        </h2>

        <div className="union">
          <div className="union__glow" aria-hidden="true" />
          <div className="union__orbs">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[i]
              return (
                <div className="union__orb" key={s}>
                  <Icon />
                  <span>{s}</span>
                </div>
              )
            })}
            <span className="union__plus union__plus--a" aria-hidden="true">+</span>
            <span className="union__plus union__plus--b" aria-hidden="true">+</span>
          </div>
          <p className="union__equals">
            <span aria-hidden="true">=</span> Festa completa
          </p>
        </div>

        <div className="concl__close">
          <p className="display-sm">Menos fornecedores.</p>
          <p className="display-sm">Mais organização.</p>
          <p className="display-sm"><em>Uma experiência completa.</em></p>
          <div className="concl__cta">
            <Button variant="gold" onClick={() => scrollToId('monte-sua-festa')}>Montar minha festa</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
