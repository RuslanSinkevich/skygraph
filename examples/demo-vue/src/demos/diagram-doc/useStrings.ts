import { computed } from 'vue'
import { useI18n } from '../../i18n'
import { diagramDocEn } from './en'
import { diagramDocRu } from './ru'
import type { DiagramDocStrings } from './en'

const dict = { en: diagramDocEn, ru: diagramDocRu }

/**
 * Reactive Vue composable for Diagram doc-page strings.
 * Mirrors React's `useDiagramDocStrings()` shape so the aggregator can
 * read `t.pageTitle`, `t.demoBasicTitle`, etc.
 */
export function useDiagramDocStrings() {
  const { locale } = useI18n()
  return computed<DiagramDocStrings>(() => dict[locale.value] ?? dict.en)
}
