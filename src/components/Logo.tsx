/**
 * LOGO DA TAYNÁ FESTAS
 * ---------------------------------------------------------------
 * Logo real: src/assets/logo/logo.jpg (original enviado, fundo preto).
 * Exibimos src/assets/otimizadas/logo/logo-transparente.png: mesma arte, recortada,
 * com o preto convertido em transparência para assentar no header claro e escuro.
 * O wordmark tipográfico abaixo só aparece se LOGO_FILE ficar vazio.
 *
 * Para usar a logo real:
 *   1. coloque o arquivo em src/assets/logo/ (ex.: src/assets/logo/logo.png)
 *   2. preencha LOGO_FILE abaixo com o caminho, ex.: 'logo/logo.png'
 * O componente passa a exibir a imagem automaticamente em todo o site.
 */
import { asset } from '../config'

export const LOGO_FILE = 'otimizadas/logo/logo-transparente.png'

export function Logo({ className = '' }: { className?: string }) {
  if (LOGO_FILE) {
    return <img className={`logo logo--img ${className}`} src={asset(LOGO_FILE)} alt="Taynara Festas" />
  }
  return (
    <span className={`logo ${className}`} aria-label="Tayná Festas">
      <span className="logo__name">Tayná</span>
      <span className="logo__sub">Festas</span>
    </span>
  )
}
