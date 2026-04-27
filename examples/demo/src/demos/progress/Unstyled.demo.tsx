import { Progress } from '@skygraph/react'

/**
 * `unstyled` drops all SkyGraph classes and renders a minimal
 * `role="progressbar"` wrapper with bare inline track + fill. Use
 * the raw props + your own CSS to reach any design target.
 */
export function UnstyledProgress() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Progress unstyled percent={45} strokeColor="#0ea5e9" />
      <Progress unstyled percent={90} strokeColor="#22c55e" strokeWidth={12} />
    </div>
  )
}
