import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DiagramDocStrings } from './en'
import { diagramDocEn } from './en'
import { diagramDocRu } from './ru'

const diagramDocByLocale: Record<Locale, DiagramDocStrings> = {
  en: diagramDocEn as DiagramDocStrings,
  ru: diagramDocRu,
}

/**
 * Doc strings for the Diagram component page (`DiagramDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useDiagramDocStrings(): DiagramDocStrings {
  const { locale } = useI18n()
  return useMemo(() => diagramDocByLocale[locale], [locale])
}
