import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { AvatarDocStrings } from './en'
import { avatarDocEn } from './en'
import { avatarDocRu } from './ru'

const avatarDocByLocale: Record<Locale, AvatarDocStrings> = {
  en: avatarDocEn as AvatarDocStrings,
  ru: avatarDocRu,
}

/**
 * Doc strings for the Avatar component page (`AvatarDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useAvatarDocStrings(): AvatarDocStrings {
  const { locale } = useI18n()
  return useMemo(() => avatarDocByLocale[locale], [locale])
}
