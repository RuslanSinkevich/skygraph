import type { CSSProperties } from 'react'
import { Progress } from '@skygraph/react'

/**
 * Progress has no component-private tokens — scope the theme
 * primitives it reads (`--sg-color-primary`, `--sg-color-bg-hover`,
 * `--sg-color-success/error`) on a wrapper to rebrand every bar and
 * ring inside.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: '#7c3aed',
  ['--sg-color-bg-hover' as never]: '#ede9fe',
  ['--sg-color-success' as never]: '#0ea5e9',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  maxWidth: 400,
}

export function TokensOverrideProgress() {
  return (
    <div style={scoped}>
      <Progress percent={35} />
      <Progress percent={75} status="active" />
      <Progress percent={100} />
    </div>
  )
}
