import { useMemo, useState } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    hoverMe: 'Hover me',
    lastAction: 'last action:',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    hoverMe: 'Наведите курсор',
    lastAction: 'последнее действие:',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * Hover the trigger to reveal the menu. `onSelect` fires with the
 * item's `key`. Items with `disabled` can't be clicked; `danger`
 * paints the row in the error palette; `divider` renders a line.
 */
export function BasicDropdown() {
  const t = useDemoStrings(STRINGS)
  const [last, setLast] = useState<string | null>(null)

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Dropdown items={items} onSelect={setLast}>
        <Button>{t.hoverMe}</Button>
      </Dropdown>
      {last && (
        <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
          {t.lastAction} <code>{last}</code>
        </span>
      )}
    </div>
  )
}
