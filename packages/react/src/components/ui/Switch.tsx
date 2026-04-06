import React from 'react'
import { Spin } from './Spin'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'default'
  onChange?: (checked: boolean) => void
  checkedChildren?: React.ReactNode
  unCheckedChildren?: React.ReactNode
  className?: string
  unstyled?: boolean
}

export function Switch({
  checked,
  defaultChecked,
  disabled,
  loading,
  size = 'default',
  onChange,
  checkedChildren,
  unCheckedChildren,
  className,
  unstyled,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(
    checked ?? defaultChecked ?? false
  )
  const isChecked = checked ?? internalChecked

  const handleClick = () => {
    if (disabled || loading) return
    const next = !isChecked
    setInternalChecked(next)
    onChange?.(next)
  }

  if (unstyled) {
    return (
      <button
        role="switch"
        aria-checked={isChecked}
        disabled={disabled || loading}
        onClick={handleClick}
        className={className}
      >
        {loading && <Spin size="small" unstyled />}
        {isChecked ? checkedChildren : unCheckedChildren}
      </button>
    )
  }

  const classes = [
    'sg-switch',
    `sg-switch-${size}`,
    isChecked ? 'sg-switch-checked' : '',
    disabled || loading ? 'sg-switch-disabled' : '',
    loading ? 'sg-switch-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      disabled={disabled || loading}
      onClick={handleClick}
      className={classes}
    >
      <span className="sg-switch-inner">
        {loading ? (
          <Spin size="small" unstyled={unstyled} />
        ) : (
          isChecked ? checkedChildren : unCheckedChildren
        )}
      </span>
      <span className="sg-switch-handle" />
    </button>
  )
}
