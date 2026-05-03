import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    button: 'Warm theme ▾',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    button: 'Тёплая тема ▾',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * Dropdown has no component-specific tokens — scope the surface and
 * hover globals to restyle without editing the theme. The `danger`
 * row follows `--sg-color-error` + `--sg-color-error-bg`.
 */
const scoped: CSSProperties = {
  ['--sg-color-bg-elevated' as never]: '#fef3c7',
  ['--sg-color-border-secondary' as never]: '#fcd34d',
  ['--sg-color-bg-hover' as never]: '#fde68a',
  ['--sg-border-radius-lg' as never]: '12px',
  ['--sg-shadow-lg' as never]: '0 12px 30px rgba(202, 138, 4, 0.25)',
  ['--sg-color-error' as never]: '#b91c1c',
  ['--sg-color-error-bg' as never]: '#fecaca',
}

export function TokensOverrideDropdown() {
  const t = useDemoStrings(STRINGS)
  const items = useMemo<DropdownItem[]>(
    () => [
      { key: '1', label: t.edit },
      { key: '2', label: t.duplicate },
      { key: '3', label: t.archive, disabled: true },
      { key: 'd1', label: '', divider: true },
      { key: '4', label: t.delete, danger: true },
    ],
    [t],
  )

  return (
    <div style={scoped}>
      <Dropdown items={items} trigger="click">
        <Button>{t.button}</Button>
      </Dropdown>
    </div>
  )
}
