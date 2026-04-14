import React from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

export interface ButtonProps extends BaseComponentProps, InteractiveProps, SizableProps {
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link'
  htmlType?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

export function Button({
  type = 'default',
  size: sizeProp,
  disabled: disabledProp,
  loading,
  htmlType = 'button',
  onClick,
  children,
  className,
  style,
  unstyled,
}: ButtonProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

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
