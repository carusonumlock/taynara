import type { BuffetItem } from '../config'

/**
 * PLACEHOLDERS VISUAIS ABSTRATOS DO BUFFET
 * Não são fotos — apenas composições discretas para segurar o layout
 * até chegarem as fotografias reais (ver BUFFET[].image em src/config.ts).
 */
export function BuffetArt({ art }: { art: BuffetItem['art'] }) {
  const g = 'url(#bf-gold)'
  return (
    <svg className="buffet-art" viewBox="0 0 300 300" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bf-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0d8a8" />
          <stop offset="1" stopColor="#c99a52" />
        </linearGradient>
      </defs>
      {art === 'doces' &&
        Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={95 + (i % 3) * 55} cy={95 + Math.floor(i / 3) * 55} r={i % 2 ? 17 : 20} fill={i % 2 ? '#5b1fb0' : g} opacity={i % 2 ? 0.85 : 0.9} />
        ))}
      {art === 'salgados' && (
        <g>
          <ellipse cx="150" cy="165" rx="110" ry="34" fill="none" stroke={g} strokeWidth="1.5" />
          {[[105, 150], [150, 140], [195, 152], [128, 172], [175, 174]].map(([x, y], i) => (
            <path key={i} d={`M${x - 20} ${y + 8} Q${x} ${y - 26} ${x + 20} ${y + 8} Z`} fill={i % 2 ? '#5b1fb0' : g} opacity="0.9" />
          ))}
        </g>
      )}
      {art === 'bolos' && (
        <g>
          <rect x="70" y="190" width="160" height="50" rx="8" fill={g} />
          <rect x="95" y="140" width="110" height="50" rx="8" fill="#5b1fb0" />
          <rect x="118" y="98" width="64" height="42" rx="8" fill={g} opacity="0.9" />
          <path d="M60 248h180" stroke="#5b1fb0" strokeWidth="1.5" />
          <circle cx="150" cy="84" r="6" fill="#5b1fb0" />
        </g>
      )}
      {art === 'bebidas' && (
        <g>
          {[95, 150, 205].map((x, i) => (
            <g key={x}>
              <path d={`M${x - 22} 90 h44 l-6 140 h-32 Z`} fill="none" stroke={i === 1 ? g : '#5b1fb0'} strokeWidth="1.6" />
              <path d={`M${x - 19} ${150 - i * 14} h38 l-4 ${80 + i * 14} h-30 Z`} fill={i === 1 ? g : '#5b1fb0'} opacity="0.8" />
              <circle cx={x - 4} cy={130 - i * 10} r="3" fill="#fff" opacity="0.7" />
              <circle cx={x + 5} cy={112 - i * 8} r="2" fill="#fff" opacity="0.6" />
            </g>
          ))}
        </g>
      )}
      {art === 'completo' && (
        <g>
          <path d="M60 240 V140 a90 90 0 0 1 180 0 V240" fill="none" stroke={g} strokeWidth="1.6" />
          <rect x="85" y="200" width="130" height="40" rx="6" fill="#5b1fb0" />
          <circle cx="115" cy="190" r="12" fill={g} />
          <circle cx="150" cy="182" r="18" fill={g} opacity="0.85" />
          <circle cx="185" cy="190" r="12" fill={g} />
        </g>
      )}
    </svg>
  )
}
