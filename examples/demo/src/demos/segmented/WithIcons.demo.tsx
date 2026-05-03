import { useMemo } from 'react'
import { Segmented } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    list: 'List',
    kanban: 'Kanban',
    calendar: 'Calendar',
    ariaGrid: 'Grid',
    ariaList: 'List',
    ariaCard: 'Card',
  },
  ru: {
    list: 'Список',
    kanban: 'Канбан',
    calendar: 'Календарь',
    ariaGrid: 'Сетка',
    ariaList: 'Список',
    ariaCard: 'Карточки',
  },
} as const

/**
 * Pass objects with `icon` + `label` to mix graphics with text.
 * Leaving `label` out renders icon-only segments — handy for
 * view-switchers (grid / list) when space is tight.
 */
export function WithIconsSegmented() {
  const t = useDemoStrings(STRINGS)
  const row1 = useMemo(
    () => [
      { label: t.list, value: 'List', icon: <span aria-hidden>☰</span> },
      { label: t.kanban, value: 'Kanban', icon: <span aria-hidden>▤</span> },
      { label: t.calendar, value: 'Calendar', icon: <span aria-hidden>🗓</span> },
    ],
    [t],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented
        defaultValue="List"
        options={row1}
      />
      <Segmented
        defaultValue="grid"
        options={[
          { label: <span aria-label={t.ariaGrid} role="img">▦</span>, value: 'grid' },
          { label: <span aria-label={t.ariaList} role="img">☰</span>, value: 'list' },
          { label: <span aria-label={t.ariaCard} role="img">▢</span>, value: 'card' },
        ]}
      />
    </div>
  )
}
