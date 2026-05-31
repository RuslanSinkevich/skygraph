import { useState } from 'react'
import { Menu } from '@skygraph/react'
import type { MenuItem } from '@skygraph/react'

/**
 * Custom #1 — App launcher sidebar.
 *
 * Demonstrates how `--sg-*` tokens scoped on a wrapper turn the default
 * Menu into a SaaS-style launcher: gradient accent for the selected row,
 * coloured glyph badges, soft hover, no global tokens touched.
 *
 * No CSS-in-JS magic — just inline `style` overriding three global tokens
 * and a `className` for fine-tuning row visuals.
 */
const Glyph = ({ ch, bg }: { ch: string; bg: string }) => (
  <span
    aria-hidden
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      borderRadius: 8,
      background: bg,
      color: '#fff',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    }}
  >
    {ch}
  </span>
)

const items: MenuItem[] = [
  {
    key: 'inbox',
    label: 'Inbox',
    icon: <Glyph ch="✉" bg="linear-gradient(135deg,#5b8def,#3b6cff)" />,
  },
  {
    key: 'tasks',
    label: 'Tasks',
    icon: <Glyph ch="✓" bg="linear-gradient(135deg,#34c759,#1ea14b)" />,
  },
  {
    key: 'docs',
    label: 'Documents',
    icon: <Glyph ch="¶" bg="linear-gradient(135deg,#ffb84d,#ff8a00)" />,
  },
  {
    key: 'calendar',
    label: 'Calendar',
    icon: <Glyph ch="◫" bg="linear-gradient(135deg,#ff7a8b,#e63b67)" />,
  },
  {
    key: 'team',
    label: 'Workspaces',
    icon: <Glyph ch="◌" bg="linear-gradient(135deg,#a78bfa,#7c3aed)" />,
    children: [
      { key: 'design', label: 'Design' },
      { key: 'engineering', label: 'Engineering' },
      { key: 'marketing', label: 'Marketing' },
    ],
  },
]

export function CustomAppLauncherMenu() {
  const [selected, setSelected] = useState<string[]>(['inbox'])

  return (
    <div
      className="demo-menu-launcher"
      style={
        {
          width: 280,
          padding: 16,
          borderRadius: 18,
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--sg-color-primary) 6%, var(--sg-color-bg) 94%) 0%, var(--sg-color-bg) 100%)',
          border:
            '1px solid color-mix(in srgb, var(--sg-color-primary) 14%, var(--sg-color-border-secondary) 86%)',
          boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
          ['--sg-color-primary-bg' as never]:
            'color-mix(in srgb, var(--sg-color-primary) 12%, var(--sg-color-bg) 88%)',
          ['--sg-color-bg-hover' as never]:
            'color-mix(in srgb, var(--sg-color-primary) 5%, var(--sg-color-bg) 95%)',
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
          padding: '4px 8px 14px',
        }}
      >
        <Glyph ch="S" bg="linear-gradient(135deg,#0ea5e9,#6366f1)" />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>SkyGraph Cloud</span>
          <span
            style={{
              fontSize: 11,
              color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
            }}
          >
            ny-prod · synced
          </span>
        </div>
      </div>
      <Menu
        mode="inline"
        items={items}
        selectedKeys={selected}
        defaultOpenKeys={['team']}
        onSelect={(info) => setSelected(info.selectedKeys)}
      />
    </div>
  )
}
