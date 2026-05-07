import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { PopconfirmDocStrings } from './en'
import { popconfirmDocEn } from './en'
import { popconfirmDocRu } from './ru'

const popconfirmDocByLocale: Record<Locale, PopconfirmDocStrings> = {
  en: popconfirmDocEn as PopconfirmDocStrings,
  ru: popconfirmDocRu,
}

/**
 * Doc strings for the Popconfirm component page (`PopconfirmDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function usePopconfirmDocStrings(): PopconfirmDocStrings {
  const { locale } = useI18n()
  return useMemo(() => popconfirmDocByLocale[locale], [locale])
}
