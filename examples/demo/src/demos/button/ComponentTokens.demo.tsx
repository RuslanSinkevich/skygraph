import type { CSSProperties } from 'react'
import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    pillPrimary: 'Pill primary',
    pillDefault: 'Pill default',
    pillDashed: 'Pill dashed',
  },
  ru: {
    pillPrimary: 'Pill основная',
    pillDefault: 'Pill обычная',
    pillDashed: 'Pill пунктирная',
  },
} as const

/**
 * Button exposes a full set of component-local tokens (`--sg-btn-
 * height / radius / padding / font-size / bg / color / border`).
 * Scope them on a wrapper to reshape without losing semantic
 * behaviour like hover / focus / disabled.
 */
const pillScope: CSSProperties = {
  ['--sg-btn-height' as never]: '42px',
  ['--sg-btn-radius' as never]: '999px',
  ['--sg-btn-font-size' as never]: '14px',
  ['--sg-btn-padding' as never]: '0 22px',
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
}

export function ComponentTokensButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={pillScope}>
      <Button type="primary">{t.pillPrimary}</Button>
      <Button>{t.pillDefault}</Button>
      <Button type="dashed">{t.pillDashed}</Button>
    </div>
  )
}
