import { useRef } from 'react'
import { DECORACOES } from '../config'
import { gsap, ScrollTrigger, useGSAP, DESKTOP, MOBILE } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { Picture } from './Picture'
import { LazyVideo } from './LazyVideo'
import { Lines } from './Lines'
import { Button } from './Button'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Máscara inicial do vídeo: nasce no centro da foto anterior (que está recebendo zoom)
 * e se abre até ocupar quase toda a tela. Retângulo no 1º vídeo, círculo no 2º.
 */
function videoReveal(photo: HTMLElement, video: HTMLElement, shape: 'inset' | 'circle'): [string, string] {
  const vw = video.offsetWidth
  const vh = video.offsetHeight
  const cx = photo.offsetLeft + photo.offsetWidth / 2 - video.offsetLeft
  const cy = photo.offsetTop + photo.offsetHeight / 2 - video.offsetTop
  if (shape === 'circle') {
    const at = `at ${((cx / vw) * 100).toFixed(2)}% ${((cy / vh) * 100).toFixed(2)}%`
    return [`circle(0% ${at})`, `circle(76% at 50% 50%)`]
  }
  const w = photo.offsetWidth * 0.34
  const h = photo.offsetHeight * 0.34
  const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(2)}%`
  return [
    `inset(${pct(cy - h / 2, vh)} ${pct(vw - cx - w / 2, vw)} ${pct(vh - cy - h / 2, vh)} ${pct(cx - w / 2, vw)} round 28px)`,
    'inset(0% 0% 0% 0% round 28px)',
  ]
}

export function Decoracao() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const gal = root.current!.querySelector<HTMLElement>('.gal')!
      const slides = gsap.utils.toArray<HTMLElement>('.gal__slide')
      const items = gsap.utils.toArray<HTMLElement>('.gal__index li')
      const n = slides.length

      mm.add(DESKTOP, () => {
        const q = (el: HTMLElement, sel: string) => el.querySelector(sel)!
        const lines = (el: HTMLElement) => el.querySelectorAll('.gal__text .line-inner')

        gsap.set(gal, { backgroundColor: DECORACOES[0].tone })
        slides.forEach((s, i) => {
          if (i === 0) return
          gsap.set(s, { autoAlpha: 0 })
          gsap.set(lines(s), { yPercent: 110 })
        })

        // a primeira foto se abre por máscara enquanto a galeria chega ao topo
        gsap.fromTo(
          q(slides[0], '.gal__frame'),
          { clipPath: 'inset(14% 18% 14% 18% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            ease: 'none',
            scrollTrigger: { trigger: gal, start: 'top bottom', end: 'top top', scrub: true },
          },
        )
        gsap.from(lines(slides[0]), {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: gal, start: 'top 35%' },
        })

        let active = -1
        const setActive = (i: number) => {
          if (i === active) return
          active = i
          items.forEach((li, k) => li.classList.toggle('is-active', k === i))
        }
        setActive(0)

        const syncVideos = () => {
          slides.forEach((s) => {
            const v = s.querySelector('video')
            if (!v || !v.currentSrc) return
            const visible = Number(gsap.getProperty(s, 'opacity')) > 0.01
            if (visible && v.paused) v.play().catch(() => {})
            else if (!visible && !v.paused) v.pause()
          })
        }

        const OFFSET = 0.35
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: gal,
            start: 'top top',
            end: () => `+=${(n - 1) * 100 + 60}%`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const t = tl.time() - OFFSET
            setActive(Math.max(0, Math.min(n - 1, Math.floor(t + 0.5))))
            syncVideos()
          },
        })

        tl.fromTo('.gal__railfill', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: n - 1 + OFFSET * 2 }, 0)

        for (let i = 1; i < n; i++) {
          const prev = slides[i - 1]
          const next = slides[i]
          const t = OFFSET + (i - 1)
          const isVideo = DECORACOES[i].kind === 'video'

          tl.set(next, { autoAlpha: 1 }, t)
          tl.to(gal, { backgroundColor: DECORACOES[i].tone, duration: 0.9, ease: 'none' }, t)
          tl.to(lines(prev), { yPercent: -110, duration: 0.35, stagger: 0.04, ease: 'power2.in' }, t)
          tl.to(q(prev, '.gal__num'), { opacity: 0, xPercent: -10, duration: 0.4 }, t)
          tl.fromTo(q(next, '.gal__num'), { opacity: 0, xPercent: 10 }, { opacity: 1, xPercent: 0, duration: 0.6 }, t + 0.3)

          if (isVideo) {
            const photoFrame = q(prev, '.gal__frame') as HTMLElement
            const videoFrame = q(next, '.gal__frame') as HTMLElement
            const shape = i === 2 ? 'inset' : 'circle'
            // a foto recebe scale enquanto o vídeo surge através da máscara
            tl.to(q(prev, '.gal__media'), { scale: 1.16, duration: 0.9, ease: 'power1.in' }, t)
            tl.fromTo(
              videoFrame,
              { clipPath: () => videoReveal(photoFrame, videoFrame, shape)[0] },
              { clipPath: () => videoReveal(photoFrame, videoFrame, shape)[1], duration: 0.9 },
              t + 0.05,
            )
            tl.fromTo(q(next, '.gal__media'), { scale: 1.2 }, { scale: 1, duration: 0.95, ease: 'power2.out' }, t + 0.05)
          } else {
            // a próxima fotografia sobe e cresce, a anterior sai devagar
            tl.fromTo(q(next, '.gal__frame'), { y: () => window.innerHeight * 0.95, scale: 0.9 }, { y: 0, scale: 1, duration: 0.9 }, t)
            tl.fromTo(q(next, '.gal__media'), { scale: 1.25 }, { scale: 1, duration: 0.95, ease: 'power2.out' }, t)
            tl.to(q(prev, '.gal__frame'), { scale: 0.9, y: () => -window.innerHeight * 0.06, duration: 0.9 }, t)
          }
          tl.to(prev, { autoAlpha: 0, duration: 0.25 }, t + 0.7)
          tl.to(lines(next), { yPercent: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, t + 0.45)
        }
        tl.to({}, { duration: OFFSET })

        return () => setActive(-1)
      })

      mm.add(MOBILE, () => {
        gsap.set(gal, { backgroundColor: DECORACOES[0].tone })
        slides.forEach((s, i) => {
          const frame = s.querySelector('.gal__frame')
          gsap.fromTo(
            frame,
            { clipPath: 'inset(8% 10% 8% 10% round 22px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 22px)',
              ease: 'none',
              scrollTrigger: { trigger: s, start: 'top 95%', end: 'top 35%', scrub: true },
            },
          )
          gsap.fromTo(
            s.querySelector('.gal__media'),
            { scale: 1.18 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'center center', scrub: true } },
          )
          gsap.from(s.querySelectorAll('.gal__text .line-inner'), {
            yPercent: 110,
            stagger: 0.08,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: s.querySelector('.gal__text'), start: 'top 88%' },
          })
          ScrollTrigger.create({
            trigger: s,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) =>
              self.isActive && gsap.to(gal, { backgroundColor: DECORACOES[i].tone, duration: 0.8, overwrite: 'auto' }),
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="decoracao" className="decor" ref={root} data-tone="#130a22">
      <header className="decor__intro">
        <div className="bignum decor__bignum" aria-hidden="true" data-parallax="-0.2">02</div>
        <p className="eyebrow eyebrow--gold" data-reveal="fade">02 — Decoração</p>
        <Lines className="display decor__title" lines={['Agora a festa', <em key="e">ganha vida.</em>]} />
        <p className="lead decor__lead" data-reveal="fade">
          Transformamos espaços em cenários para momentos que ficam na memória.
        </p>
      </header>

      <div className="gal">
        <div className="gal__index" aria-hidden="true">
          <span className="gal__rail"><span className="gal__railfill" /></span>
          <ol>
            {DECORACOES.map((_, i) => (
              <li key={i} className={i === 0 ? 'is-active' : ''}>{pad(i + 1)}</li>
            ))}
          </ol>
        </div>

        {DECORACOES.map((d, i) => (
          <article className={`gal__slide gal__slide--${d.kind}`} key={d.src} data-i={i}>
            <div className="gal__num" aria-hidden="true">{pad(i + 1)}</div>
            <div className="gal__frame">
              <div className="gal__media">
                {d.kind === 'video' ? (
                  <LazyVideo src={d.src} poster={d.poster} label={d.alt} />
                ) : (
                  <Picture src={d.src} alt={d.alt} hasOptimized={d.hasOptimized} sizes="(min-width: 900px) 60vw, 100vw" />
                )}
              </div>
              {d.kind === 'video' && <div className="gal__shade" aria-hidden="true" />}
            </div>
            <div className="gal__text">
              <p className="eyebrow">
                <span className="line"><span className="line-inner"><span className="gal__mnum">{pad(i + 1)} · </span>{d.eyebrow}</span></span>
              </p>
              <h3 className="display-md">
                <span className="line"><span className="line-inner">{d.title}</span></span>
              </h3>
            </div>
          </article>
        ))}
      </div>

      <div className="decor__outro">
        <p className="lead" data-reveal="fade">Cada festa com sua própria identidade.</p>
        <div data-reveal="fade">
          <Button variant="light" onClick={() => scrollToId('monte-sua-festa')}>Quero uma decoração assim</Button>
        </div>
      </div>
    </section>
  )
}
