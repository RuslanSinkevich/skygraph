import type { CSSProperties } from 'react'
import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'default',
    success: 'success',
    warning: 'warning',
    error: 'error',
    processing: 'processing',
  },
  ru: {
    default: 'обычный',
    success: 'успех',
    warning: 'предупреждение',
    error: 'ошибка',
    processing: 'в процессе',
  },
} as const

/**
 * Tag has no component-specific tokens — override the globals it
 * composes. Bumping `--sg-border-radius-sm` gives you rounded pills;
 * shifting `--sg-color-*-bg` and `--sg-color-*` rebrands the presets.
 */
const scoped: CSSProperties = {
  ['--sg-border-radius-sm' as never]: '999px',
  ['--sg-padding-sm' as never]: '10px',
  ['--sg-color-success' as never]: '#16a34a',
  ['--sg-color-success-bg' as never]: '#dcfce7',
  ['--sg-color-warning' as never]: '#d97706',
  ['--sg-color-warning-bg' as never]: '#fef3c7',
  ['--sg-color-error' as never]: '#dc2626',
  ['--sg-color-error-bg' as never]: '#fee2e2',
  ['--sg-color-primary' as never]: '#7c3aed',
  ['--sg-color-primary-bg' as never]: '#ede9fe',
}

export function TokensOverrideTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ ...scoped, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag>{t.default}</Tag>
      <Tag color="success">{t.success}</Tag>
      <Tag color="warning">{t.warning}</Tag>
      <Tag color="error">{t.error}</Tag>
      <Tag color="processing">{t.processing}</Tag>
    </div>
  )
}
