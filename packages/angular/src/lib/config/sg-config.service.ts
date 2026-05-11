import { Injectable, computed, inject, signal } from '@angular/core'
import { SG_CONFIG_TOKEN, type SgConfig } from './sg-config.tokens'

/**
 * Reactive holder for the active `SgConfig`. Lazily initialised from the
 * `SG_CONFIG_TOKEN` value, then re-exposed as a `signal` for components that
 * want to react to runtime overrides (e.g. theme / locale switching).
 *
 * Wave 4.1 components consume `injectSgConfig()` directly because most of them
 * need a stable snapshot at construction time; this service exists to keep
 * the door open for signal-driven re-renders without churning the DI surface
 * in Wave 4.2+.
 */
@Injectable({ providedIn: 'root' })
export class SgConfigService {
  private readonly initial = inject(SG_CONFIG_TOKEN)
  private readonly _config = signal<SgConfig>(this.initial)

  /** Live read-only signal pointing at the currently active config. */
  readonly config = computed(() => this._config())

  /**
   * Replace the active config. Useful for app-level locale switchers; merges
   * shallowly with the previous value to stay aligned with React's
   * `<ConfigProvider>` merging semantics.
   */
  update(partial: SgConfig): void {
    const prev = this._config()
    this._config.set({
      size: partial.size ?? prev.size,
      disabled: partial.disabled ?? prev.disabled,
      bordered: partial.bordered ?? prev.bordered,
      locale: partial.locale
        ? prev.locale
          ? { ...prev.locale, ...partial.locale }
          : partial.locale
        : prev.locale,
    })
  }
}
