import { computed, type ComputedRef } from 'vue'
import { useI18n } from './I18nProvider'
import type { Locale } from './types'

/**
 * Per-demo string dictionary helper.
 *
 * Mirrors React `useDemoStrings`: every demo page brings its own
 * translations along, no global dictionary edit required.
 *
 * ```ts
 * const STRINGS = {
 *   en: { save: 'Save', cancel: 'Cancel' },
 *   ru: { save: 'Сохранить', cancel: 'Отмена' },
 * } as const
 *
 * const t = useDemoStrings(STRINGS)
 * t.value.save
 * ```
 *
 * The `en` map is mandatory and drives the inferred key set. Other locales
 * fall back to `en` when missing, so adding a locale never breaks a demo.
 */
export function useDemoStrings<T extends Readonly<Record<string, string>>>(
  strings: Readonly<{ en: T }> & {
    readonly [L in Exclude<Locale, 'en'>]?: Readonly<Record<keyof T, string>>
  },
): ComputedRef<T> {
  const { locale } = useI18n()
  return computed(() => (strings[locale.value] ?? strings.en) as T)
}
