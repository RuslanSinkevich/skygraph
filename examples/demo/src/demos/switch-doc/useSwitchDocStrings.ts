import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SwitchDocStrings } from './en'
import { switchDocEn } from './en'
import { switchDocRu } from './ru'

const switchDocByLocale: Record<Locale, SwitchDocStrings> = {
  en: switchDocEn as SwitchDocStrings,
  ru: switchDocRu,
}

/**
 * Doc strings for the Switch component page (`SwitchDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSwitchDocStrings(): SwitchDocStrings {
  const { locale } = useI18n()
  return useMemo(() => switchDocByLocale[locale], [locale])
}
