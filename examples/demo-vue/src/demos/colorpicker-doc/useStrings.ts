import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ColorPickerDocStrings } from './en'
import { colorPickerDocEn } from './en'
import { colorPickerDocRu } from './ru'

const colorPickerDocByLocale: Record<Locale, ColorPickerDocStrings> = {
  en: colorPickerDocEn as ColorPickerDocStrings,
  ru: colorPickerDocRu,
}

export function useColorPickerDocStrings(): ComputedRef<ColorPickerDocStrings> {
  const { locale } = useI18n()
  return computed(() => colorPickerDocByLocale[locale.value])
}
