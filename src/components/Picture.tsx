import { asset, optimized } from '../config'

type Props = {
  src: string
  alt: string
  hasOptimized?: boolean
  className?: string
  eager?: boolean
  sizes?: string
}

/** Fotografia real: WebP otimizada quando existir, com o arquivo original como fallback. */
export function Picture({ src, alt, hasOptimized, className, eager, sizes }: Props) {
  return (
    <picture className={className}>
      {hasOptimized && <source type="image/webp" srcSet={optimized(src)} sizes={sizes} />}
      <img
        src={asset(src)}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </picture>
  )
}
