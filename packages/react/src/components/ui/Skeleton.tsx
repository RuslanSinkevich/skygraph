import React from 'react'

export interface SkeletonProps {
  active?: boolean
  avatar?: boolean | { size?: number; shape?: 'circle' | 'square' }
  title?: boolean | { width?: number | string }
  paragraph?: boolean | { rows?: number; width?: Array<number | string> }
  loading?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Skeleton({
  active = false,
  avatar,
  title = true,
  paragraph = true,
  loading = true,
  children,
  className,
  style,
  unstyled,
}: SkeletonProps) {
  if (!loading) return <>{children}</>

  const avatarSize = typeof avatar === 'object' ? avatar.size ?? 40 : 40
  const avatarShape = typeof avatar === 'object' ? avatar.shape ?? 'circle' : 'circle'
  const titleWidth = typeof title === 'object' ? title.width ?? '38%' : '38%'
  const rows = typeof paragraph === 'object' ? paragraph.rows ?? 3 : 3
  const rowWidths = typeof paragraph === 'object' ? paragraph.width : undefined

  const getRowWidth = (index: number, total: number): string | number => {
    if (rowWidths && rowWidths[index] !== undefined) return rowWidths[index]
    if (index === total - 1) return '61%'
    return '100%'
  }

  if (unstyled) {
    return (
      <div className={className} style={style}>
        {avatar && <div style={{ width: avatarSize, height: avatarSize }} />}
        <div>
          {title && <div style={{ width: titleWidth, height: 16 }} />}
          {paragraph &&
            Array.from({ length: rows }, (_, i) => (
              <div key={i} style={{ width: getRowWidth(i, rows), height: 16 }} />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={[
        'sg-skeleton',
        active ? 'sg-skeleton-active' : '',
        avatar ? 'sg-skeleton-with-avatar' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {avatar && (
        <div className="sg-skeleton-header">
          <span
            className={[
              'sg-skeleton-avatar',
              `sg-skeleton-avatar-${avatarShape}`,
            ].join(' ')}
            style={{ width: avatarSize, height: avatarSize }}
          />
        </div>
      )}
      <div className="sg-skeleton-content">
        {title && (
          <div
            className="sg-skeleton-title"
            style={{ width: typeof titleWidth === 'number' ? `${titleWidth}px` : titleWidth }}
          />
        )}
        {paragraph && (
          <ul className="sg-skeleton-paragraph">
            {Array.from({ length: rows }, (_, i) => {
              const w = getRowWidth(i, rows)
              return (
                <li
                  key={i}
                  style={{ width: typeof w === 'number' ? `${w}px` : w }}
                />
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
