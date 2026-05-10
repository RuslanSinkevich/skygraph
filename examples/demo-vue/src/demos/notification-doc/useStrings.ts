import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { NotificationDocStrings } from './en'
import { notificationDocEn } from './en'
import { notificationDocRu } from './ru'

const dictByLocale: Record<Locale, NotificationDocStrings> = {
  en: notificationDocEn as NotificationDocStrings,
  ru: notificationDocRu,
}

/**
 * Doc strings for the `Notification` component page (`NotificationDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useNotificationDocStrings(): ComputedRef<NotificationDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
