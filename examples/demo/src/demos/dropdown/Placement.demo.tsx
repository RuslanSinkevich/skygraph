import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    bottomLeft: 'bottomLeft',
    bottomRight: 'bottomRight',
    topLeft: 'topLeft',
    topRight: 'topRight',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    bottomLeft: 'снизу слева',
    bottomRight: 'снизу справа',
    topLeft: 'сверху слева',
    topRight: 'сверху справа',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * Four corners are available. `bottomLeft` aligns the menu's left
 * edge with the trigger (default), `bottomRight` aligns the right
 * edge — pick the side that keeps the menu inside the viewport.
 */
export function PlacementDropdown() {
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 8, justifyContent: 'start' }}>
      <Dropdown items={items} placement="bottomLeft">
        <Button>{t.bottomLeft}</Button>
      </Dropdown>
      <Dropdown items={items} placement="bottomRight">
        <Button>{t.bottomRight}</Button>
      </Dropdown>
      <Dropdown items={items} placement="topLeft">
        <Button>{t.topLeft}</Button>
      </Dropdown>
      <Dropdown items={items} placement="topRight">
        <Button>{t.topRight}</Button>
      </Dropdown>
    </div>
  )
}
