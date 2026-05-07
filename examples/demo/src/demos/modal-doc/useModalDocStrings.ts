import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ModalDocStrings } from './en'
import { modalDocEn } from './en'
import { modalDocRu } from './ru'

const modalDocByLocale: Record<Locale, ModalDocStrings> = {
  en: modalDocEn as ModalDocStrings,
  ru: modalDocRu,
}

/**
 * Doc strings for the Modal component page (`ModalDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useModalDocStrings(): ModalDocStrings {
  const { locale } = useI18n()
  return useMemo(() => modalDocByLocale[locale], [locale])
}
