import { useI18n } from './I18nContext'
import type { Locale } from './types'

/**
 * Per-demo string dictionary helper.
 *
 * Pattern used by every `*.demo.tsx` to keep them self-contained — copy a demo
 * file into a real app and it brings its own translations along, no global
 * dictionary edit required.
 *
 * ```tsx
 * const STRINGS = {
 *   en: { save: 'Save', cancel: 'Cancel' },
 *   ru: { save: 'Сохранить', cancel: 'Отмена' },
 * } as const
 *
 * export function MyDemo() {
 *   const t = useDemoStrings(STRINGS)
 *   return <button>{t.save}</button>
 * }
 * ```
 *
 * The `en` map is mandatory and drives the inferred key set + autocomplete.
 * Every other locale must provide the same keys but its values are plain
 * `string` — that way `as const` on the dictionary doesn't make literal types
 * from `en` and `ru` clash.
 *
 * Falls back to `en` if the active locale dictionary is missing — adding a new
 * locale never breaks existing demos.
 */
export function useDemoStrings<T extends Readonly<Record<string, string>>>(
  strings: Readonly<{ en: T }> & {
    readonly [L in Exclude<Locale, 'en'>]?: Readonly<Record<keyof T, string>>
  },
): T {
  const { locale } = useI18n()
  const dict = strings[locale]
  return (dict ?? strings.en) as T
}
