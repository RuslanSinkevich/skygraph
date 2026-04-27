import { notification, Button } from '@skygraph/react'

export function TokensOverrideNotification() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        Toasts read global tokens at mount time. Override them on <code>:root</code> or a
        high-level wrapper that also contains <code>&lt;NotificationContainer/&gt;</code>.
        The Theming page has live toggles — use the buttons below to preview the current
        cascade.
      </p>
      <pre
        style={{
          margin: 0,
          padding: 12,
          background: 'var(--sg-color-bg-secondary)',
          borderRadius: 'var(--sg-border-radius)',
          fontSize: 12,
          overflow: 'auto',
        }}
      >
{`:root {
  --sg-color-success: #16a34a;
  --sg-color-success-bg: rgba(22, 163, 74, 0.12);
  --sg-color-bg-elevated: #ffffff;
  --sg-shadow-lg: 0 8px 24px rgba(15, 23, 42, 0.12);
  --sg-z-notification: 1010;
}`}
      </pre>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => notification.success('Cascade check', 'Success tint reflects the current theme.')}>
          Fire success
        </Button>
        <Button onClick={() => notification.error('Cascade check', 'Error tint reflects the current theme.')}>
          Fire error
        </Button>
      </div>
    </div>
  )
}
