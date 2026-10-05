const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const IconPersonalizados = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" {...base}>
    <path d="M10 14h22v20a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V14z" />
    <path d="M32 19h3a5 5 0 0 1 0 10h-3" />
    <path d="M17 24c1.5-2.5 6.5-2.5 8 0-1.5 3-4 4.5-4 4.5S18.5 27 17 24z" />
    <path d="M15 8v2M21 6v4M27 8v2" />
  </svg>
)

export const IconDecoracao = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" {...base}>
    <ellipse cx="17" cy="15" rx="7" ry="8.5" />
    <ellipse cx="31" cy="12" rx="6" ry="7.5" />
    <path d="M17 23.5l-1.5 2h3zM31 19.5l-1.5 2h3z" />
    <path d="M17 25.5c0 6-4 8-4 14M31 21.5c0 7 4 10 4 18" />
    <path d="M8 42h32" />
  </svg>
)

export const IconBuffet = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" {...base}>
    <path d="M8 30h32" />
    <path d="M11 30a13 13 0 0 1 26 0" />
    <path d="M24 14v3M22 13h4" />
    <path d="M6 36h36" />
  </svg>
)

export const SERVICE_ICONS = [IconPersonalizados, IconDecoracao, IconBuffet]
