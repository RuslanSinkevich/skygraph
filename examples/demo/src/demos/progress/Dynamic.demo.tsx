import { useState } from 'react'
import { Progress, Button } from '@skygraph/react'

/**
 * Drive the bar from state. `percent` is clamped into [0, 100] so
 * you can lazily increment without an upstream min / max guard.
 */
export function DynamicProgress() {
  const [percent, setPercent] = useState(30)
  const bump = (delta: number) => setPercent((p) => Math.min(100, Math.max(0, p + delta)))

  return (
    <div style={{ maxWidth: 400 }}>
      <Progress percent={percent} />
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Button size="small" onClick={() => bump(-10)}>−10</Button>
        <Button size="small" onClick={() => bump(+10)}>+10</Button>
        <Button size="small" onClick={() => setPercent(0)}>Reset</Button>
      </div>
    </div>
  )
}
