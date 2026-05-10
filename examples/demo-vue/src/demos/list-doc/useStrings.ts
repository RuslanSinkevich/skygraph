import { computed } from 'vue'
import { useI18n } from '../../i18n'
import { listDocEn } from './en'
import { listDocRu } from './ru'
import type { ListDocStrings } from './en'

const dict = { en: listDocEn, ru: listDocRu }

/**
 * Reactive Vue composable for List doc-page strings.
 * Mirrors React's `useListDocStrings()` shape.
 */
export function useListDocStrings() {
  const { locale } = useI18n()
  return computed<ListDocStrings>(() => dict[locale.value] ?? dict.en)
}
