import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    newProject: 'New project',
    refresh: 'Refresh',
    remove: 'Remove',
    search: 'Search',
  },
  ru: {
    newProject: 'Новый проект',
    refresh: 'Обновить',
    remove: 'Удалить',
    search: 'Поиск',
  },
} as const

/**
 * Put any icon node as the first child. The button uses flex with
 * `gap: --sg-padding-xs` so icon and label stay aligned across
 * all three sizes.
 */
export function WithIconButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button type="primary">
        <span aria-hidden>＋</span>
        {t.newProject}
      </Button>
      <Button>
        <span aria-hidden>⟳</span>
        {t.refresh}
      </Button>
      <Button type="text">
        <span aria-hidden>⌫</span>
        {t.remove}
      </Button>
      <Button aria-label={t.search} size="small">
        <span aria-hidden>🔍</span>
      </Button>
    </div>
  )
}
