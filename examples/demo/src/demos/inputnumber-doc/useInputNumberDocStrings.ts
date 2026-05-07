import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { InputNumberDocStrings } from './en'
import { inputNumberDocEn } from './en'
import { inputNumberDocRu } from './ru'

const inputNumberDocByLocale: Record<Locale, InputNumberDocStrings> = {
  en: inputNumberDocEn as InputNumberDocStrings,
  ru: inputNumberDocRu,
}

/**
 * Doc strings for the InputNumber component page (`InputNumberDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useInputNumberDocStrings(): InputNumberDocStrings {
  const { locale } = useI18n()
  return useMemo(() => inputNumberDocByLocale[locale], [locale])
}
