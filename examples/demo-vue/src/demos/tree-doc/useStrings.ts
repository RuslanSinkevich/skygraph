import { computed } from 'vue'
import { useI18n } from '../../i18n'
import { treeDocEn } from './en'
import { treeDocRu } from './ru'
import type { TreeDocStrings } from './en'

const dict = { en: treeDocEn, ru: treeDocRu }

/**
 * Reactive Vue composable for Tree doc-page strings.
 * Mirrors React's `useTreeDocStrings()` shape so the aggregator can read
 * `t.pageTitle`, `t.demoBasicTitle`, etc.
 */
export function useTreeDocStrings() {
  const { locale } = useI18n()
  return computed<TreeDocStrings>(() => dict[locale.value] ?? dict.en)
}
