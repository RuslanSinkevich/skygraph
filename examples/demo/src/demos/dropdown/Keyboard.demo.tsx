import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    button: 'Tab here, then Space',
    hint: 'Try',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    button: 'Tab сюда, затем Space',
    hint: 'Попробуйте',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

/**
 * Keyboard support is baked in: Tab to focus the trigger, Space /
 * Enter to open, ↑ / ↓ to move focus (skipping disabled + dividers),
 * Enter to activate, Esc to close.
 */
export function KeyboardDropdown() {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Dropdown items={items} trigger="click">
        <Button>{t.button}</Button>
      </Dropdown>
      <p style={{ margin: 0, fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {t.hint} <kbd>Tab</kbd> → <kbd>Space</kbd> → <kbd>↓</kbd> → <kbd>Enter</kbd>
      </p>
    </div>
  )
}
