import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DropdownDocStrings } from './en'
import { dropdownDocEn } from './en'
import { dropdownDocRu } from './ru'

const dictByLocale: Record<Locale, DropdownDocStrings> = {
  en: dropdownDocEn as DropdownDocStrings,
  ru: dropdownDocRu,
}

/**
 * Doc strings for the `Dropdown` component page (`DropdownDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useDropdownDocStrings(): ComputedRef<DropdownDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
