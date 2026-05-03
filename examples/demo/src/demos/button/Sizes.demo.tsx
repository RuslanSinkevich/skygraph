import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    smallPrimary: 'Small primary',
    middle: 'Middle',
    middlePrimary: 'Middle primary',
    large: 'Large',
    largePrimary: 'Large primary',
  },
  ru: {
    small: 'Маленькая',
    smallPrimary: 'Маленькая основная',
    middle: 'Средняя',
    middlePrimary: 'Средняя основная',
    large: 'Большая',
    largePrimary: 'Большая основная',
  },
} as const

/**
 * Three sizes scale height, padding and font size in one step.
 * Prefer `ConfigProvider` to broadcast the same size to a subtree
 * instead of threading `size` through every form control.
 */
export function SizesButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size="small">{t.small}</Button>
      <Button type="primary" size="small">{t.smallPrimary}</Button>
      <Button>{t.middle}</Button>
      <Button type="primary">{t.middlePrimary}</Button>
      <Button size="large">{t.large}</Button>
      <Button type="primary" size="large">{t.largePrimary}</Button>
    </div>
  )
}
