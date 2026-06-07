import { useState } from 'react'
import { Pagination } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Pagination composes the form-chip tokens for idle buttons and the primary
 * palette for the active chip. Three scoped recipes — branded green, dark
 * field, glass pick — restyle the whole pager.
 */
export function TokensOverridePagination() {
  const [page, setPage] = useState(3)
  return (
    <TokenScopeCards render={() => <Pagination current={page} total={120} onChange={setPage} />} />
  )
}
