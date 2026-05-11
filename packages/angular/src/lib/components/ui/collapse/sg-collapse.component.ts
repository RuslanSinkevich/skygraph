import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

export interface SgCollapseItem {
  key: string
  label: string
  /** Plain-string body content (see decision D2). */
  content?: string
  extra?: string
  showArrow?: boolean
  disabled?: boolean
}

/**
 * Attribute-selector collapse, DOM-equivalent of
 * `packages/react/src/components/ui/Collapse.tsx`.
 *
 * Use as `<div sg-collapse [items]="…" [(activeKey)]="…"></div>`.
 *
 * Body content is `item.content` (string). For richer panel bodies,
 * project content into `<sg-collapse>` child slots in 4.3 or render
 * your own panels.
 */
@Component({
  selector: 'div[sg-collapse]',
  standalone: true,
  template: `
    @for (item of items; track item.key) {
      <div [class]="panelClass(item)">
        <div
          class="sg-collapse-header"
          role="button"
          [attr.tabindex]="item.disabled ? -1 : 0"
          [attr.aria-expanded]="isActive(item.key)"
          (click)="toggle(item)"
          (keydown.enter)="toggle(item); $event.preventDefault()"
          (keydown.space)="toggle(item); $event.preventDefault()"
        >
          @if (expandIconPosition === 'start' && item.showArrow !== false) {
            <span [class]="arrowClass(item)"></span>
          }
          <span class="sg-collapse-header-text">{{ item.label }}</span>
          @if (expandIconPosition === 'end' && item.showArrow !== false) {
            <span [class]="arrowClass(item)"></span>
          }
          @if (item.extra) {
            <span class="sg-collapse-extra">{{ item.extra }}</span>
          }
        </div>
        <div
          class="sg-collapse-content"
          [style.--sg-collapse-content-max-height]="isActive(item.key) ? 'none' : '0px'"
        >
          <div class="sg-collapse-content-inner">{{ item.content }}</div>
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgCollapseComponent {
  private readonly cfg = injectSgConfig()
  private readonly _internal = signal<string[]>([])
  private readonly _active = signal<string[] | undefined>(undefined)
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input({ required: true }) items: SgCollapseItem[] = []

  @Input()
  get activeKey(): string | string[] | undefined {
    const a = this._active() ?? this._internal()
    return a
  }
  set activeKey(v: string | string[] | undefined) {
    const arr = v === undefined ? undefined : Array.isArray(v) ? v : [v]
    this._active.set(arr)
    if (arr !== undefined) this._internal.set(arr)
  }
  @Input()
  set defaultActiveKey(v: string | string[] | undefined) {
    if (this._active() === undefined)
      this._internal.set(v === undefined ? [] : Array.isArray(v) ? v : [v])
  }

  @Input({ transform: booleanAttribute }) accordion = false
  @Input({ transform: booleanAttribute }) bordered = true
  @Input({ transform: booleanAttribute }) ghost = false
  @Input() expandIconPosition: 'start' | 'end' = 'start'

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly activeKeyChange = new EventEmitter<string[]>()

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-collapse',
      this.bordered ? 'sg-collapse-bordered' : '',
      this.ghost ? 'sg-collapse-ghost' : '',
      `sg-collapse-${this.resolvedSize()}`,
    ]
      .filter(Boolean)
      .join(' '),
  )

  current(): string[] {
    return this._active() ?? this._internal()
  }

  isActive(key: string): boolean {
    return this.current().includes(key)
  }

  panelClass(item: SgCollapseItem): string {
    return [
      'sg-collapse-panel',
      this.isActive(item.key) ? 'sg-collapse-panel-active' : '',
      item.disabled ? 'sg-collapse-panel-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  arrowClass(item: SgCollapseItem): string {
    return ['sg-collapse-arrow', this.isActive(item.key) ? 'sg-collapse-arrow-open' : '']
      .filter(Boolean)
      .join(' ')
  }

  toggle(item: SgCollapseItem): void {
    if (item.disabled) return
    const cur = this.current()
    const next = this.accordion
      ? cur.includes(item.key)
        ? []
        : [item.key]
      : cur.includes(item.key)
        ? cur.filter((k) => k !== item.key)
        : [...cur, item.key]
    if (this._active() === undefined) this._internal.set(next)
    this.activeKeyChange.emit(next)
  }
}
