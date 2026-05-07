import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { FormComponentsDocStrings } from './en'
import { formComponentsDocEn } from './en'
import { formComponentsDocRu } from './ru'

const formComponentsDocByLocale: Record<Locale, FormComponentsDocStrings> = {
  en: formComponentsDocEn as FormComponentsDocStrings,
  ru: formComponentsDocRu,
}

/**
 * Doc strings for the FormComponents page (`FormComponentsDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useFormComponentsDocStrings(): FormComponentsDocStrings {
  const { locale } = useI18n()
  return useMemo(() => formComponentsDocByLocale[locale], [locale])
}
