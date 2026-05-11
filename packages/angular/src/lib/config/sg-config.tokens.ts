import { InjectionToken } from '@angular/core'
import type { SgLocale } from '../locales/locale.types'
import type { SizeType } from '../types'

/**
 * Global SkyGraph runtime configuration, equivalent to React's `SgConfig`
 * from `packages/react/src/components/ConfigProvider.tsx`.
 *
 * Components consume the resolved values via `injectSgConfig()`. To override
 * the configuration for a subtree, wrap the subtree in `<sg-config-provider>`
 * or call `provideSgConfig()` at any route / component injector level.
 */
export interface SgConfig {
  /** Default size token for nested components. */
  size?: SizeType
  /** Disables interactions for nested components when true. */
  disabled?: boolean
  /** Enables bordered styling for nested components when true. */
  bordered?: boolean
  /** Locale messages shallow-merged with the parent provider when set. */
  locale?: SgLocale
}

/**
 * DI token holding the active `SgConfig`. Defaults to an empty object so
 * components without an explicit provider still receive a stable reference.
 */
export const SG_CONFIG_TOKEN = new InjectionToken<SgConfig>('SG_CONFIG_TOKEN', {
  providedIn: 'root',
  factory: () => ({}),
})
