import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { FormDocStrings } from './en'
import { formDocEn } from './en'
import { formDocRu } from './ru'

const formDocByLocale: Record<Locale, FormDocStrings> = {
  en: formDocEn as FormDocStrings,
  ru: formDocRu,
}

/**
 * Doc strings for the Form component page (`FormDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useFormDocStrings(): FormDocStrings {
  const { locale } = useI18n()
  return useMemo(() => formDocByLocale[locale], [locale])
}
