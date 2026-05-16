import { inject, provide, type InjectionKey } from 'vue'
import { type ShowcasesLocale, showcasesLocaleEn } from '@skygraph-examples/shared'

/**
 * Per-app locale provide/inject for SkyGraph Vue showcases.
 * Mirrors the React `ShowcaseLocaleProvider` / `useShowcaseLocale` API.
 *
 * Apps and tabs read their localized strings via `useAppLocale('admin')` etc.
 * The provider is mounted by the detail view once the user-selected locale
 * is resolved.
 */
const SHOWCASE_LOCALE_KEY: InjectionKey<ShowcasesLocale> = Symbol('skygraph-showcase-locale')

export function provideShowcaseLocale(value: ShowcasesLocale): void {
  provide(SHOWCASE_LOCALE_KEY, value)
}

export function useShowcaseLocale(): ShowcasesLocale {
  return inject(SHOWCASE_LOCALE_KEY, showcasesLocaleEn)
}

export function useAppLocale<K extends keyof ShowcasesLocale['apps']>(
  app: K,
): ShowcasesLocale['apps'][K] {
  const locale = useShowcaseLocale()
  return locale.apps[app]
}
