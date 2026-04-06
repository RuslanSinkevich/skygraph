import React from 'react'

export interface StepItem {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  status?: 'wait' | 'process' | 'finish' | 'error'
}

export interface StepsProps {
  current: number
  items: StepItem[]
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'default'
  onChange?: (current: number) => void
  type?: 'default' | 'navigation'
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

const CheckIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
  </svg>
)

const ErrorIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 449.8 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9A7.95 7.95 0 00203.8 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 574.1l216.1 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
)

function resolveStatus(index: number, current: number, itemStatus?: StepItem['status']): string {
  if (itemStatus) return itemStatus
  if (index < current) return 'finish'
  if (index === current) return 'process'
  return 'wait'
}

export function Steps({
  current,
  items,
  direction = 'horizontal',
  size = 'default',
  onChange,
  type = 'default',
  className,
  style,
  unstyled,
}: StepsProps) {
  if (unstyled) {
    return (
      <div className={className} style={style}>
        {items.map((item, i) => {
          const status = resolveStatus(i, current, item.status)
          return (
            <div key={i} onClick={() => onChange?.(i)} data-status={status}>
              <span>{item.icon ?? (status === 'finish' ? '✓' : i + 1)}</span>
              <span>{item.title}</span>
              {item.description && <span>{item.description}</span>}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={[
        'sg-steps',
        `sg-steps-${direction}`,
        `sg-steps-${size}`,
        type === 'navigation' ? 'sg-steps-navigation' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {items.map((item, i) => {
        const status = resolveStatus(i, current, item.status)
        const clickable = !!onChange

        return (
          <div
            key={i}
            className={[
              'sg-steps-item',
              `sg-steps-item-${status}`,
              clickable ? 'sg-steps-item-clickable' : '',
            ].filter(Boolean).join(' ')}
            onClick={clickable ? () => onChange!(i) : undefined}
          >
            <div className="sg-steps-item-container">
              <div className="sg-steps-item-icon">
                {item.icon ? (
                  <span className="sg-steps-icon-custom">{item.icon}</span>
                ) : status === 'finish' ? (
                  <span className="sg-steps-icon"><CheckIcon /></span>
                ) : status === 'error' ? (
                  <span className="sg-steps-icon"><ErrorIcon /></span>
                ) : (
                  <span className="sg-steps-icon">{i + 1}</span>
                )}
              </div>
              <div className="sg-steps-item-content">
                <div className="sg-steps-item-title">
                  {item.title}
                  {direction === 'horizontal' && i < items.length - 1 && (
                    <span className="sg-steps-item-tail" />
                  )}
                </div>
                {item.description && (
                  <div className="sg-steps-item-description">{item.description}</div>
                )}
              </div>
            </div>
            {direction === 'vertical' && i < items.length - 1 && (
              <div className="sg-steps-item-tail-vertical" />
            )}
          </div>
        )
      })}
    </div>
  )
}
