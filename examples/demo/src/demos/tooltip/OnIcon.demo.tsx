import { Tooltip } from '@skygraph/react'

/**
 * Classic "info icon" pattern: a small glyph with a Tooltip for the
 * extra context. Give the icon `tabIndex={0}` so keyboard users can
 * focus it and read the tip too.
 */
export function OnIconTooltip() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label style={{ fontWeight: 500 }}>Brand score</label>
      <Tooltip title="Weighted average of NPS, reviews, and social sentiment (0–100).">
        <span
          tabIndex={0}
          aria-label="More info about brand score"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--sg-color-bg-container-disabled, #e5e7eb)',
            color: 'var(--sg-color-text-secondary, #4b5563)',
            fontSize: 12,
            cursor: 'help',
            userSelect: 'none',
          }}
        >
          ?
        </span>
      </Tooltip>
    </div>
  )
}
