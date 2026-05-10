import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SpinDocStrings } from './en'
import { spinDocEn } from './en'
import { spinDocRu } from './ru'

const dictByLocale: Record<Locale, SpinDocStrings> = {
  en: spinDocEn as SpinDocStrings,
  ru: spinDocRu,
}

/**
 * Doc strings for the Spin component page (`SpinDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useSpinDocStrings(): ComputedRef<SpinDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
