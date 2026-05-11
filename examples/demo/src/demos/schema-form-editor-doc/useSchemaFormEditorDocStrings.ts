import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SchemaFormEditorDocStrings } from './en'
import { schemaFormEditorDocEn } from './en'
import { schemaFormEditorDocRu } from './ru'

const schemaFormEditorDocByLocale: Record<Locale, SchemaFormEditorDocStrings> = {
  en: schemaFormEditorDocEn as SchemaFormEditorDocStrings,
  ru: schemaFormEditorDocRu,
}

/**
 * Doc strings for the SchemaFormEditor component page (`SchemaFormEditorDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSchemaFormEditorDocStrings(): SchemaFormEditorDocStrings {
  const { locale } = useI18n()
  return useMemo(() => schemaFormEditorDocByLocale[locale], [locale])
}
