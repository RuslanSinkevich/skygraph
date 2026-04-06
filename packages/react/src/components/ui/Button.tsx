import React from 'react'
import { Spin } from './Spin'

export interface ButtonProps {
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link'
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  loading?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Button({
  type = 'default',
  size = 'middle',
  disabled,
  loading,
  htmlType = 'button',
  onClick,
  children,
  className,
  style,
  unstyled,
}: ButtonProps) {
  const classes = unstyled
    ? className ?? ''
    : [
        'sg-button',
        `sg-button-${type}`,
        `sg-button-${size}`,
        loading ? 'sg-button-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')

  return (
    <button
      type={htmlType}
      className={classes}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spin size="small" unstyled={unstyled} />}
      {children}
    </button>
  )
}
