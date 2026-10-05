import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Evita recalcular tudo quando a barra de endereço do celular aparece/some.
ScrollTrigger.config({ ignoreMobileResize: true })

/** Desktop com movimento: pinning, scrub e narrativas longas. */
export const DESKTOP = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'
/** Mobile com movimento: animações curtas, sem pinning pesado. */
export const MOBILE = '(max-width: 899px) and (prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, useGSAP }
