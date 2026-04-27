import { useState, type CSSProperties } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * Pagination composes the form-chip tokens for idle buttons and the
 * primary palette for the active chip. Tint `--sg-color-primary`
 * plus `--sg-border-radius` to restyle the whole pager.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: '#16a34a',
  ['--sg-color-primary-hover' as never]: '#15803d',
  ['--sg-border-radius' as never]: '999px',
  ['--sg-color-border' as never]: '#bbf7d0',
  ['--sg-font-size' as never]: '13px',
}

export function TokensOverridePagination() {
  const [page, setPage] = useState(3)
  return (
    <div style={scoped}>
      <Pagination current={page} total={120} onChange={setPage} />
    </div>
  )
}
