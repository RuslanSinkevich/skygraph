import React from 'react'

export interface SpinProps {
  spinning?: boolean
  size?: 'small' | 'default' | 'large'
  delay?: number
  tip?: string
  fullscreen?: boolean
  indicator?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Spin({
  spinning = true,
  size = 'default',
  delay,
  tip,
  fullscreen,
  indicator,
  children,
  className,
  style,
  unstyled,
}: SpinProps) {
  const [visible, setVisible] = React.useState(delay ? false : spinning)

  React.useEffect(() => {
    if (!delay) {
      setVisible(spinning)
      return
    }

    if (spinning) {
      const timer = setTimeout(() => setVisible(true), delay)
      return () => clearTimeout(timer)
    }

    setVisible(false)
  }, [spinning, delay])

  if (!visible && !children) return null
  if (!visible && children) return <>{children}</>

  const spinClasses = unstyled
    ? className ?? ''
    : ['sg-spin', `sg-spin-${size}`, className].filter(Boolean).join(' ')

  const spinElement = indicator ?? (
    <span className={spinClasses} style={style} />
  )

  if (fullscreen) {
    return (
      <div className={unstyled ? '' : 'sg-spin-fullscreen'}>
        <div className={unstyled ? '' : 'sg-spin-fullscreen-inner'}>
          {spinElement}
          {tip && <div className={unstyled ? '' : 'sg-spin-tip'}>{tip}</div>}
        </div>
      </div>
    )
  }

  if (!children) {
    return (
      <span className={unstyled ? '' : 'sg-spin-standalone'} style={style}>
        {spinElement}
        {tip && <div className={unstyled ? '' : 'sg-spin-tip'}>{tip}</div>}
      </span>
    )
  }

  return (
    <div className={unstyled ? '' : 'sg-spin-container'} style={style}>
      <div className={unstyled ? '' : 'sg-spin-overlay'}>
        {spinElement}
        {tip && <div className={unstyled ? '' : 'sg-spin-tip'}>{tip}</div>}
      </div>
      <div className={visible ? (unstyled ? '' : 'sg-spin-blur') : ''}>
        {children}
      </div>
    </div>
  )
}
