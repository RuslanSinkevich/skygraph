import React from 'react'
import type { BaseComponentProps } from '../../types'

export interface BreadcrumbItem {
  title: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export function Breadcrumb({
  items,
  separator = '/',
  className,
  style,
  unstyled,
}: BreadcrumbProps) {
  if (unstyled) {
    return (
      <nav className={className} style={style} aria-label="Breadcrumb">
        {items.map((item, i) => (
          <span key={i}>
            {item.href ? <a href={item.href}>{item.title}</a> : item.title}
            {i < items.length - 1 && <span>{separator}</span>}
          </span>
        ))}
      </nav>
    )
  }

  return (
    <nav
      className={['sg-breadcrumb', className].filter(Boolean).join(' ')}
      style={style}
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <React.Fragment key={i}>
            {item.href || item.onClick ? (
              <a
                className="sg-breadcrumb-link"
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault()
                    item.onClick()
                  }
                }}
              >
                {item.title}
              </a>
            ) : (
              <span className={isLast ? 'sg-breadcrumb-current' : 'sg-breadcrumb-link'}>
                {item.title}
              </span>
            )}
            {!isLast && (
              <span className="sg-breadcrumb-separator">{separator}</span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
