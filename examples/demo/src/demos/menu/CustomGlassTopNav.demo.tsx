import { useState } from 'react'
import { Menu } from '@skygraph/react'
import type { MenuItem } from '@skygraph/react'

/**
 * Custom #2 — Glass-morphism horizontal nav.
 *
 * A header bar that floats over a colourful hero. The wrapper supplies a
 * frosted background + soft shadow; the Menu itself stays default — we
 * just tune a couple of tokens so selected and hovered states blend with
 * the glass surface.
 */
const items: MenuItem[] = [
  { key: 'product', label: 'Product' },
  {
    key: 'solutions',
    label: 'Solutions',
    children: [
      { key: 'sol-startups', label: 'For startups' },
      { key: 'sol-enterprise', label: 'For enterprise' },
      { key: 'sol-agencies', label: 'For agencies' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      { key: 'res-docs', label: 'Documentation' },
      { key: 'res-changelog', label: 'Changelog' },
      { key: 'res-community', label: 'Community' },
    ],
  },
  { key: 'pricing', label: 'Pricing' },
  { key: 'company', label: 'Company' },
]

export function CustomGlassTopNavMenu() {
  const [selected, setSelected] = useState<string[]>(['product'])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 220,
        padding: 28,
        borderRadius: 20,
        background:
          'radial-gradient(120% 90% at 0% 0%, #c7d2fe 0%, transparent 55%), radial-gradient(120% 90% at 100% 30%, #fbcfe8 0%, transparent 55%), linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      <div
        style={
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            padding: '8px 14px',
            borderRadius: 14,
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 14px 30px rgba(15, 23, 42, 0.16)',
            ['--sg-color-bg-hover' as never]: 'rgba(255, 255, 255, 0.55)',
            ['--sg-color-primary-bg' as never]: 'rgba(255, 255, 255, 0.7)',
            ['--sg-color-primary' as never]: '#312e81',
            ['--sg-color-primary-hover' as never]: '#4f46e5',
            ['--sg-color-text' as never]: '#1e1b4b',
            ['--sg-color-bg-container' as never]: 'transparent',
          } as React.CSSProperties
        }
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 6,
            color: '#1e1b4b',
          }}
        >
          <span
            aria-hidden
            style={{
              width: 22,
              height: 22,
              borderRadius: 7,
              background: 'linear-gradient(135deg,#6366f1,#ec4899)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5)',
            }}
          />
          <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>Nimbus</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={selected}
            onSelect={(info) => setSelected(info.selectedKeys)}
          />
        </div>
        <button
          type="button"
          style={{
            padding: '8px 18px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.6)',
            background: 'linear-gradient(135deg,#4338ca,#db2777)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 6px 14px rgba(67, 56, 202, 0.35)',
          }}
        >
          Try free
        </button>
      </div>
      <p
        style={{
          marginTop: 28,
          marginBottom: 6,
          fontSize: 22,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.2,
          maxWidth: 480,
          textShadow: '0 1px 12px rgba(15,23,42,0.25)',
        }}
      >
        Ship interfaces that feel like the future.
      </p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', maxWidth: 520 }}>
        Glass-morphism navigation built on the default{' '}
        <code>&lt;Menu mode=&quot;horizontal&quot;&gt;</code> — only tokens are re-scoped on the
        wrapper.
      </p>
    </div>
  )
}
