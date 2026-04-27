import { DatePicker } from '@skygraph/react'

/**
 * DatePicker picks up `--sg-color-primary` for selected days, the Input
 * tokens for the control shell, and `--sg-shadow-lg` for the dropdown.
 */
export function TokensOverrideDatePicker() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div
        style={
          {
            '--sg-color-primary': '#ef4444',
            '--sg-color-primary-bg': '#fee2e2',
            '--sg-color-primary-hover': '#dc2626',
          } as React.CSSProperties
        }
      >
        <DatePicker placeholder="Red accent" allowClear />
      </div>
      <div
        style={
          {
            '--sg-border-radius': '999px',
          } as React.CSSProperties
        }
      >
        <DatePicker placeholder="Pill control" allowClear />
      </div>
      <div
        style={
          {
            '--sg-color-bg-elevated': '#1f2937',
            '--sg-color-text': '#e5e7eb',
            '--sg-color-text-tertiary': '#9ca3af',
          } as React.CSSProperties
        }
      >
        <DatePicker placeholder="Dark dropdown" allowClear />
      </div>
    </div>
  )
}
