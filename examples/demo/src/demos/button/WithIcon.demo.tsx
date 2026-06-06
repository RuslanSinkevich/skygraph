import type { ReactNode } from 'react'
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

/** Inline stroke icons keep crisp at any size and inherit `currentColor`. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  )
}

/**
 * Pass an icon node (here an inline SVG) as the first child. The button
 * lays children out with flex + `gap: --sg-padding-xs`, so the icon and
 * label stay aligned across all three sizes. The last example is
 * icon-only — give it an `aria-label` so it stays accessible.
 */
export function WithIconButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button type="primary">
        <Icon>
          <path d="M12 5v14M5 12h14" />
        </Icon>
        {t.newProject}
      </Button>
      <Button>
        <Icon>
          <path d="M21 12a9 9 0 1 1-2.64-6.36" />
          <path d="M21 4v5h-5" />
        </Icon>
        {t.refresh}
      </Button>
      <Button type="text">
        <Icon>
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
        </Icon>
        {t.remove}
      </Button>
      <Button aria-label={t.search} size="small">
        <Icon>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </Icon>
      </Button>
    </div>
  )
}
