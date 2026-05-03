import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    trigger: 'Unstyled trigger',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    trigger: 'Триггер без стилей',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * `unstyled` drops the sg-dropdown classes and leaves you with a
 * `<div>` + `<hr>` skeleton. The behaviour (open / close, hover
 * handling, `onSelect`) stays — you bring your own styling.
 */
export function UnstyledDropdown() {
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
    <Dropdown unstyled items={items} trigger="click">
      <Button>{t.trigger}</Button>
    </Dropdown>
  )
}
