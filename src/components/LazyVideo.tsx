import { useEffect, useRef } from 'react'
import { asset } from '../config'

type Props = {
  src: string
  poster?: string
  label: string
  className?: string
}

/**
 * Vídeo decorativo: autoplay, muted, loop, playsInline, sem controles.
 * O arquivo só é requisitado quando o container chega perto da viewport,
 * e o vídeo pausa quando sai de cena para não pesar o scroll.
 */
export function LazyVideo({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    let loaded = false
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          loaded = true
          video.src = asset(src)
          video.load()
          near.disconnect()
        }
      },
      { rootMargin: '120% 0px' },
    )
    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded || getComputedStyle(video).visibility === 'hidden') return
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 },
    )
    const onReady = () => {
      // Não toca vídeos que estão ocultos dentro de uma cena fixada (galeria desktop).
      if (getComputedStyle(video).visibility === 'hidden') return
      const r = video.getBoundingClientRect()
      if (r.bottom > 0 && r.top < window.innerHeight) video.play().catch(() => {})
    }
    video.addEventListener('loadeddata', onReady)
    near.observe(video)
    visible.observe(video)
    return () => {
      near.disconnect()
      visible.disconnect()
      video.removeEventListener('loadeddata', onReady)
    }
  }, [src])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster ? asset(poster) : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={label}
      disablePictureInPicture
    />
  )
}
