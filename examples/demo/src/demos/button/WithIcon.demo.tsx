import { Button } from '@skygraph/react'

/**
 * Put any icon node as the first child. The button uses flex with
 * `gap: --sg-padding-xs` so icon and label stay aligned across
 * all three sizes.
 */
export function WithIconButton() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button type="primary">
        <span aria-hidden>＋</span>
        New project
      </Button>
      <Button>
        <span aria-hidden>⟳</span>
        Refresh
      </Button>
      <Button type="text">
        <span aria-hidden>⌫</span>
        Remove
      </Button>
      <Button aria-label="Search" size="small">
        <span aria-hidden>🔍</span>
      </Button>
    </div>
  )
}
