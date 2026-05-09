import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  watchEffect,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'
import { en } from './dict-en'
import { ru } from './dict-ru'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type DemoDict, type Locale } from './types'

const STORAGE_KEY = 'skygraph-demo-vue-locale'

const dicts: Record<Locale, DemoDict> = { en, ru }

interface I18nContext {
  locale: Ref<Locale>
  t: ComputedRef<DemoDict>
  setLocale: (next: Locale) => void
}

export const I18N_KEY: InjectionKey<I18nContext> = Symbol('skygraph-demo-vue-i18n')

function isSupported(value: string | null): value is Locale {
  return value !== null && (SUPPORTED_LOCALES as string[]).includes(value)
}

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isSupported(stored)) return stored
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_LOCALE
}

export const I18nProvider = defineComponent({
  name: 'I18nProvider',
  setup(_, { slots }) {
    const locale = ref<Locale>(readInitialLocale())
    const t = computed<DemoDict>(() => dicts[locale.value])
    const setLocale = (next: Locale) => {
      locale.value = next
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore
      }
    }

    watchEffect(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', locale.value)
      }
    })

    provide(I18N_KEY, { locale, t, setLocale })

    return () => slots.default?.()
  },
})

export function useI18n(): I18nContext {
  const ctx = inject(I18N_KEY)
  if (!ctx) {
    throw new Error('useI18n must be used inside <I18nProvider>')
  }
  return ctx
}

export function provideI18nForTesting(value: I18nContext) {
  provide(I18N_KEY, value)
}

export { h }
