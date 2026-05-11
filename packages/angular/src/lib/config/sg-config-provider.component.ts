import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import type { SgConfig } from './sg-config.tokens'

/**
 * Semantic wrapper that mirrors React's `<ConfigProvider>` API surface.
 *
 * For **app/route-level** configuration use {@link provideSgConfig} — it
 * uses Angular DI native environment injectors and is the recommended way
 * to set SkyGraph defaults from `bootstrapApplication()` or a route's
 * `providers` array.
 *
 * For **subtree-scoped** overrides (the React `<ConfigProvider>` use case
 * of patching a single page's locale), use the upcoming structural
 * directive `*sgConfigProvider` planned for Wave 4.2 (see
 * `docs/_streams/findings/T-Angular-Foundation.md` F7). The current
 * `<sg-config-provider>` element is a thin wrapper around `<ng-content>` —
 * it accepts `@Input() config` so the API surface is stable from Wave 4.1
 * forward, but DI-override of projected children is **not** active yet.
 *
 * @example
 * ```ts
 * // App-level (works today):
 * bootstrapApplication(AppComponent, {
 *   providers: [provideSgConfig({ size: 'large', locale: ru_RU })],
 * })
 * ```
 */
@Component({
  selector: 'sg-config-provider',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgConfigProviderComponent {
  /**
   * Configuration overrides. Reserved for the Wave 4.2 structural-directive
   * form; in Wave 4.1 this input is accepted but does not propagate via DI.
   */
  @Input() config: SgConfig = {}
}
