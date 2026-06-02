import { Skeleton } from '@skygraph/react'

/**
 * Control the paragraph block with `{ rows, width }`. Match the
 * expected content shape — too few lines feel off when the real
 * paragraph is a wall of text, too many look spammy.
 *
 * Each block below is wrapped in a labelled card so the row count
 * and width pattern are obvious at a glance.
 */
const cardStyle: React.CSSProperties = {
  padding: '14px 16px',
  border: '1px solid var(--sg-color-border-secondary)',
  borderRadius: 12,
  background: 'var(--sg-color-bg-container)',
}

const labelStyle: React.CSSProperties = {
  display: 'inline-block',
  marginBottom: 12,
  padding: '2px 8px',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--sg-color-primary)',
  background: 'var(--sg-color-primary-bg)',
  borderRadius: 6,
}

export function RowsSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={cardStyle}>
        <span style={labelStyle}>2 rows · default widths</span>
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
      <div style={cardStyle}>
        <span style={labelStyle}>5 rows · default widths</span>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
      <div style={cardStyle}>
        <span style={labelStyle}>4 rows · custom widths [100%, 90%, 80%, 40%]</span>
        <Skeleton active paragraph={{ rows: 4, width: ['100%', '90%', '80%', '40%'] }} />
      </div>
    </div>
  )
}
