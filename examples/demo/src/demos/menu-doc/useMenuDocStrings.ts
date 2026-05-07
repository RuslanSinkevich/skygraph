import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { MenuDocStrings } from './en'
import { menuDocEn } from './en'
import { menuDocRu } from './ru'

const menuDocByLocale: Record<Locale, MenuDocStrings> = {
  en: menuDocEn as MenuDocStrings,
  ru: menuDocRu,
}

/**
 * Doc strings for the Menu component page (`MenuDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useMenuDocStrings(): MenuDocStrings {
  const { locale } = useI18n()
  return useMemo(() => menuDocByLocale[locale], [locale])
}
