import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { BadgeDocStrings } from './en'
import { badgeDocEn } from './en'
import { badgeDocRu } from './ru'

const badgeDocByLocale: Record<Locale, BadgeDocStrings> = {
  en: badgeDocEn as BadgeDocStrings,
  ru: badgeDocRu,
}

/**
 * Doc strings for the Badge component page (`BadgeDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useBadgeDocStrings(): BadgeDocStrings {
  const { locale } = useI18n()
  return useMemo(() => badgeDocByLocale[locale], [locale])
}
