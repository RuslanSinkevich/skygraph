import { List } from '@skygraph/react'
import { cards } from './data'

/**
 * `grid` switches the items container to CSS Grid. Pass
 * `column` for the base count and `xs / sm / md / lg` for
 * breakpoint-based overrides. Gutter controls the gap in
 * pixels.
 */
export function GridList() {
  return (
    <List
      grid={{ gutter: 16, column: 3, sm: 2, xs: 1 }}
      dataSource={cards}
      renderItem={(card) => (
        <div
          style={{
            padding: 16,
            border: '1px solid var(--sg-color-border-secondary)',
            borderRadius: 8,
            textAlign: 'center',
            background: 'var(--sg-color-bg)',
          }}
        >
          {card}
        </div>
      )}
    />
  )
}
