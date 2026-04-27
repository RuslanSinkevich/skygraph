import { Tooltip, Button } from '@skygraph/react'

/**
 * `title` is a full ReactNode — drop a heading + description + link
 * combo. The content box uses `white-space: nowrap`, so wrap wide
 * content in a sized `<div>` as below.
 */
export function RichContentTooltip() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip
        title={
          <div style={{ maxWidth: 220, whiteSpace: 'normal', lineHeight: 1.45 }}>
            <strong style={{ display: 'block', marginBottom: 4 }}>Commit</strong>
            <span style={{ fontSize: 12, opacity: 0.85 }}>
              Saves the current state to the history — press ⌘⏎ to commit quickly.
            </span>
          </div>
        }
      >
        <Button>Hover for details</Button>
      </Tooltip>
      <Tooltip
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden="true">⚡</span>
            Network: online
          </div>
        }
      >
        <Button>Icon + text</Button>
      </Tooltip>
    </div>
  )
}
