import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Concept } from './components/Concept'
import { Personalizados } from './components/Personalizados'
import { Decoracao } from './components/Decoracao'
import { Buffet } from './components/Buffet'
import { Conclusao } from './components/Conclusao'
import { Wizard } from './components/Wizard'
import { Footer } from './components/Footer'

export default function App() {
  const main = useRef<HTMLElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)

  // Efeitos globais: reveals de títulos/textos, parallax dos números e troca suave de fundo entre universos.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
          gsap.from(el.querySelectorAll('.line-inner'), {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      })
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const k = parseFloat(el.dataset.parallax || '0.2')
          gsap.to(el, {
            yPercent: k * 100,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })
      })

      // Header claro sobre seções claras
      const header = document.querySelector('.header')
      gsap.utils.toArray<HTMLElement>('[data-header="light"]').forEach((section) => {
        // seção fixada por ela mesma: usa o pin-spacer para cobrir todo o tempo do pin
        const parent = section.parentElement
        const trigger = parent?.classList.contains('pin-spacer') ? parent : section
        ScrollTrigger.create({
          trigger,
          start: 'top 36px',
          end: 'bottom 36px',
          onToggle: (self) => header?.classList.toggle('is-light', self.isActive),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-tone]').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(backdrop.current, { backgroundColor: section.dataset.tone, duration: 0.9, ease: 'power1.out', overwrite: 'auto' })
            }
          },
        })
      })
    },
    { scope: main },
  )

  useEffect(() => {
    // Recalcula posições depois que fontes e imagens assentam (evita gatilhos deslocados).
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <div className="backdrop" ref={backdrop} aria-hidden="true" />
      <Header />
      <main ref={main}>
        <Hero />
        <Concept />
        <Personalizados />
        <Decoracao />
        <Buffet />
        <Conclusao />
        <Wizard />
      </main>
      <Footer />
    </>
  )
}
