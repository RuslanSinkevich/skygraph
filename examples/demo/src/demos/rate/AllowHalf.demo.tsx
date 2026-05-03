import { useState } from 'react'
import { Rate } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    valuePrefix: 'value:',
  },
  ru: {
    valuePrefix: 'значение:',
  },
} as const

/**
 * `allowHalf` lets users pick 0.5-step ratings. The half is detected
 * by pointer position on the star — clicking the left side commits
 * `N − 0.5`, the right side commits `N`.
 */
export function AllowHalfRate() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState(2.5)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Rate allowHalf value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {t.valuePrefix} {value}
      </span>
    </div>
  )
}
