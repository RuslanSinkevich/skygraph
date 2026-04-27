import type { CSSProperties } from 'react'
import { InputNumber } from '@skygraph/react'

/**
 * InputNumber has no component-specific tokens. It reuses the global
 * form sizing (`--sg-height-*`), border (`--sg-color-border`,
 * `--sg-border-radius`) and background tokens, so scoping those on a
 * wrapper restyles the whole control.
 */
const scoped: CSSProperties = {
  ['--sg-color-border' as never]: '#6366f1',
  ['--sg-border-radius' as never]: '10px',
  ['--sg-color-bg-secondary' as never]: '#eef2ff',
  ['--sg-color-bg-hover' as never]: '#e0e7ff',
  ['--sg-color-text' as never]: '#312e81',
}

export function TokensOverrideInputNumber() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', ...scoped }}>
      <InputNumber defaultValue={7} min={0} max={20} />
      <InputNumber size="large" defaultValue={1.25} step={0.25} precision={2} />
    </div>
  )
}
