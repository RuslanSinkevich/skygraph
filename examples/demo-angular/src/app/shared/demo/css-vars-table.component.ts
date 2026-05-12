import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { I18nService } from '../../i18n'

export interface CssVarDef {
  /** Variable name without the leading `--`. */
  name: string
  default: string
  description: string
}

/**
 * Angular port of `examples/demo/src/components/CssVarsTable.tsx`.
 * Same className contract — `.demo-props-section` + `.doc-table`.
 */
@Component({
  selector: 'sg-css-vars-table',
  standalone: true,
  template: `
    @if (data().length > 0) {
      <div class="demo-props-section">
        <h3 class="demo-props-title">{{ heading() }}</h3>
        @if (hint()) {
          <p
            [style.margin]="'-4px 0 12px'"
            [style.fontSize.px]="13"
            [style.color]="'var(--sg-color-text-secondary)'"
          >
            {{ hint() }}
          </p>
        }
        <table class="doc-table">
          <thead>
            <tr>
              <th [style.width]="'30%'">{{ i18n.t().cssVarsTable.colVariable }}</th>
              <th [style.width]="'28%'">{{ i18n.t().cssVarsTable.colDefault }}</th>
              <th>{{ i18n.t().cssVarsTable.colDescription }}</th>
            </tr>
          </thead>
          <tbody>
            @for (v of data(); track v.name) {
              <tr>
                <td>
                  <code>--{{ v.name }}</code>
                </td>
                <td>
                  <code>{{ v.default }}</code>
                </td>
                <td>{{ v.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssVarsTableComponent {
  readonly title = input<string | undefined>(undefined)
  readonly hint = input<string | undefined>(undefined)
  readonly data = input.required<readonly CssVarDef[]>()

  protected readonly i18n = inject(I18nService)

  protected readonly heading = computed(() => this.title() ?? this.i18n.t().cssVarsTable.title)
}
