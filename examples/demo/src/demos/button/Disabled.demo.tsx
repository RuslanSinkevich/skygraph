import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'Default',
    primary: 'Primary',
    dashed: 'Dashed',
    text: 'Text',
    link: 'Link',
  },
  ru: {
    default: 'Обычная',
    primary: 'Основная',
    dashed: 'Пунктирная',
    text: 'Текстовая',
    link: 'Ссылка',
  },
} as const

/**
 * `disabled` dims the button, sets `aria-disabled` and blocks
 * both click and keyboard activation. Each type has its own
 * disabled look — `text` / `link` keep their minimal chrome.
 */
export function DisabledButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button disabled>{t.default}</Button>
      <Button type="primary" disabled>{t.primary}</Button>
      <Button type="dashed" disabled>{t.dashed}</Button>
      <Button type="text" disabled>{t.text}</Button>
      <Button type="link" disabled>{t.link}</Button>
    </div>
  )
}
