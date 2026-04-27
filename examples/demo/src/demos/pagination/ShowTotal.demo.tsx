import { useState } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * `showTotal` can be a boolean (renders "Total N") or a function
 * receiving `(total, [start, end])` for a custom label. Use the
 * callback form to localise or to show a range.
 */
export function ShowTotalPagination() {
  const [page, setPage] = useState(3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Pagination current={page} total={85} showTotal onChange={setPage} />
      <Pagination
        current={page}
        total={85}
        pageSize={10}
        showTotal={(total, [from, to]) => `${from}–${to} of ${total}`}
        onChange={setPage}
      />
    </div>
  )
}
