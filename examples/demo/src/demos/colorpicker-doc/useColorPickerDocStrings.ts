import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ColorPickerDocStrings } from './en'
import { colorPickerDocEn } from './en'
import { colorPickerDocRu } from './ru'

const colorPickerDocByLocale: Record<Locale, ColorPickerDocStrings> = {
  en: colorPickerDocEn as ColorPickerDocStrings,
  ru: colorPickerDocRu,
}

/**
 * Doc strings for the ColorPicker component page (`ColorPickerDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useColorPickerDocStrings(): ColorPickerDocStrings {
  const { locale } = useI18n()
  return useMemo(() => colorPickerDocByLocale[locale], [locale])
}
