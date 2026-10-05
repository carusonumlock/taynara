/* ==========================================================================
   CONFIGURAÇÃO CENTRAL — Tayná Festas
   ========================================================================== */

/**
 * >>> COLOQUE AQUI O NÚMERO REAL DO WHATSAPP <<<
 * Formato: código do país + DDD + número, só dígitos. Ex.: '5521999999999'
 * Enquanto estiver vazio, o botão abre o WhatsApp com a mensagem pronta
 * e a pessoa escolhe o contato manualmente.
 */
export const WHATSAPP_NUMBER = ''

/**
 * TODAS as fotos e vídeos ficam dentro do código, em src/assets/ (nomes sem acentos
 * nem espaços, para funcionar em qualquer hospedagem: Vercel, Netlify, etc.).
 * O Vite empacota cada arquivo em dist/assets com um nome único e seguro.
 * Para usar um arquivo, informe o caminho relativo a src/assets, ex.: 'decoracao/mickey-realeza.webp'.
 */
const MEDIA = import.meta.glob<string>('./assets/**/*.{png,jpg,jpeg,webp,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const asset = (path: string) => {
  const url = MEDIA[`./assets/${path}`]
  if (!url) console.warn(`[Tayná Festas] arquivo não encontrado em src/assets: ${path}`)
  return url ?? ''
}

/** Versão web (WebP) gerada a partir do original, usada como <source>; o original fica como fallback. */
export const optimized = (path: string) => asset(`otimizadas/${path.replace(/\.[^./]+$/, '')}.webp`)

/* --------------------------------------------------------------------------
   Inventário real dos arquivos (src/assets)
   -------------------------------------------------------------------------- */

export const HERO_IMAGE = 'hero/fundo-pop-art-60-anos.png'
/** cópia WebP menor do fundo da Hero, para celular */
export const HERO_BG_SMALL = 'otimizadas/hero/fundo-pop-art-60-anos-1100.webp'

export type Produto = {
  src: string
  hasOptimized: boolean
  alt: string
  eyebrow: string
  caption: string
}

export const PRODUTOS: Produto[] = [
  {
    src: 'personalizados/caneca-floral-aline.png',
    hasOptimized: true,
    alt: 'Caneca floral personalizada com o nome Aline',
    eyebrow: 'Canecas personalizadas',
    caption: 'Um presente com a identidade de quem recebe.',
  },
  {
    src: 'personalizados/canecas-cerveja-roxo.png',
    hasOptimized: true,
    alt: 'Canecas de chopp personalizadas com frases divertidas',
    eyebrow: 'Canecas para brindar',
    caption: 'Frases e bom humor para levantar o brinde.',
  },
  {
    src: 'personalizados/canecas-flamengo-botafogo.png',
    hasOptimized: true,
    alt: 'Canecas personalizadas do Flamengo e do Botafogo',
    eyebrow: 'Paixões em destaque',
    caption: 'O time do coração também entra na festa.',
  },
  {
    src: 'personalizados/camisetas-bordo-congresso.png',
    hasOptimized: true,
    alt: 'Camisetas bordô personalizadas para congresso de jovens',
    eyebrow: 'Camisetas',
    caption: 'Sua ideia também pode ser vestida.',
  },
  {
    src: 'personalizados/casal-coracao-puzzle.png',
    hasOptimized: true,
    alt: 'Casal usando camisetas personalizadas de coração que se completam',
    eyebrow: 'Presentes',
    caption: 'Pequenos detalhes. Grandes lembranças.',
  },
]

export type Decoracao = {
  kind: 'image' | 'video'
  src: string
  hasOptimized?: boolean
  poster?: string
  alt: string
  eyebrow: string
  title: string
  /** cor de fundo do palco enquanto este trabalho está em cena */
  tone: string
}

/** Ordem da galeria imersiva. Os dois vídeos ficam separados na narrativa. */
export const DECORACOES: Decoracao[] = [
  {
    kind: 'image',
    src: 'decoracao/mesa-60-anos-verde-dourado.png',
    hasOptimized: true,
    alt: 'Mesa de aniversário de 60 anos em verde, dourado e prata',
    eyebrow: '60 anos',
    title: 'Celebrações elegantes',
    tone: '#16201a',
  },
  {
    kind: 'image',
    src: 'decoracao/festa-15-anos-roxo-prata.png',
    hasOptimized: true,
    alt: 'Decoração de 15 anos em roxo e prata com balões e painel brilhante',
    eyebrow: '15 anos',
    title: 'Momentos inesquecíveis',
    tone: '#2a1352',
  },
  {
    kind: 'video',
    src: 'decoracao/video-15-anos-lilas-prata.mp4',
    poster: 'posters/video-15-anos-lilas-prata.jpg',
    alt: 'Vídeo de decoração de 15 anos em tons de lilás e prata',
    eyebrow: 'Em movimento',
    title: 'Cada detalhe, de perto',
    tone: '#1a0d30',
  },
  {
    kind: 'image',
    src: 'decoracao/mickey-realeza.webp',
    alt: 'Decoração infantil com tema Mickey Realeza em azul e dourado',
    eyebrow: 'Infantil',
    title: 'Um universo criado para eles',
    tone: '#0a1440',
  },
  {
    kind: 'video',
    src: 'decoracao/video-decoracao-azul-vime.mp4',
    poster: 'posters/video-decoracao-azul-vime.jpg',
    alt: 'Vídeo de decoração em azul, dourado e vime',
    eyebrow: 'Decorações personalizadas',
    title: 'Cada festa com sua própria identidade',
    tone: '#0d1c33',
  },
]

export type BuffetItem = {
  title: string
  text: string
  /**
   * FUTURAS FOTOS REAIS DO BUFFET:
   * coloque o arquivo em src/assets/buffet/ e informe o caminho aqui,
   * ex.: image: 'buffet/doces.jpg'. Sem imagem, o card usa a arte abstrata.
   */
  image?: string
  art: 'doces' | 'salgados' | 'bolos' | 'bebidas' | 'completo'
}

export const BUFFET: BuffetItem[] = [
  { title: 'Doces', text: 'Para adoçar cada momento da festa.', art: 'doces' },
  { title: 'Salgados', text: 'Para receber bem do início ao fim.', art: 'salgados' },
  { title: 'Bolos', text: 'O centro da mesa e das fotos.', art: 'bolos' },
  { title: 'Bebidas', text: 'Para brindar junto com quem você ama.', art: 'bebidas' },
  { title: 'Buffet completo', text: 'Tudo pensado para os seus convidados.', art: 'completo' },
]

export const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'personalizados', label: 'Personalizados' },
  { id: 'decoracao', label: 'Decoração' },
  { id: 'buffet', label: 'Buffet' },
  { id: 'monte-sua-festa', label: 'Monte sua festa' },
]

/* --------------------------------------------------------------------------
   Hero Pop Art — arquivos reais em src/assets/hero.
   Para exibir, usamos cópias WebP com a transparência preservada e as bordas
   transparentes vazias recortadas (src/assets/otimizadas/hero); o PNG original é o fallback.
   -------------------------------------------------------------------------- */
export const HERO_ASSETS = {
  /** "Sua festa inteira, em um só lugar." em 3D */
  headline: { src: 'hero/titulo-sua-festa-inteira.png', w: 1400, h: 561 },
  /** botão dourado "Montar minha festa" */
  btnMontar: { src: 'hero/botao-montar-minha-festa.png', w: 1400, h: 334 },
  /** botão neon "Conhecer nossos serviços" */
  btnServicos: { src: 'hero/botao-conhecer-servicos.png', w: 1400, h: 305 },
}
