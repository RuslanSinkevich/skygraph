import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { I18nService } from '../../i18n'

export interface PropDef {
  name: string
  description: string
  type: string
  default?: string
  required?: boolean
}

/**
 * Angular port of `examples/demo/src/components/PropsTable.tsx`. Same
 * `.demo-props-section` / `.doc-table` className contract.
 */
@Component({
  selector: 'sg-props-table',
  standalone: true,
  template: `
    <div class="demo-props-section">
      <h3 class="demo-props-title">{{ heading() }}</h3>
      <table class="doc-table">
        <thead>
          <tr>
            <th>{{ i18n.t().propsTable.colProperty }}</th>
            <th>{{ i18n.t().propsTable.colDescription }}</th>
            <th>{{ i18n.t().propsTable.colType }}</th>
            <th>{{ i18n.t().propsTable.colDefault }}</th>
          </tr>
        </thead>
        <tbody>
          @for (prop of data(); track prop.name) {
            <tr>
              <td>
                <code>{{ prop.name }}</code>
                @if (prop.required) {
                  <span
                    [attr.aria-label]="i18n.t().propsTable.requiredLabel"
                    [style.color]="'var(--sg-color-error)'"
                    >&nbsp;*</span
                  >
                }
              </td>
              <td>{{ prop.description }}</td>
              <td>
                <code>{{ prop.type }}</code>
              </td>
              <td>
                @if (prop.default) {
                  <code>{{ prop.default }}</code>
                } @else {
                  —
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropsTableComponent {
  readonly title = input<string | undefined>(undefined)
  readonly data = input.required<readonly PropDef[]>()

  protected readonly i18n = inject(I18nService)

  protected readonly heading = computed(() => this.title() ?? this.i18n.t().propsTable.titleApi)
}
