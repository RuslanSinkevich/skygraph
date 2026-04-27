import { useState } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * Classic pager: ‹ numbered buttons › with ellipsis folding once the
 * total exceeds seven pages. Clamping is done inside the component
 * so passing invalid `current` values won't crash.
 */
export function BasicPagination() {
  const [page, setPage] = useState(1)
  return <Pagination current={page} total={50} onChange={setPage} />
}
