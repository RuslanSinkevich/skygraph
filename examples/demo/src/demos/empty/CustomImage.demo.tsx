import { Empty } from '@skygraph/react'

/**
 * `image` accepts anything renderable — emoji, SVG, <img /> from a
 * CDN, or a Lottie component. Colour of the built-in illustration
 * follows `currentColor` / `--sg-color-text-disabled`.
 */
export function CustomImageEmpty() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        width: '100%',
      }}
    >
      <Empty image={<span style={{ fontSize: 48 }}>📭</span>} description="Inbox zero" />
      <Empty
        image={
          <img
            src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='28' fill='%23e0e7ff'/%3E%3Cpath d='M20 28h24M20 36h16' stroke='%234f46e5' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E"
            alt=""
            width={64}
            height={64}
          />
        }
        description="No notes yet"
      />
    </div>
  )
}
