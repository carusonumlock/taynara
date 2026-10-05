import { NAV } from '../config'
import { quickQuoteUrl } from '../lib/whatsapp'
import { scrollToId } from '../lib/scroll'
import { Logo } from './Logo'
import { Button } from './Button'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <Logo className="logo--lg" />
          <p className="footer__tag">Sua festa inteira, em um só lugar.</p>
        </div>
        <Button variant="light" href={quickQuoteUrl()} external>Falar no WhatsApp</Button>
      </div>
      <div className="footer__bottom">
        <nav aria-label="Rodapé">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id) }}>{n.label}</a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Tayná Festas · Personalizados, decoração e buffet</p>
      </div>
    </footer>
  )
}
