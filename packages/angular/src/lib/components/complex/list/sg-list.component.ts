import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { injectSgConfig } from '../../../config/inject-sg-config'

/**
 * Structural-style template directive used to render each row of `SgListComponent`.
 *
 * ```html
 * <div sg-list [dataSource]="rows">
 *   <ng-template sgListItem let-item let-i="index">
 *     <div sg-list-item>{{ item.title }} (#{{ i }})</div>
 *   </ng-template>
 * </div>
 * ```
 */
@Directive({
  selector: '[sgListItem]',
  standalone: true,
})
export class SgListItemTemplateDirective<T = unknown> {
  constructor(public readonly template: TemplateRef<{ $implicit: T; index: number }>) {}
}

/**
 * Attribute-selector list, DOM-equivalent of
 * `packages/react/src/components/complex/List/List.tsx` (basic subset).
 *
 * Wave 4.2 ships header / footer / split / bordered / size / hover / row
 * click. Pagination, virtual scroll, drag-and-drop reorder, multi-select
 * with Ctrl/Cmd, grid responsive breakpoints and `loadMore` slot are
 * deferred to 4.3 (see findings F-List-Limited).
 */
@Component({
  selector: 'div[sg-list]',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @if (header) {
      <div class="sg-list-header">{{ header }}</div>
    }

    @if (loading) {
      <div class="sg-list-spin">
        <span
          class="sg-spin sg-spin-default"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        ></span>
      </div>
    } @else if (dataSource.length === 0) {
      <div class="sg-list-empty">{{ emptyText() }}</div>
    } @else {
      <div class="sg-list-items">
        @for (item of dataSource; let i = $index; track trackByIndex(i, item)) {
          <div [class]="rowClass(item, i)" (click)="onRowClick(item, i, $event)">
            @if (itemTpl) {
              <ng-container
                *ngTemplateOutlet="itemTpl.template; context: { $implicit: item, index: i }"
              ></ng-container>
            } @else {
              {{ asString(item) }}
            }
          </div>
        }
      </div>
    }

    @if (footer) {
      <div class="sg-list-footer">{{ footer }}</div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgListComponent<T = unknown> {
  private readonly cfg = injectSgConfig()

  protected readonly _selected = signal<number[]>([])

  @Input({ required: true }) dataSource: T[] = []
  @Input() header?: string
  @Input() footer?: string
  @Input({ transform: booleanAttribute }) loading = false
  @Input() size: 'small' | 'default' | 'large' = 'default'
  @Input({ transform: booleanAttribute }) split = true
  @Input({ transform: booleanAttribute }) bordered = false
  @Input({ transform: booleanAttribute }) hoverable = true
  @Input({ transform: booleanAttribute }) selectable = false
  @Input() emptyTextOverride?: string

  @Output() readonly itemClick = new EventEmitter<{ item: T; index: number }>()
  @Output() readonly selectionChange = new EventEmitter<{
    keys: number[]
    items: T[]
  }>()

  @ContentChild(SgListItemTemplateDirective)
  protected itemTpl?: SgListItemTemplateDirective<T>

  readonly emptyText = computed(
    () => this.emptyTextOverride ?? this.cfg.locale?.empty?.description ?? 'No data',
  )

  readonly classes = computed(() =>
    [
      'sg-list',
      `sg-list-${this.size}`,
      this.split ? 'sg-list-split' : '',
      this.bordered ? 'sg-list-bordered' : '',
      this.loading ? 'sg-list-loading' : '',
      this.selectable ? 'sg-list-selectable' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  trackByIndex = (i: number, _: T): number => i

  asString(v: unknown): string {
    return v == null ? '' : String(v)
  }

  rowClass(_item: T, index: number): string {
    const selected = this.selectable && this._selected().includes(index)
    return [
      'sg-list-item',
      this.hoverable ? 'sg-list-item-hoverable' : '',
      this.selectable ? 'sg-list-item-selectable' : '',
      selected ? 'sg-list-item-selected' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  onRowClick(item: T, index: number, _e: MouseEvent): void {
    this.itemClick.emit({ item, index })
    if (!this.selectable) return
    const cur = this._selected()
    const next = cur.includes(index) ? [] : [index]
    this._selected.set(next)
    this.selectionChange.emit({
      keys: next,
      items: next.map((k) => this.dataSource[k]),
    })
  }
}

/**
 * Structural row component. Use as `<div sg-list-item>` inside the
 * `<ng-template sgListItem>` body.
 */
@Component({
  selector: 'div[sg-list-item]',
  standalone: true,
  template: `
    <div class="sg-list-item-main">
      <div class="sg-list-item-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  host: {
    class: 'sg-list-item-row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgListItemComponent {}
