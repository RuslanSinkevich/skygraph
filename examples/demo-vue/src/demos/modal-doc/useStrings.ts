import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ModalDocStrings } from './en'
import { modalDocEn } from './en'
import { modalDocRu } from './ru'

const dictByLocale: Record<Locale, ModalDocStrings> = {
  en: modalDocEn as ModalDocStrings,
  ru: modalDocRu,
}

/**
 * Doc strings for the `Modal` component page (`ModalDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useModalDocStrings(): ComputedRef<ModalDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
