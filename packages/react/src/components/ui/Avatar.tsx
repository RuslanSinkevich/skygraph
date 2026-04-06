import React from 'react'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: 'small' | 'default' | 'large' | number
  shape?: 'circle' | 'square'
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

const sizeMap: Record<string, number> = {
  small: 24,
  default: 32,
  large: 40,
}

export function Avatar({
  src,
  alt,
  size = 'default',
  shape = 'circle',
  icon,
  children,
  className,
  style,
  unstyled,
}: AvatarProps) {
  const px = typeof size === 'number' ? size : sizeMap[size]
  const fontSize = Math.round(px * 0.45)

  if (unstyled) {
    return (
      <span className={className} style={style}>
        {src ? <img src={src} alt={alt} /> : icon ?? children}
      </span>
    )
  }

  const classes = [
    'sg-avatar',
    `sg-avatar-${shape}`,
    typeof size === 'string' ? `sg-avatar-${size}` : '',
    className,
  ].filter(Boolean).join(' ')

  const sizeStyle: React.CSSProperties = {
    width: px,
    height: px,
    lineHeight: `${px}px`,
    fontSize: src ? undefined : fontSize,
    ...style,
  }

  return (
    <span className={classes} style={sizeStyle}>
      {src ? (
        <img className="sg-avatar-image" src={src} alt={alt} />
      ) : icon ? (
        <span className="sg-avatar-icon">{icon}</span>
      ) : (
        <span className="sg-avatar-text">{children}</span>
      )}
    </span>
  )
}
