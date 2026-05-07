import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DropdownDocStrings } from './en'
import { dropdownDocEn } from './en'
import { dropdownDocRu } from './ru'

const dropdownDocByLocale: Record<Locale, DropdownDocStrings> = {
  en: dropdownDocEn as DropdownDocStrings,
  ru: dropdownDocRu,
}

/**
 * Doc strings for the Dropdown component page (`DropdownDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useDropdownDocStrings(): DropdownDocStrings {
  const { locale } = useI18n()
  return useMemo(() => dropdownDocByLocale[locale], [locale])
}
