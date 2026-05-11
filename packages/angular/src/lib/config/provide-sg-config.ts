import type { EnvironmentProviders, Provider } from '@angular/core'
import { SG_CONFIG_TOKEN, type SgConfig } from './sg-config.tokens'

/**
 * App-level DI factory for the SkyGraph config token, mirroring React's
 * top-level `<ConfigProvider>` usage.
 *
 * @example
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideSgConfig({ size: 'large', locale: ru_RU })],
 * })
 * ```
 */
export function provideSgConfig(config: SgConfig = {}): Provider | EnvironmentProviders {
  return { provide: SG_CONFIG_TOKEN, useValue: config }
}
