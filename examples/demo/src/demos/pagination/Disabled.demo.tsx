import { Pagination } from '@skygraph/react'

/**
 * `disabled` fades the whole pager and kills pointer events. Use it
 * while a table is loading so rapid clicks don't stack up requests
 * that will be thrown away.
 */
export function DisabledPagination() {
  return <Pagination disabled current={2} total={50} />
}
