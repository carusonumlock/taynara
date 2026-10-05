import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'gold' | 'light'
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
  magnetic?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}

/** CTA com hover elegante e magnetismo muito leve (apenas mouse/desktop). */
export function Button({ children, variant = 'primary', href, onClick, className = '', external, magnetic = true, type = 'button', disabled }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !magnetic) return
    const fine = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!fine.matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.18)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [magnetic])

  const cls = `btn btn--${variant} ${className}`
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </>
  )

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={cls}
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
