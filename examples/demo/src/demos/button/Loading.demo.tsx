import { useState } from 'react'
import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLoading: 'Default loading',
    primaryLoading: 'Primary loading',
    dashedLoading: 'Dashed loading',
    saving: 'Saving…',
    clickMe: 'Click me',
  },
  ru: {
    defaultLoading: 'Загрузка',
    primaryLoading: 'Основная загрузка',
    dashedLoading: 'Пунктирная загрузка',
    saving: 'Сохранение…',
    clickMe: 'Нажмите',
  },
} as const

/**
 * `loading` swaps in a Spin and sets `aria-busy`, `disabled` and
 * pointer-events so a second click is impossible while work is
 * in flight. The controlled variant below shows the typical
 * submit → done pattern.
 */
export function LoadingButton() {
  const t = useDemoStrings(STRINGS)
  const [saving, setSaving] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button loading>{t.defaultLoading}</Button>
      <Button type="primary" loading>{t.primaryLoading}</Button>
      <Button type="dashed" loading>{t.dashedLoading}</Button>
      <Button
        type="primary"
        loading={saving}
        onClick={() => {
          setSaving(true)
          setTimeout(() => setSaving(false), 1500)
        }}
      >
        {saving ? t.saving : t.clickMe}
      </Button>
    </div>
  )
}
