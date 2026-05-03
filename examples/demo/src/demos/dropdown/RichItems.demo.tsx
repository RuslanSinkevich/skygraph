import { useMemo } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    newFile: 'New file',
    open: 'Open…',
    save: 'Save',
    saveAs: 'Save as…',
    closeWindow: 'Close window',
    fileMenu: 'File ▾',
  },
  ru: {
    newFile: 'Новый файл',
    open: 'Открыть…',
    save: 'Сохранить',
    saveAs: 'Сохранить как…',
    closeWindow: 'Закрыть окно',
    fileMenu: 'Файл ▾',
  },
} as const

/**
 * `label` is a full `ReactNode` — pair an icon with a description, or
 * render two lines with a shortcut on the right. Keep rows short; if
 * you need sections use dividers.
 */
const row = (icon: string, title: string, shortcut: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', minWidth: 180 }}>
    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <span aria-hidden="true">{icon}</span>
      <span>{title}</span>
    </span>
    <kbd style={{ fontSize: 11, opacity: 0.7 }}>{shortcut}</kbd>
  </div>
)

export function RichItemsDropdown() {
  const t = useDemoStrings(STRINGS)

  const items = useMemo<DropdownItem[]>(
    () => [
      { key: 'new', label: row('📄', t.newFile, '⌘ N') },
      { key: 'open', label: row('📂', t.open, '⌘ O') },
      { key: 'd1', label: '', divider: true },
      { key: 'save', label: row('💾', t.save, '⌘ S') },
      { key: 'save-as', label: row('💾', t.saveAs, '⇧ ⌘ S') },
      { key: 'd2', label: '', divider: true },
      { key: 'close', label: row('✕', t.closeWindow, '⌘ W'), danger: true },
    ],
    [t],
  )

  return (
    <Dropdown items={items} trigger="click">
      <Button>{t.fileMenu}</Button>
    </Dropdown>
  )
}
