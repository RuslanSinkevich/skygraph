import { useMemo, useState } from 'react'
import {
  globalTokens,
  componentTokenGroups,
  categoryLabels,
  categoryOrder,
} from '../tokens/tokens-data'
import type { TokenCategory, TokenDef } from '../tokens/tokens-data'
import { useI18n } from '../i18n'

/**
 * Design Tokens page — a searchable index of every public `--sg-*`
 * variable SkyGraph exposes. Tokens are the theming contract; overriding
 * one on `:root`, a wrapper, or a single component scope reskins the UI.
 */

function isColorValue(value: string): boolean {
  return (
    /^#[0-9a-f]{3,8}$/i.test(value) ||
    value.startsWith('rgb') ||
    value.startsWith('hsl')
  )
}

function ValueSwatch({ value }: { value: string }) {
  const [resolved, setResolved] = useState<string | null>(null)
  const ref = (el: HTMLSpanElement | null) => {
    if (!el) return
    if (isColorValue(value)) {
      setResolved(value)
      return
    }
    if (value.startsWith('var(')) {
      const color = getComputedStyle(el).backgroundColor
      if (color && color !== 'rgba(0, 0, 0, 0)') {
        setResolved(color)
      }
    }
  }

  return (
    <span
      ref={ref}
      aria-hidden
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        borderRadius: 3,
        border: '1px solid var(--sg-color-border-secondary)',
        marginRight: 8,
        verticalAlign: 'middle',
        background: value.startsWith('var(') ? value : value,
        boxShadow: resolved ? 'inset 0 0 0 1px rgba(0,0,0,0.04)' : undefined,
      }}
    />
  )
}

function TokenRow({ token }: { token: TokenDef }) {
  const showSwatch =
    token.category === 'palette' ||
    token.category === 'color' ||
    token.category === 'background' ||
    token.category === 'text' ||
    token.category === 'border'

  return (
    <tr>
      <td>
        <code>--{token.name}</code>
      </td>
      <td>
        {showSwatch && <ValueSwatch value={token.default} />}
        <code>{token.default}</code>
      </td>
      <td>{token.description}</td>
    </tr>
  )
}

function GlobalSection({
  category,
  tokens,
}: {
  category: TokenCategory
  tokens: TokenDef[]
}) {
  if (tokens.length === 0) return null
  return (
    <div className="demo-props-section">
      <h3 className="demo-props-title">{categoryLabels[category]}</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Variable</th>
            <th style={{ width: '32%' }}>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <TokenRow key={t.name} token={t} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DesignTokensPage() {
  const { t } = useI18n()
  const dt = t.designTokens
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return {
        global: globalTokens,
        components: componentTokenGroups,
      }
    }
    const matches = (text: string) => text.toLowerCase().includes(q)
    return {
      global: globalTokens.filter(
        (t) =>
          matches(t.name) || matches(t.description) || matches(t.default),
      ),
      components: componentTokenGroups
        .map((g) => ({
          ...g,
          vars: g.vars.filter(
            (v) =>
              matches(v.name) ||
              matches(v.description) ||
              matches(v.default) ||
              matches(g.component),
          ),
        }))
        .filter((g) => g.vars.length > 0),
    }
  }, [query])

  const groupedGlobal = useMemo(() => {
    const map = new Map<TokenCategory, TokenDef[]>()
    for (const t of filtered.global) {
      const list = map.get(t.category) ?? []
      list.push(t)
      map.set(t.category, list)
    }
    return map
  }, [filtered.global])

  return (
    <section className="doc-page">
      <header className="doc-header">
        <h1 className="doc-component-title">{dt.title}</h1>
        <p className="doc-lead">{dt.lead}</p>
      </header>

      <div
        className="demo-props-section"
        style={{
          marginBottom: 20,
        }}
      >
        <input
          type="search"
          placeholder={dt.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={dt.searchAriaLabel}
          style={{
            width: '100%',
            maxWidth: 520,
            height: 38,
            padding: '0 14px',
            fontSize: 14,
            background: 'var(--sg-color-bg-container)',
            color: 'var(--sg-color-text)',
            border: '1px solid var(--sg-color-border)',
            borderRadius: 'var(--sg-border-radius)',
          }}
        />
        <div
          style={{
            marginTop: 12,
            fontSize: 13,
            color: 'var(--sg-color-text-secondary)',
          }}
        >
          {filtered.global.length} {dt.summaryGlobal} ·{' '}
          {filtered.components.reduce((acc, g) => acc + g.vars.length, 0)}{' '}
          {dt.summaryComponentsLeft} {filtered.components.length} {dt.summaryComponentsRight}
        </div>
      </div>

      <h2>{dt.globalHeading}</h2>
      <p
        style={{
          marginTop: -8,
          fontSize: 14,
          color: 'var(--sg-color-text-secondary)',
        }}
      >
        {dt.globalLead}
      </p>
      {categoryOrder.map((c) => (
        <GlobalSection
          key={c}
          category={c}
          tokens={groupedGlobal.get(c) ?? []}
        />
      ))}

      <h2>{dt.perComponentHeading}</h2>
      <p
        style={{
          marginTop: -8,
          fontSize: 14,
          color: 'var(--sg-color-text-secondary)',
        }}
      >
        {dt.perComponentLead}
      </p>
      {filtered.components.map((g) => (
        <div
          key={g.slug}
          className="demo-props-section"
          id={`token-${g.slug}`}
        >
          <h3 className="demo-props-title">{g.component}</h3>
          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Variable</th>
                <th style={{ width: '32%' }}>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {g.vars.map((v) => (
                <tr key={v.name}>
                  <td>
                    <code>--{v.name}</code>
                  </td>
                  <td>
                    <code>{v.default}</code>
                  </td>
                  <td>{v.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2>{dt.overrideHeading}</h2>
      <div className="demo-props-section">
        <p
          style={{
            fontSize: 14,
            color: 'var(--sg-color-text-secondary)',
            marginTop: 0,
          }}
        >
          {dt.overrideAppWide}
        </p>
        <pre className="doc-code">
          <code>{`:root {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #8b5cf6;
  --sg-color-primary-active: #6d28d9;
  --sg-border-radius: 10px;
}`}</code>
        </pre>
        <p
          style={{
            fontSize: 14,
            color: 'var(--sg-color-text-secondary)',
            marginTop: 20,
          }}
        >
          {dt.overrideSubtree}
        </p>
        <pre className="doc-code">
          <code>{`<div style={{
  '--sg-table-header-bg': '#f0f5ff',
  '--sg-table-row-hover-bg': '#e6f4ff',
} as React.CSSProperties}>
  <Table ... />
</div>`}</code>
        </pre>
      </div>
    </section>
  )
}
