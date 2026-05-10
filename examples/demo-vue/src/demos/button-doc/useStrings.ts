import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ButtonDocStrings } from './en'
import { buttonDocEn } from './en'
import { buttonDocRu } from './ru'

const buttonDocByLocale: Record<Locale, ButtonDocStrings> = {
  en: buttonDocEn as ButtonDocStrings,
  ru: buttonDocRu,
}

/**
 * Doc strings for the Button component page (`ButtonDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 *
 * Returns a `ComputedRef` so the doc page reactively follows the locale
 * switcher without needing to re-mount.
 */
export function useButtonDocStrings(): ComputedRef<ButtonDocStrings> {
  const { locale } = useI18n()
  return computed(() => buttonDocByLocale[locale.value])
}
