import React from 'react'
import { Spin } from '../../ui/Spin'
import { Pagination } from '../../ui/Pagination'
import { Empty } from '../../ui/Empty'
import type { ListProps, ListItemProps, ListItemMetaProps } from './types'

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ')
}

function ListItemMeta({ avatar, title, description }: ListItemMetaProps) {
  return (
    <div className="sg-list-item-meta">
      {avatar && <div className="sg-list-item-meta-avatar">{avatar}</div>}
      <div className="sg-list-item-meta-content">
        {title && <h4 className="sg-list-item-meta-title">{title}</h4>}
        {description && <div className="sg-list-item-meta-description">{description}</div>}
      </div>
    </div>
  )
}

function ListItemComponent({ children, actions, extra, className, style }: ListItemProps) {
  return (
    <div className={cls('sg-list-item', className)} style={style}>
      <div className="sg-list-item-main">
        <div className="sg-list-item-content">{children}</div>
        {actions && actions.length > 0 && (
          <ul className="sg-list-item-actions">
            {actions.map((action, i) => (
              <li key={i} className="sg-list-item-action">{action}</li>
            ))}
          </ul>
        )}
      </div>
      {extra && <div className="sg-list-item-extra">{extra}</div>}
    </div>
  )
}

type ListItemType = typeof ListItemComponent & { Meta: typeof ListItemMeta }

const Item = ListItemComponent as ListItemType
Item.Meta = ListItemMeta

function ListInner<T = any>({
  dataSource,
  renderItem,
  header,
  footer,
  loading = false,
  loadMore,
  pagination,
  grid,
  size = 'default',
  split = true,
  bordered = false,
  locale,
  className,
  style,
  unstyled,
}: ListProps<T>) {
  const [internalPage, setInternalPage] = React.useState(1)

  const pageSize = pagination ? (pagination.pageSize ?? 10) : dataSource.length
  const currentPage = pagination ? (pagination.current ?? internalPage) : 1
  const total = pagination ? (pagination.total ?? dataSource.length) : dataSource.length

  const paginatedData = React.useMemo(() => {
    if (!pagination) return dataSource
    const start = (currentPage - 1) * pageSize
    return dataSource.slice(start, start + pageSize)
  }, [dataSource, pagination, currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setInternalPage(page)
    if (pagination) {
      pagination.onChange?.(page, pageSize)
    }
  }

  const emptyText = locale?.emptyText ?? 'No Data'

  const gridStyle = React.useMemo((): React.CSSProperties | undefined => {
    if (!grid) return undefined
    const cols = grid.column ?? 1
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: grid.gutter ? `${grid.gutter}px` : undefined,
    }
  }, [grid])

  const gridResponsiveClass = React.useMemo(() => {
    if (!grid) return ''
    const parts: string[] = []
    if (grid.xs) parts.push(`sg-list-grid-xs-${grid.xs}`)
    if (grid.sm) parts.push(`sg-list-grid-sm-${grid.sm}`)
    if (grid.md) parts.push(`sg-list-grid-md-${grid.md}`)
    if (grid.lg) parts.push(`sg-list-grid-lg-${grid.lg}`)
    return parts.join(' ')
  }, [grid])

  if (unstyled) {
    return (
      <div className={className} style={style}>
        {header}
        {loading ? (
          <Spin unstyled />
        ) : paginatedData.length === 0 ? (
          <div>{emptyText}</div>
        ) : (
          <div style={gridStyle}>
            {paginatedData.map((item, i) => (
              <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
            ))}
          </div>
        )}
        {loadMore}
        {pagination && (
          <Pagination
            unstyled
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        )}
        {footer}
      </div>
    )
  }

  const wrapperClass = cls(
    'sg-list',
    `sg-list-${size}`,
    split && 'sg-list-split',
    bordered && 'sg-list-bordered',
    loading && 'sg-list-loading',
    grid && 'sg-list-grid',
    gridResponsiveClass,
    className,
  )

  return (
    <div className={wrapperClass} style={style}>
      {header && <div className="sg-list-header">{header}</div>}

      <Spin spinning={loading}>
        {paginatedData.length === 0 ? (
          <div className="sg-list-empty">
            <Empty description={emptyText} />
          </div>
        ) : (
          <div className="sg-list-items" style={gridStyle}>
            {paginatedData.map((item, i) => (
              <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
            ))}
          </div>
        )}
      </Spin>

      {loadMore && <div className="sg-list-load-more">{loadMore}</div>}

      {pagination && (
        <div className="sg-list-pagination">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}

      {footer && <div className="sg-list-footer">{footer}</div>}
    </div>
  )
}

type ListType = typeof ListInner & { Item: ListItemType }

export const List = ListInner as ListType
;(List as any).Item = Item
