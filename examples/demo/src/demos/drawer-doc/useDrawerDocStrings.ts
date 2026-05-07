import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DrawerDocStrings } from './en'
import { drawerDocEn } from './en'
import { drawerDocRu } from './ru'

const drawerDocByLocale: Record<Locale, DrawerDocStrings> = {
  en: drawerDocEn as DrawerDocStrings,
  ru: drawerDocRu,
}

/**
 * Doc strings for the Drawer component page (`DrawerDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useDrawerDocStrings(): DrawerDocStrings {
  const { locale } = useI18n()
  return useMemo(() => drawerDocByLocale[locale], [locale])
}
