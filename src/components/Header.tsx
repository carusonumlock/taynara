import { useEffect, useState } from 'react'
import { NAV } from '../config'
import { scrollToId } from '../lib/scroll'
import { Logo } from './Logo'
import { Button } from './Button'

export function Header() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setCompact(window.scrollY > 24)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className={`header ${compact ? 'is-compact' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bar">
        <a href="#inicio" className="header__logo" onClick={go('inicio')}>
          <Logo />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="header__cta">
          <Button variant="light" onClick={() => scrollToId('monte-sua-festa')} className="btn--sm">
            Pedir orçamento
          </Button>
        </div>
        <button
          className="header__burger"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className="mobile-menu" aria-hidden={!open}>
        <nav aria-label="Menu">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}>
              <small>0{i + 1}</small>
              {n.label}
            </a>
          ))}
        </nav>
        <Button variant="gold" onClick={() => { setOpen(false); scrollToId('monte-sua-festa') }} magnetic={false}>
          Pedir orçamento
        </Button>
      </div>
    </header>
  )
}
