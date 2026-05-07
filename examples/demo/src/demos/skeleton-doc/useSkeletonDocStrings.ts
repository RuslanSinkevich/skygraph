import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SkeletonDocStrings } from './en'
import { skeletonDocEn } from './en'
import { skeletonDocRu } from './ru'

const skeletonDocByLocale: Record<Locale, SkeletonDocStrings> = {
  en: skeletonDocEn as SkeletonDocStrings,
  ru: skeletonDocRu,
}

/**
 * Doc strings for the Skeleton component page (`SkeletonDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSkeletonDocStrings(): SkeletonDocStrings {
  const { locale } = useI18n()
  return useMemo(() => skeletonDocByLocale[locale], [locale])
}
