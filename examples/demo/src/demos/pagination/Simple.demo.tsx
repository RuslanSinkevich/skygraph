import { useState } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * `simple` drops the numbered buttons for a compact "page / total"
 * counter flanked by prev / next. Great fit for toolbars that already
 * have a "show total" label nearby.
 */
export function SimplePagination() {
  const [page, setPage] = useState(3)
  return <Pagination simple current={page} total={50} onChange={setPage} />
}
