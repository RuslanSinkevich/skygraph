import { computed } from 'vue'
import { useI18n } from '../../i18n'
import { chartsDocEn } from './en'
import { chartsDocRu } from './ru'
import type { ChartsDocStrings } from './en'

const dict = { en: chartsDocEn, ru: chartsDocRu }

/**
 * Reactive Vue composable for Charts doc-page strings.
 * Mirrors React's `useChartsDocStrings()` shape.
 */
export function useChartsDocStrings() {
  const { locale } = useI18n()
  return computed<ChartsDocStrings>(() => dict[locale.value] ?? dict.en)
}
