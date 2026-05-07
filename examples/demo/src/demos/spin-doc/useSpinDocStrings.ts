import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SpinDocStrings } from './en'
import { spinDocEn } from './en'
import { spinDocRu } from './ru'

const spinDocByLocale: Record<Locale, SpinDocStrings> = {
  en: spinDocEn as SpinDocStrings,
  ru: spinDocRu,
}

/**
 * Doc strings for the Spin component page (`SpinDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSpinDocStrings(): SpinDocStrings {
  const { locale } = useI18n()
  return useMemo(() => spinDocByLocale[locale], [locale])
}
