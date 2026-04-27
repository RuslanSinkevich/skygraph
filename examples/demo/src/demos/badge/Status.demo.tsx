import { Badge } from '@skygraph/react'

/**
 * When Badge has no children but gets a `status`, it renders a
 * standalone dot + label row. `processing` pulses with a keyframe
 * animation to hint "currently active".
 */
export function StatusBadge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="warning" text="Warning" />
      <Badge status="processing" text="Processing" />
      <Badge status="default" text="Default" />
    </div>
  )
}
