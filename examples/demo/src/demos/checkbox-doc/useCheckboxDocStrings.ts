import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CheckboxDocStrings } from './en'
import { checkboxDocEn } from './en'
import { checkboxDocRu } from './ru'

const checkboxDocByLocale: Record<Locale, CheckboxDocStrings> = {
  en: checkboxDocEn as CheckboxDocStrings,
  ru: checkboxDocRu,
}

/**
 * Doc strings for the Checkbox component page (`CheckboxDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useCheckboxDocStrings(): CheckboxDocStrings {
  const { locale } = useI18n()
  return useMemo(() => checkboxDocByLocale[locale], [locale])
}
