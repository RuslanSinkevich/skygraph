import type React from 'react'

export type SizeType = 'small' | 'middle' | 'large'

export interface BaseComponentProps {
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export interface InteractiveProps {
  disabled?: boolean
  loading?: boolean
}

export interface SizableProps {
  size?: SizeType
}
