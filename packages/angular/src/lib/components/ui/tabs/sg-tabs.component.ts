import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/** Configuration for one tab. `template` is a string label only — see decisions D2. */
export interface SgTabItem {
  key: string
  label: string
  /** Plain-string body content (rich panel content via `selectedKey` + own template). */
  content?: string
  disabled?: boolean
  loading?: boolean
}

/**
 * Attribute-selector tabs, DOM-equivalent of
 * `packages/react/src/components/ui/Tabs.tsx`.
 *
 * Use as `<div sg-tabs [items]="tabs" [(activeKey)]="key" type="line"></div>`.
 *
 * Panel body is the `content` string from the active item. For richer
 * content, listen to `(activeKeyChange)` and render your own panel
 * outside the tabs (this is the same trade-off as decisions D2).
 */
@Component({
  selector: 'div[sg-tabs]',
  standalone: true,
  template: `
    <div class="sg-tabs-nav" role="tablist">
      @for (item of items; track item.key) {
        <div
          role="tab"
          [class]="tabClass(item)"
          [attr.aria-selected]="item.key === currentKey()"
          [attr.tabindex]="item.key === currentKey() ? 0 : -1"
          (click)="select(item)"
          (keydown)="onKeyDown($event, item)"
        >
          {{ item.label }}
          @if (item.loading) {
            <span
              class="sg-spin sg-spin-small"
              role="status"
              aria-live="polite"
              aria-label="Loading"
            ></span>
          }
        </div>
      }
    </div>
    <div class="sg-tabs-content" role="tabpanel">
      @if (activeItem()?.content) {
        {{ activeItem()?.content }}
      }
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTabsComponent {
  private readonly cfg = injectSgConfig()
  private readonly _activeKey = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input() items: SgTabItem[] = []
  @Input() type: 'line' | 'card' = 'card'

  @Input()
  get activeKey(): string {
    return this._activeKey() ?? this._internal()
  }
  set activeKey(v: string) {
    this._activeKey.set(v)
    if (v) this._internal.set(v)
  }
  @Input()
  set defaultActiveKey(v: string) {
    if (this._activeKey() === undefined) this._internal.set(v ?? '')
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly activeKeyChange = new EventEmitter<string>()

  readonly currentKey = computed(() => {
    const ek = this._activeKey() ?? this._internal()
    if (ek) return ek
    return this.items[0]?.key ?? ''
  })

  readonly activeItem = computed(() => this.items.find((i) => i.key === this.currentKey()))

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-tabs',
      `sg-tabs-${this.resolvedSize()}`,
      this.type === 'line' ? 'sg-tabs-line' : 'sg-tabs-card',
    ].join(' '),
  )

  tabClass(item: SgTabItem): string {
    return [
      'sg-tabs-tab',
      item.key === this.currentKey() ? 'sg-tabs-tab-active' : '',
      item.disabled ? 'sg-tabs-tab-disabled' : '',
      item.loading ? 'sg-tabs-tab-loading' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  select(item: SgTabItem): void {
    if (item.disabled || item.loading) return
    if (this._activeKey() === undefined) this._internal.set(item.key)
    this.activeKeyChange.emit(item.key)
  }

  onKeyDown(e: KeyboardEvent, item: SgTabItem): void {
    const enabled = this.items.filter((i) => !i.disabled && !i.loading)
    if (enabled.length === 0) return
    const idx = enabled.findIndex((i) => i.key === item.key)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      this.select(enabled[(idx + 1) % enabled.length])
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      this.select(enabled[(idx - 1 + enabled.length) % enabled.length])
    } else if (e.key === 'Home') {
      e.preventDefault()
      this.select(enabled[0])
    } else if (e.key === 'End') {
      e.preventDefault()
      this.select(enabled[enabled.length - 1])
    }
  }
}
