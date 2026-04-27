import { Select } from '@skygraph/react'
import { fruitOptions } from './data'

/**
 * Select shares CSS variables with Input (height / radius / border). Wrap
 * one instance in a scoped style object and only that select changes.
 */
export function TokensOverrideSelect() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <div
        style={
          {
            '--sg-input-height': '44px',
            '--sg-input-radius': '14px',
          } as React.CSSProperties
        }
      >
        <Select placeholder="Tall & rounded" options={fruitOptions} />
      </div>

      <div
        style={
          {
            '--sg-color-primary': '#059669',
            '--sg-color-primary-bg': '#d1fae5',
            '--sg-color-primary-hover': '#047857',
          } as React.CSSProperties
        }
      >
        <Select placeholder="Branded green" options={fruitOptions} />
      </div>

      <div
        style={
          {
            '--sg-input-bg': '#0f172a',
            '--sg-input-color': '#e2e8f0',
            '--sg-input-border': '#1e293b',
            '--sg-color-text-placeholder': '#64748b',
          } as React.CSSProperties
        }
      >
        <Select placeholder="Dark input" options={fruitOptions} />
      </div>
    </div>
  )
}
