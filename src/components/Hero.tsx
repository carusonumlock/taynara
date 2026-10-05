import { useRef } from 'react'
import { HERO_IMAGE, HERO_BG_SMALL, HERO_ASSETS, asset, optimized } from '../config'
import { gsap, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'

type HeroAsset = (typeof HERO_ASSETS)[keyof typeof HERO_ASSETS]

/** PNG Pop Art real (WebP recortado + PNG original de fallback), sem nenhum fundo atrás. */
function PopArt({ a, alt, className }: { a: HeroAsset; alt: string; className?: string }) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={optimized(a.src)} />
      <img src={asset(a.src)} alt={alt} width={a.w} height={a.h} decoding="async" draggable={false} />
    </picture>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToId(id)
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Entrada Pop Art: logo → headline com micro "pop" → botões pelos lados → serviços.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.15 })
        tl.from('.hero__img', { scale: 1.05, duration: 2.2, ease: 'power2.out' }, 0)
          .from('.hero__headline', { opacity: 0, y: 35, duration: 0.5, ease: 'power2.out' }, 0.25)
          .fromTo(
            '.hero__headline',
            { scale: 0.92 },
            { keyframes: [{ scale: 1.025, duration: 0.38, ease: 'power2.out' }, { scale: 1, duration: 0.32, ease: 'power1.inOut' }] },
            0.25,
          )
          .from('.hero__cta--montar', { opacity: 0, x: -36, duration: 0.6, ease: 'back.out(1.4)' }, 0.85)
          .from('.hero__cta--servicos', { opacity: 0, x: 36, duration: 0.6, ease: 'back.out(1.4)' }, 0.97)
          .from('.hero__steps', { opacity: 0, y: 14, duration: 0.6, ease: 'power2.out' }, 1.25)
          .from('.hero__scroll', { opacity: 0, duration: 0.8 }, 1.45)
      })

      // Desktop: hero fixa, zoom cinematográfico, os PNGs se despedem e a próxima seção sobe por cima.
      mm.add(DESKTOP, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: false,
            scrub: 0.6,
          },
        })
        tl.to('.hero__media', { scale: 1.08, ease: 'none', duration: 1 }, 0)
          .to('.hero__brand', { y: -18, ease: 'none', duration: 0.6 }, 0)
          .to('.hero__headline-wrap', { y: -30, scale: 0.95, opacity: 0, ease: 'power1.in', duration: 0.6 }, 0)
          .to('.hero__ctas', { y: -15, opacity: 0, ease: 'power1.in', duration: 0.45 }, 0)
          .to('.hero__steps, .hero__scroll', { opacity: 0, duration: 0.2 }, 0)
          .to('.hero__veil', { opacity: 1, ease: 'none', duration: 0.5 }, 0.5)
      })

      // Mobile: parallax leve, sem pin.
      mm.add(MOBILE, () => {
        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
          .to('.hero__media', { yPercent: 18, scale: 1.08, ease: 'none' }, 0)
          .to('.hero__headline-wrap', { y: -30, scale: 0.95, opacity: 0, ease: 'none' }, 0)
          .to('.hero__ctas, .hero__steps', { y: -15, opacity: 0, ease: 'none' }, 0)
      })
    },
    { scope: root },
  )

  return (
    <section id="inicio" className="hero" ref={root}>
      <div className="hero__media">
        <picture>
          <source
            type="image/webp"
            srcSet={`${asset(HERO_BG_SMALL)} 1100w, ${optimized(HERO_IMAGE)} 1672w`}
            sizes="100vw"
          />
          <img
          className="hero__img"
          src={asset(HERO_IMAGE)}
          alt="Cenário de aniversário de 60 anos em estilo pop art, em roxo e dourado, com neon Happy Birthday e números 60 iluminados"
          decoding="async"
          {...{ fetchpriority: 'high' }}
          />
        </picture>
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__brand">
          {/* H1 semântico para SEO/leitores de tela; o visual é o PNG */}
          <h1 className="sr-only">Sua festa inteira, em um só lugar.</h1>
          <div className="hero__headline-wrap">
            <PopArt a={HERO_ASSETS.headline} alt="Sua festa inteira, em um só lugar." className="hero__headline" />
          </div>
        </div>

        <div className="hero__actions">
          <div className="hero__ctas">
            <a
              href="#monte-sua-festa"
              className="hero-asset-button hero__cta--montar"
              aria-label="Montar minha festa"
              onClick={go('monte-sua-festa')}
            >
              <PopArt a={HERO_ASSETS.btnMontar} alt="" />
              <span className="sr-only">Montar minha festa</span>
            </a>
            <a
              href="#conceito"
              className="hero-asset-button hero__cta--servicos"
              aria-label="Conhecer nossos serviços"
              onClick={go('conceito')}
            >
              <PopArt a={HERO_ASSETS.btnServicos} alt="" />
              <span className="sr-only">Conhecer nossos serviços</span>
            </a>
          </div>

          <ol className="hero__steps" aria-label="Nossos serviços">
            <li><b>01</b> Personalizados</li>
            <li aria-hidden="true" className="hero__arrow">→</li>
            <li><b>02</b> Decoração</li>
            <li aria-hidden="true" className="hero__arrow">→</li>
            <li><b>03</b> Buffet</li>
          </ol>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollToId('conceito')}>
        <span>Role para descobrir</span>
        <i aria-hidden="true" />
      </button>
    </section>
  )
}
