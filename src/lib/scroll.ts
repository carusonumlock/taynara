/** Rolagem suave até uma seção, compensando o header fixo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - (id === 'inicio' ? 0 : 64)
  window.scrollTo({ top: id === 'inicio' ? 0 : top, behavior: reduce ? 'auto' : 'smooth' })
}
