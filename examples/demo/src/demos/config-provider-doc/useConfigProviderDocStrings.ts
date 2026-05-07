import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ConfigProviderDocStrings } from './en'
import { configProviderDocEn } from './en'
import { configProviderDocRu } from './ru'

const configProviderDocByLocale: Record<Locale, ConfigProviderDocStrings> = {
  en: configProviderDocEn as ConfigProviderDocStrings,
  ru: configProviderDocRu,
}

/**
 * Doc strings for the ConfigProvider component page (`ConfigProviderDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useConfigProviderDocStrings(): ConfigProviderDocStrings {
  const { locale } = useI18n()
  return useMemo(() => configProviderDocByLocale[locale], [locale])
}
