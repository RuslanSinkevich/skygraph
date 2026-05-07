import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CascaderDocStrings } from './en'
import { cascaderDocEn } from './en'
import { cascaderDocRu } from './ru'

const cascaderDocByLocale: Record<Locale, CascaderDocStrings> = {
  en: cascaderDocEn as CascaderDocStrings,
  ru: cascaderDocRu,
}

/**
 * Doc strings for the Cascader component page (`CascaderDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useCascaderDocStrings(): CascaderDocStrings {
  const { locale } = useI18n()
  return useMemo(() => cascaderDocByLocale[locale], [locale])
}
