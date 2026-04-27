import { useState } from 'react'
import { Pagination } from '@skygraph/react'

/**
 * `showSizeChanger` appends a native `<select>` for page size, and
 * `showQuickJumper` adds a "Go to" input. Combined with
 * `showTotal`, you get the full enterprise-table chrome.
 */
export function SizeChangerPagination() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(20)

  return (
    <Pagination
      current={page}
      pageSize={size}
      total={487}
      onChange={setPage}
      onPageSizeChange={(n) => {
        setSize(n)
        setPage(1)
      }}
      showTotal
      showSizeChanger
      showQuickJumper
      pageSizeOptions={[10, 20, 50, 100]}
    />
  )
}
