import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { AvatarDocStrings } from './en'
import { avatarDocEn } from './en'
import { avatarDocRu } from './ru'

const dictByLocale: Record<Locale, AvatarDocStrings> = {
  en: avatarDocEn as AvatarDocStrings,
  ru: avatarDocRu,
}

/**
 * Doc strings for the Avatar component page (`AvatarDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useAvatarDocStrings(): ComputedRef<AvatarDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
