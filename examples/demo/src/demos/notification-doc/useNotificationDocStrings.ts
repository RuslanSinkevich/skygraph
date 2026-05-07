import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { NotificationDocStrings } from './en'
import { notificationDocEn } from './en'
import { notificationDocRu } from './ru'

const notificationDocByLocale: Record<Locale, NotificationDocStrings> = {
  en: notificationDocEn as NotificationDocStrings,
  ru: notificationDocRu,
}

/**
 * Doc strings for the Notification component page (`NotificationDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useNotificationDocStrings(): NotificationDocStrings {
  const { locale } = useI18n()
  return useMemo(() => notificationDocByLocale[locale], [locale])
}
