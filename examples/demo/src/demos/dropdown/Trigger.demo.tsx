import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    clickTrigger: 'Click trigger',
    hoverTrigger: 'Hover trigger',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    clickTrigger: 'По клику',
    hoverTrigger: 'По наведению',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * Click is the natural trigger for action menus — users press the
 * button intentionally, then pick a row. Hover is best for always-
 * visible chrome like breadcrumb pop-outs.
 */
export function TriggerDropdown() {
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
    <div style={{ display: 'flex', gap: 8 }}>
      <Dropdown items={items} trigger="click">
        <Button>{t.clickTrigger}</Button>
      </Dropdown>
      <Dropdown items={items} trigger="hover">
        <Button>{t.hoverTrigger}</Button>
      </Dropdown>
    </div>
  )
}
