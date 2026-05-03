import type { CSSProperties } from 'react'
import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    title: 'Reset all layout preferences?',
    description: 'Panels, themes, and font size will go back to defaults.',
    okText: 'Reset',
    button: 'Reset preferences',
  },
  ru: {
    title: 'Сбросить все настройки макета?',
    description: 'Панели, темы и размер шрифта вернутся к значениям по умолчанию.',
    okText: 'Сбросить',
    button: 'Сбросить настройки',
  },
} as const

/**
 * Popconfirm has no component-specific tokens — tune the surface
 * globals (`--sg-color-bg-elevated`, `--sg-border-radius-lg`,
 * `--sg-shadow-lg`) and the icon uses `--sg-color-warning`.
 */
const scoped: CSSProperties = {
  ['--sg-border-radius-lg' as never]: '14px',
  ['--sg-color-bg-elevated' as never]: '#fff7ed',
  ['--sg-color-border-secondary' as never]: '#fdba74',
  ['--sg-color-warning' as never]: '#ea580c',
  ['--sg-shadow-lg' as never]: '0 12px 28px rgba(234, 88, 12, 0.15)',
  ['--sg-color-primary' as never]: '#ea580c',
  ['--sg-color-primary-hover' as never]: '#c2410c',
}

export function TokensOverridePopconfirm() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={scoped}>
      <Popconfirm
        title={t.title}
        description={t.description}
        okText={t.okText}
      >
        <Button>{t.button}</Button>
      </Popconfirm>
    </div>
  )
}
