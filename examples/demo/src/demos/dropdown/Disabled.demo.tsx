import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    disabled: 'Disabled',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    disabled: 'Отключено',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * `disabled` prevents the menu from opening and short-circuits
 * `onSelect`. The trigger's own click / hover state is untouched —
 * use it to handle the "try again later" hint.
 */
export function DisabledDropdown() {
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
    <Dropdown items={items} disabled>
      <Button disabled>{t.disabled}</Button>
    </Dropdown>
  )
}
