import type { CSSProperties } from 'react'
import { Rate } from '@skygraph/react'

/**
 * Rate owns **one** dedicated token: `--sg-color-star` for the filled
 * colour. The empty colour comes from the global `--sg-color-border`;
 * the symbol size from `--sg-font-size-xl`.
 */
const gold: CSSProperties = {
  ['--sg-color-star' as never]: '#fbbf24',
}

const rose: CSSProperties = {
  ['--sg-color-star' as never]: '#e11d48',
  ['--sg-color-border' as never]: '#fecdd3',
  ['--sg-font-size-xl' as never]: '28px',
}

export function TokensOverrideRate() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={gold}>
        <Rate defaultValue={4} />
      </div>
      <div style={rose}>
        <Rate defaultValue={3.5} allowHalf character="♥" />
      </div>
    </div>
  )
}
