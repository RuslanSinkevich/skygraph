import { Tabs } from '@skygraph/react'

const items = [
  { key: '1', label: 'Amber', children: <p>Amber theme</p> },
  { key: '2', label: 'Second', children: <p>Same primary token</p> },
  { key: '3', label: 'Third', children: <p>Just re-skinned</p> },
]

/**
 * Tabs draw their underline + active label from `--sg-color-primary`.
 * Scope the token to one container to re-skin a single tab strip.
 */
export function TokensOverrideTabs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={
          {
            '--sg-color-primary': '#f59e0b',
            '--sg-color-primary-hover': '#fbbf24',
          } as React.CSSProperties
        }
      >
        <Tabs items={items} />
      </div>
      <div
        style={
          {
            '--sg-color-primary': '#8b5cf6',
            '--sg-color-primary-hover': '#a78bfa',
          } as React.CSSProperties
        }
      >
        <Tabs items={items} />
      </div>
    </div>
  )
}
