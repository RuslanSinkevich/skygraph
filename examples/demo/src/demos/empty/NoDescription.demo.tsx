import { Empty } from '@skygraph/react'

/**
 * `description={null}` hides the caption entirely — image only.
 * `description={undefined}` (omitting the prop) falls back to the
 * default "No Data" string.
 */
export function NoDescriptionEmpty() {
  return <Empty description={null} />
}
