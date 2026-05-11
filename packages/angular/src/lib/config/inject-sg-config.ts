import { inject } from '@angular/core'
import { SG_CONFIG_TOKEN, type SgConfig } from './sg-config.tokens'

/**
 * Returns the nearest `SgConfig` from the injector hierarchy.
 * Equivalent to React's `useConfig()` hook.
 *
 * Must be called inside an injection context (constructor, factory function,
 * field initialiser of an injectable class, or `runInInjectionContext`).
 */
export function injectSgConfig(): SgConfig {
  return inject(SG_CONFIG_TOKEN)
}
