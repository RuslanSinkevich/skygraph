import { Progress } from '@skygraph/react'

/**
 * `showInfo={false}` hides the trailing label (or inner text for
 * circles). Handy when the component sits next to its own metric
 * readout or inside a compact toolbar.
 */
export function NoInfoProgress() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ flex: 1, maxWidth: 280 }}>
        <Progress percent={62} showInfo={false} />
      </div>
      <Progress type="circle" percent={62} width={48} strokeWidth={4} showInfo={false} />
    </div>
  )
}
