import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

export interface SgDescriptionsItem {
  key?: string
  label: string
  /** Plain-string value (see decision D2). */
  value: string
  span?: number
}

/**
 * Attribute-selector descriptions table, DOM-equivalent of
 * `packages/react/src/components/ui/Descriptions.tsx`.
 *
 * Use as `<div sg-descriptions [items]="…" [column]="3" [bordered]="true"></div>`.
 */
@Component({
  selector: 'div[sg-descriptions]',
  standalone: true,
  template: `
    @if (title) {
      <div class="sg-descriptions-title">{{ title }}</div>
    }
    <table class="sg-descriptions-table">
      <tbody>
        @for (row of rows(); let ri = $index; track ri) {
          @if (layout === 'vertical') {
            <tr class="sg-descriptions-row">
              @for (item of row; let ci = $index; track item.key ?? ci) {
                <th class="sg-descriptions-item-label" [attr.colSpan]="item.span ?? 1">
                  {{ item.label }}
                  @if (colon) {
                    <span class="sg-descriptions-colon">:</span>
                  }
                </th>
              }
            </tr>
            <tr class="sg-descriptions-row">
              @for (item of row; let ci = $index; track item.key ?? ci) {
                <td class="sg-descriptions-item-content" [attr.colSpan]="item.span ?? 1">
                  {{ item.value }}
                </td>
              }
            </tr>
          } @else {
            <tr class="sg-descriptions-row">
              @for (item of row; let ci = $index; track item.key ?? ci) {
                <th class="sg-descriptions-item-label">
                  {{ item.label }}
                  @if (colon) {
                    <span class="sg-descriptions-colon">:</span>
                  }
                </th>
                <td class="sg-descriptions-item-content" [attr.colSpan]="item.span ?? 1">
                  {{ item.value }}
                </td>
              }
            </tr>
          }
        }
      </tbody>
    </table>
  `,
  host: {
    '[class]': 'classes()',
    role: 'list',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgDescriptionsComponent {
  private readonly cfg = injectSgConfig()
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input() title?: string
  @Input({ required: true }) items: SgDescriptionsItem[] = []
  @Input({ transform: booleanAttribute }) bordered = false
  @Input() column = 3
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal'
  @Input({ transform: booleanAttribute }) colon = true

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  readonly resolvedSize = computed(() => {
    const s = this._size() ?? this.cfg.size ?? 'middle'
    return s === 'small' ? 'small' : 'default'
  })

  readonly classes = computed(() =>
    [
      'sg-descriptions',
      `sg-descriptions-${this.resolvedSize()}`,
      this.bordered ? 'sg-descriptions-bordered' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly rows = computed(() => {
    const out: SgDescriptionsItem[][] = []
    let row: SgDescriptionsItem[] = []
    let used = 0
    for (const item of this.items) {
      const span = Math.min(item.span ?? 1, this.column)
      if (used + span > this.column) {
        out.push(row)
        row = []
        used = 0
      }
      row.push(item)
      used += span
      if (used >= this.column) {
        out.push(row)
        row = []
        used = 0
      }
    }
    if (row.length > 0) out.push(row)
    return out
  })
}
