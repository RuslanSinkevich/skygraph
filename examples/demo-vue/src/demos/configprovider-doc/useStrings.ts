import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ConfigProviderDocStrings } from './en'
import { configProviderDocEn } from './en'
import { configProviderDocRu } from './ru'

const dictByLocale: Record<Locale, ConfigProviderDocStrings> = {
  en: configProviderDocEn as ConfigProviderDocStrings,
  ru: configProviderDocRu,
}

/**
 * Doc strings for the `ConfigProvider` component page (`ConfigProviderDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useConfigProviderDocStrings(): ComputedRef<ConfigProviderDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
