import { useMemo, useState } from 'react'
import { Menu } from '@skygraph/react'
import type { MenuItem } from '@skygraph/react'

/**
 * Custom #3 — Search-driven command palette (dark).
 *
 * Sits on a dark gradient surface, narrows the item list by a query, and
 * shows shortcut chips on the right side of each row. Built entirely on
 * the public Menu API:
 *   - filter happens in user-land (re-builds `items`),
 *   - shortcut chip is part of `label` (ReactNode is allowed),
 *   - `theme="dark"` flips the menu palette,
 *   - wrapper sets `--sg-*` tokens for the brand colour and radii.
 */
type Cmd = { key: string; group: string; label: string; hint: string; shortcut?: string }

const COMMANDS: Cmd[] = [
  {
    key: 'go-dashboard',
    group: 'Navigate',
    label: 'Go to Dashboard',
    hint: 'jump to overview',
    shortcut: 'G D',
  },
  {
    key: 'go-projects',
    group: 'Navigate',
    label: 'Go to Projects',
    hint: 'all workspaces',
    shortcut: 'G P',
  },
  {
    key: 'go-inbox',
    group: 'Navigate',
    label: 'Go to Inbox',
    hint: 'notifications',
    shortcut: 'G I',
  },
  {
    key: 'new-task',
    group: 'Create',
    label: 'New task',
    hint: 'add to current project',
    shortcut: '⌘ N',
  },
  { key: 'new-doc', group: 'Create', label: 'New document', hint: 'blank page', shortcut: '⌘ D' },
  { key: 'new-team', group: 'Create', label: 'New team', hint: 'invite members', shortcut: '⌘ T' },
  {
    key: 'toggle-theme',
    group: 'Settings',
    label: 'Toggle theme',
    hint: 'light / dark',
    shortcut: '⌘ ⇧ L',
  },
  {
    key: 'open-settings',
    group: 'Settings',
    label: 'Open settings',
    hint: 'account, billing',
    shortcut: '⌘ ,',
  },
  { key: 'sign-out', group: 'Account', label: 'Sign out', hint: 'end session' },
]

function Row({ label, hint, shortcut }: { label: string; hint: string; shortcut?: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', minWidth: 0 }}>
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span
          style={{
            fontSize: 11,
            opacity: 0.65,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {hint}
        </span>
      </span>
      {shortcut && (
        <kbd
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            fontSize: 11,
            fontFamily: 'var(--sg-font-mono, monospace)',
            color: 'rgba(255,255,255,0.85)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 6,
            letterSpacing: '0.04em',
          }}
        >
          {shortcut}
        </kbd>
      )}
    </span>
  )
}

function buildItems(commands: Cmd[]): MenuItem[] {
  const groups = new Map<string, Cmd[]>()
  for (const cmd of commands) {
    if (!groups.has(cmd.group)) groups.set(cmd.group, [])
    groups.get(cmd.group)!.push(cmd)
  }
  const items: MenuItem[] = []
  let groupIndex = 0
  for (const [name, list] of groups) {
    if (groupIndex > 0) items.push({ key: `div-${name}`, type: 'divider', label: '' })
    items.push({
      key: `g-${name}`,
      type: 'group',
      label: name,
      children: list.map((cmd) => ({
        key: cmd.key,
        label: <Row label={cmd.label} hint={cmd.hint} shortcut={cmd.shortcut} />,
      })),
    })
    groupIndex += 1
  }
  return items
}

export function CustomCommandPaletteMenu() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.hint.toLowerCase().includes(q) ||
        cmd.group.toLowerCase().includes(q),
    )
  }, [query])

  const items = useMemo(() => buildItems(filtered), [filtered])

  return (
    <div
      style={
        {
          width: 380,
          padding: 14,
          borderRadius: 16,
          color: '#fff',
          background:
            'radial-gradient(120% 80% at 100% 0%, rgba(59,130,246,0.25) 0%, transparent 55%), linear-gradient(160deg,#0b1220 0%,#111827 55%,#1f2937 100%)',
          border: '1px solid rgba(148,163,184,0.18)',
          boxShadow: '0 22px 40px -18px rgba(15,23,42,0.55)',
          ['--sg-color-primary' as never]: '#60a5fa',
          ['--sg-color-primary-bg' as never]: 'rgba(96,165,250,0.18)',
          ['--sg-border-radius' as never]: '10px',
          ['--sg-padding-lg' as never]: '14px',
        } as React.CSSProperties
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px',
          marginBottom: 10,
          background: 'rgba(15,23,42,0.55)',
          border: '1px solid rgba(148,163,184,0.18)',
          borderRadius: 10,
        }}
      >
        <span aria-hidden style={{ fontSize: 14, opacity: 0.7 }}>
          ⌕
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command…"
          aria-label="Search commands"
          style={{
            all: 'unset',
            flex: 1,
            fontSize: 13,
            color: '#e2e8f0',
            caretColor: '#60a5fa',
          }}
        />
        <kbd
          style={{
            fontSize: 10,
            padding: '2px 6px',
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 6,
          }}
        >
          ⌘ K
        </kbd>
      </div>
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        <Menu
          mode="inline"
          theme="dark"
          items={items}
          selectedKeys={selected}
          onSelect={(info) => setSelected(info.selectedKeys)}
        />
      </div>
    </div>
  )
}
