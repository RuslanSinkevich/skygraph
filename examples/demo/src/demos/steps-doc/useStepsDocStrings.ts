import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { StepsDocStrings } from './en'
import { stepsDocEn } from './en'
import { stepsDocRu } from './ru'

const stepsDocByLocale: Record<Locale, StepsDocStrings> = {
  en: stepsDocEn as StepsDocStrings,
  ru: stepsDocRu,
}

/**
 * Doc strings for the Steps component page (`StepsDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useStepsDocStrings(): StepsDocStrings {
  const { locale } = useI18n()
  return useMemo(() => stepsDocByLocale[locale], [locale])
}
