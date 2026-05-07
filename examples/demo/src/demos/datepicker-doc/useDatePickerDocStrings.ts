import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DatePickerDocStrings } from './en'
import { datePickerDocEn } from './en'
import { datePickerDocRu } from './ru'

const datePickerDocByLocale: Record<Locale, DatePickerDocStrings> = {
  en: datePickerDocEn as DatePickerDocStrings,
  ru: datePickerDocRu,
}

/**
 * Doc strings for the DatePicker component page (`DatePickerDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useDatePickerDocStrings(): DatePickerDocStrings {
  const { locale } = useI18n()
  return useMemo(() => datePickerDocByLocale[locale], [locale])
}
