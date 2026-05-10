import { createContext, useContext, type ReactNode } from 'react'
import { type ShowcasesLocale, showcasesLocaleEn } from '@skygraph-examples/shared'

/**
 * Per-app locale context for SkyGraph showcases.
 *
 * Apps and tabs read their localized strings via `useAppLocale('admin')` etc.
 * The provider is mounted by `ShowcasesViews` once the user-selected locale is
 * resolved at the App.tsx level (en | ru today).
 *
 * A non-throwing default is intentional: opening a single app file in a
 * stand-alone Storybook-style context would otherwise blow up.
 */
const ShowcaseLocaleContext = createContext<ShowcasesLocale>(showcasesLocaleEn)

export function ShowcaseLocaleProvider({
  value,
  children,
}: {
  value: ShowcasesLocale
  children: ReactNode
}) {
  return <ShowcaseLocaleContext.Provider value={value}>{children}</ShowcaseLocaleContext.Provider>
}

export function useShowcaseLocale(): ShowcasesLocale {
  return useContext(ShowcaseLocaleContext)
}

export function useAppLocale<K extends keyof ShowcasesLocale['apps']>(
  app: K,
): ShowcasesLocale['apps'][K] {
  const locale = useContext(ShowcaseLocaleContext)
  return locale.apps[app]
}
