import { Skeleton } from '@skygraph/react'

/**
 * `active` turns on a 1.5s gradient sweep that signals "still
 * working". Drop it on any long-lived placeholder to avoid the
 * "is the UI frozen?" question.
 */
export function ActiveSkeleton() {
  return <Skeleton active />
}
