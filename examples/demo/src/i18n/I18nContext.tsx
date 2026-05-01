import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './dict-en'
import { ru } from './dict-ru'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './types'
import type { DemoDict, Locale } from './types'

const STORAGE_KEY = 'skygraph-demo-locale'

const dicts: Record<Locale, DemoDict> = { en, ru }

function isSupportedLocale(value: string | null): value is Locale {
  return value !== null && (SUPPORTED_LOCALES as string[]).includes(value)
}

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isSupportedLocale(stored)) return stored
  } catch {
    // localStorage may be unavailable (SSR / privacy mode) — silently fall back.
  }
  return DEFAULT_LOCALE
}

interface I18nContextValue {
  locale: Locale
  t: DemoDict
  setLocale: (next: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore — read-only storage.
    }
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: dicts[locale], setLocale }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used inside <I18nProvider>')
  }
  return ctx
}
