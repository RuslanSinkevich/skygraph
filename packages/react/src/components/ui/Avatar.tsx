import React from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, SizeType } from '../../types'

export interface AvatarProps extends BaseComponentProps {
  src?: string
  alt?: string
  'aria-label'?: string
  size?: SizeType | number
  shape?: 'circle' | 'square'
  icon?: React.ReactNode
  children?: React.ReactNode
}

const sizeMap: Record<string, number> = {
  small: 24,
  default: 32,
  large: 40,
}

export function Avatar({
  src,
  alt,
  'aria-label': ariaLabel,
  size: sizeProp,
  shape = 'circle',
  icon,
  children,
  className,
  style,
  unstyled,
}: AvatarProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const avatarSize = typeof size === 'number' ? size : (size === 'middle' ? 'default' : size)
  const px = typeof size === 'number' ? size : sizeMap[avatarSize]
  const fontSize = Math.round(px * 0.45)

  if (unstyled) {
    return (
      <span className={className} style={style} role="img" aria-label={ariaLabel}>
        {src ? <img src={src} alt={alt} /> : icon ?? children}
      </span>
    )
  }

  const classes = [
    'sg-avatar',
    `sg-avatar-${shape}`,
    typeof size === 'string' ? `sg-avatar-${avatarSize}` : '',
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
    <span className={classes} style={sizeStyle} role="img" aria-label={ariaLabel}>
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
