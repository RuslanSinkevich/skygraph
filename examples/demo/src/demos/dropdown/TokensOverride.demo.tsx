import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Dropdown has no component-specific tokens — it composes the surface and
 * hover globals; the danger row follows `--sg-color-error`. Three scoped
 * recipes — branded green, dark field, glass pick — restyle the menu.
 */
const STRINGS = {
  en: { button: 'Actions ▾', edit: 'Edit', duplicate: 'Duplicate', delete: 'Delete…' },
  ru: { button: 'Действия ▾', edit: 'Редактировать', duplicate: 'Дублировать', delete: 'Удалить…' },
} as const

function DropdownCard() {
  const t = useDemoStrings(STRINGS)
  const items = useMemo<DropdownItem[]>(
    () => [
      { key: '1', label: t.edit },
      { key: '2', label: t.duplicate },
      { key: 'd1', label: '', divider: true },
      { key: '3', label: t.delete, danger: true },
    ],
    [t],
  )
  return (
    <Dropdown items={items} trigger="click">
      <Button>{t.button}</Button>
    </Dropdown>
  )
}

export function TokensOverrideDropdown() {
  return <TokenScopeCards render={() => <DropdownCard />} />
}
