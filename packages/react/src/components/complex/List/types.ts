import type React from 'react'

export interface ListProps<T = any> {
  dataSource: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  loading?: boolean
  loadMore?: React.ReactNode
  pagination?: false | {
    current?: number
    pageSize?: number
    total?: number
    onChange?: (page: number, pageSize: number) => void
  }
  grid?: {
    gutter?: number
    column?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
  }
  size?: 'small' | 'default' | 'large'
  split?: boolean
  bordered?: boolean
  locale?: { emptyText?: React.ReactNode }
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export interface ListItemProps {
  children?: React.ReactNode
  actions?: React.ReactNode[]
  extra?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}
