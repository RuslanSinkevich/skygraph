import { Progress } from '@skygraph/react'

/**
 * `strokeColor` wins over the theme for the filled portion. The
 * trail keeps using `--sg-color-bg-hover` so contrast stays
 * consistent with the surrounding surface.
 */
export function CustomColorProgress() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ flex: 1, maxWidth: 300 }}>
        <Progress percent={50} strokeColor="#722ed1" />
      </div>
      <Progress type="circle" percent={75} strokeColor="#eb2f96" />
    </div>
  )
}
