import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TooltipDocStrings } from './en'
import { tooltipDocEn } from './en'
import { tooltipDocRu } from './ru'

const tooltipDocByLocale: Record<Locale, TooltipDocStrings> = {
  en: tooltipDocEn as TooltipDocStrings,
  ru: tooltipDocRu,
}

/**
 * Doc strings for the Tooltip component page (`TooltipDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTooltipDocStrings(): TooltipDocStrings {
  const { locale } = useI18n()
  return useMemo(() => tooltipDocByLocale[locale], [locale])
}
