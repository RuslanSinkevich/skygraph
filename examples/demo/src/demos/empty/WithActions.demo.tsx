import { Empty, Button } from '@skygraph/react'

/**
 * `children` render below the description. Use for primary calls to
 * action — "Create", "Reset filters", "Invite someone". Keep it to
 * one or two buttons so the empty state stays scannable.
 */
export function WithActionsEmpty() {
  return (
    <Empty description="You haven't created any projects yet">
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Button type="primary">Create project</Button>
        <Button>Import</Button>
      </div>
    </Empty>
  )
}
