import type { CSSProperties } from 'react'
import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * Cascader has no component-scoped tokens — it is styled entirely through
 * the global palette. Override the global variables on a scoped wrapper to
 * re-skin a single Cascader without affecting the page.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: 'var(--sg-purple-6)',
  ['--sg-color-primary-hover' as never]: 'var(--sg-purple-5)',
  ['--sg-color-primary-bg' as never]: 'var(--sg-purple-1)',
  ['--sg-border-radius' as never]: '12px',
  ['--sg-shadow-lg' as never]: '0 16px 40px rgba(88, 55, 177, 0.24)',
}

export function TokensOverrideCascader() {
  return (
    <div style={{ ...scoped, maxWidth: 340 }}>
      <Cascader options={regionOptions} defaultValue={['zhejiang', 'hangzhou', 'xihu']} />
    </div>
  )
}
