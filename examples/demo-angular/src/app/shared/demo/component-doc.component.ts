import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { I18nService } from '../../i18n'

/**
 * Angular port of `examples/demo/src/components/ComponentDoc.tsx`.
 * Wraps a component documentation page in the same `.doc-page` shell
 * as the React/Vue versions: title, lead, optional crumbs/badge,
 * "When to use" list, optional notes, then a vertical stack of demos
 * provided via `<ng-content>`.
 *
 * The React DemoTOC sidebar is intentionally omitted for now (Angular
 * port pending). All other DOM matches React 1:1 so the shared CSS
 * applies unchanged.
 */
@Component({
  selector: 'sg-component-doc',
  standalone: true,
  template: `
    <div class="doc-with-toc">
      <section class="doc-page">
        @if (crumbs()?.length) {
          <div class="doc-crumbs">
            @for (c of crumbs() ?? []; track $index) {
              <span class="doc-crumb">
                {{ c }}
                @if (!$last) {
                  <span class="doc-crumb-sep">/</span>
                }
              </span>
            }
          </div>
        }

        <header class="doc-header">
          <h1 class="doc-component-title">
            {{ title() }}
            @if (badge()) {
              <span class="doc-badge">{{ badge() }}</span>
            }
          </h1>
          <p class="doc-lead">{{ description() }}</p>
        </header>

        @if (whenToUse()?.length) {
          <div class="doc-when-to-use">
            <h2>{{ i18n.t().componentDoc.whenToUse }}</h2>
            <ul>
              @for (item of whenToUse() ?? []; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
        }

        <ng-content select="[componentDocNotes]"></ng-content>

        <h2>{{ i18n.t().componentDoc.examples }}</h2>
        <div class="doc-demos">
          <ng-content></ng-content>
        </div>

        <ng-content select="[componentDocApi]"></ng-content>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDocComponent {
  readonly title = input.required<string>()
  readonly description = input.required<string>()
  readonly badge = input<string | undefined>(undefined)
  readonly crumbs = input<readonly string[] | undefined>(undefined)
  readonly whenToUse = input<readonly string[] | undefined>(undefined)

  protected readonly i18n = inject(I18nService)
}
