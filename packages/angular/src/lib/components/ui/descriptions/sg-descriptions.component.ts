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
      <div [class]="titleClass()">{{ title }}</div>
    }
    <table [class]="tableClass()">
      <tbody>
        @for (row of rows(); let ri = $index; track ri) {
          @if (layout === 'vertical') {
            <tr [class]="rowClass()">
              @for (item of row; let ci = $index; track item.key ?? ci) {
                <th [class]="labelClass()" [attr.colSpan]="item.span ?? 1">
                  {{ item.label }}
                  @if (colon) {
                    <span [class]="colonClass()">:</span>
                  }
                </th>
              }
            </tr>
            <tr [class]="rowClass()">
              @for (item of row; let ci = $index; track item.key ?? ci) {
                <td [class]="contentClass()" [attr.colSpan]="item.span ?? 1">
                  {{ item.value }}
                </td>
              }
            </tr>
          } @else {
            <tr [class]="rowClass()">
              @for (item of row; let ci = $index; track item.key ?? ci) {
                <th [class]="labelClass()">
                  {{ item.label }}
                  @if (colon) {
                    <span [class]="colonClass()">:</span>
                  }
                </th>
                <td [class]="contentClass()" [attr.colSpan]="item.span ?? 1">
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
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

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

  /** Drop every sg-descriptions-* class — keep DOM structure only. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  readonly resolvedSize = computed(() => {
    const s = this._size() ?? this.cfg.size ?? 'middle'
    return s === 'small' ? 'small' : 'default'
  })

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    return [
      'sg-descriptions',
      `sg-descriptions-${this.resolvedSize()}`,
      this.bordered ? 'sg-descriptions-bordered' : '',
      this._className(),
    ]
      .filter(Boolean)
      .join(' ')
  })

  readonly titleClass = computed(() => (this._unstyled() ? '' : 'sg-descriptions-title'))
  readonly tableClass = computed(() => (this._unstyled() ? '' : 'sg-descriptions-table'))
  readonly rowClass = computed(() => (this._unstyled() ? '' : 'sg-descriptions-row'))
  readonly labelClass = computed(() => (this._unstyled() ? '' : 'sg-descriptions-item-label'))
  readonly contentClass = computed(() => (this._unstyled() ? '' : 'sg-descriptions-item-content'))
  readonly colonClass = computed(() => (this._unstyled() ? '' : 'sg-descriptions-colon'))

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
