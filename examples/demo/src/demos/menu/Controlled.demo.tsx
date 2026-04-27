import { useState } from 'react'
import { Menu, Button } from '@skygraph/react'
import { sidebarItems } from './data'

/**
 * Controlled — the parent keeps `selectedKeys` and `openKeys` in sync.
 * Useful when selection comes from the URL or a remote store.
 */
export function ControlledMenu() {
  const [selected, setSelected] = useState<string[]>(['projects'])
  const [open, setOpen] = useState<string[]>(['team'])

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ maxWidth: 256, flex: 1 }}>
        <Menu
          mode="inline"
          items={sidebarItems}
          selectedKeys={selected}
          openKeys={open}
          onSelect={(info) => setSelected(info.selectedKeys)}
          onOpenChange={(keys) => setOpen(keys)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          <div>Selected: {selected.join(', ') || '—'}</div>
          <div>Open: {open.join(', ') || '—'}</div>
        </div>
        <Button size="small" onClick={() => setSelected(['billing'])}>Jump to Billing</Button>
        <Button size="small" onClick={() => setOpen(['team', 'settings'])}>Expand all submenus</Button>
      </div>
    </div>
  )
}
