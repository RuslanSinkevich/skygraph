import { Result } from '@skygraph/react'

/**
 * `icon` replaces the preset artwork — emoji, SVG, or a library
 * icon all work. The `status` still decides colour for the default
 * icon path, but if you render your own node you control the tint.
 */
export function CustomIconResult() {
  return (
    <Result
      status="info"
      icon={<span style={{ fontSize: 64 }}>🚀</span>}
      title="Deploy started"
      subTitle="Build #1242 is running, ETA 2 min"
    />
  )
}
