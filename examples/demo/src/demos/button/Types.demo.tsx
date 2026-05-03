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
 * Five visual variants. `primary` is the CTA, `default` sits next
 * to it for secondary actions, `dashed` suggests "add", `text`
 * and `link` are for inline / toolbar actions where a bordered
 * button would feel heavy.
 */
export function TypesButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button>{t.default}</Button>
      <Button type="primary">{t.primary}</Button>
      <Button type="dashed">{t.dashed}</Button>
      <Button type="text">{t.text}</Button>
      <Button type="link">{t.link}</Button>
    </div>
  )
}
