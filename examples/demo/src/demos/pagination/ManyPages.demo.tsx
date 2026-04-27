import { useState } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * For totals > 7 pages, the pager renders first + current neighbours
 * + last with `…` placeholders between them — the ellipsis is purely
 * visual (non-clickable) to avoid ambiguous jump targets.
 */
export function ManyPagesPagination() {
  const [page, setPage] = useState(25)
  return <Pagination current={page} total={500} onChange={setPage} />
}
