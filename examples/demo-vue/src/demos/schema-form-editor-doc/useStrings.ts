import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SchemaFormEditorDocStrings } from './en'
import { schemaFormEditorDocEn } from './en'
import { schemaFormEditorDocRu } from './ru'

const dictByLocale: Record<Locale, SchemaFormEditorDocStrings> = {
  en: schemaFormEditorDocEn as SchemaFormEditorDocStrings,
  ru: schemaFormEditorDocRu,
}

export function useSchemaFormEditorDocStrings(): ComputedRef<SchemaFormEditorDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
