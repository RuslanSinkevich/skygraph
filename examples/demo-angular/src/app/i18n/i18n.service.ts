import { Injectable, computed, inject, signal } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { SgConfigService, en_US, ru_RU } from '@skygraph/angular'
import { en } from './dict-en'
import { ru } from './dict-ru'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type DemoDict, type Locale } from './types'

const STORAGE_KEY = 'skygraph-demo-angular-locale'

const dicts: Record<Locale, DemoDict> = { en, ru }

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

/**
 * App-level i18n service. Signal-based so consumers `inject(I18nService)`
 * and read `i18n.t()` / `i18n.locale()` reactively in templates.
 *
 * Persists the chosen locale in `localStorage` and mirrors it onto
 * `<html lang="…">` plus the SkyGraph `SgConfigService` (so any component
 * that consumes `SgConfigService.config()` reactively picks up the matching
 * `en_US` / `ru_RU` strings — Wave 4.1 Sg* components still read the
 * static token, so a full SkyGraph-locale swap requires a bootstrap-time
 * choice; runtime updates only affect strings consumed via the service).
 *
 * Note: we intentionally avoid `effect()` here. Syncing `SgConfigService`
 * from a root `effect` during bootstrap has been observed to leave the app
 * stuck on a forever-loading tab in some browsers (no console errors): the
 * zone / navigation pipeline never reaches idle. Explicit `setLocale` +
 * a deferred initial `SgConfig` sync avoids that.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT)
  private readonly sgConfig = inject(SgConfigService)

  readonly locale = signal<Locale>(readInitialLocale())

  readonly t = computed<DemoDict>(() => dicts[this.locale()])

  setLocale(next: Locale): void {
    this.locale.set(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
    this.applyLocaleToDom(next)
    this.sgConfig.update({ locale: next === 'ru' ? ru_RU : en_US })
  }

  constructor() {
    const code = this.locale()
    this.applyLocaleToDom(code)
    // Defer `SgConfigService.update` out of the DI/constructor stack so
    // initial navigation and zone stability are not blocked.
    queueMicrotask(() => {
      this.sgConfig.update({ locale: code === 'ru' ? ru_RU : en_US })
    })
  }

  private applyLocaleToDom(code: Locale): void {
    const html = this.doc.documentElement
    if (html) html.setAttribute('lang', code)
  }
}
