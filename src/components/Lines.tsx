import type { ReactNode, ElementType } from 'react'

type Props = {
  lines: ReactNode[]
  as?: ElementType
  className?: string
  reveal?: boolean
}

/** Título quebrado em linhas mascaradas — cada linha pode ser revelada com yPercent. */
export function Lines({ lines, as: Tag = 'h2', className = '', reveal = true }: Props) {
  return (
    <Tag className={className} data-reveal={reveal ? 'lines' : undefined}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  )
}
