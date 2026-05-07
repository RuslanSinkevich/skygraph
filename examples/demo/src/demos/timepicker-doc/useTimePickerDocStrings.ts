import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TimePickerDocStrings } from './en'
import { timePickerDocEn } from './en'
import { timePickerDocRu } from './ru'

const timePickerDocByLocale: Record<Locale, TimePickerDocStrings> = {
  en: timePickerDocEn as TimePickerDocStrings,
  ru: timePickerDocRu,
}

/**
 * Doc strings for the TimePicker component page (`TimePickerDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTimePickerDocStrings(): TimePickerDocStrings {
  const { locale } = useI18n()
  return useMemo(() => timePickerDocByLocale[locale], [locale])
}
