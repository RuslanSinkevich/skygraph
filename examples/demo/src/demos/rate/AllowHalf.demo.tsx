import { useState } from 'react'
import { Rate } from '@skygraph/react'

/**
 * `allowHalf` lets users pick 0.5-step ratings. The half is detected
 * by pointer position on the star — clicking the left side commits
 * `N − 0.5`, the right side commits `N`.
 */
export function AllowHalfRate() {
  const [value, setValue] = useState(2.5)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Rate allowHalf value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        value: {value}
      </span>
    </div>
  )
}
