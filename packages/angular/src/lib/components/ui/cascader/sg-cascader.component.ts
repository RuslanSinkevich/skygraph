import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

export interface SgCascaderOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: SgCascaderOption[]
}

/**
 * Attribute-selector cascader, DOM-equivalent of
 * `packages/react/src/components/complex/Cascader/Cascader.tsx`.
 *
 * Use as `<div sg-cascader [options]="…" [(value)]="path"></div>`.
 *
 * Wave 4.2 ships single-select with click-to-expand columns. Multi-select,
 * `loadData`, `showSearch` and `changeOnSelect` are deferred to 4.3
 * (see findings F-Cascader-Limited).
 */
@Component({
  selector: 'div[sg-cascader]',
  standalone: true,
  template: `
    <div class="sg-cascader-selector" (click)="toggleOpen()">
      <div class="sg-cascader-selection-wrap">
        @if (display()) {
          <span class="sg-cascader-selection-item">{{ display() }}</span>
        } @else {
          <span class="sg-cascader-placeholder">{{ placeholder }}</span>
        }
      </div>
      <div class="sg-cascader-actions">
        @if (allowClear && currentValue().length > 0) {
          <span class="sg-cascader-clear" (click)="clear($event)">×</span>
        }
        <span class="sg-cascader-arrow">{{ open() ? '▲' : '▼' }}</span>
      </div>
    </div>
    @if (open()) {
      <div class="sg-cascader-dropdown">
        <div class="sg-cascader-columns">
          @for (col of columns(); let ci = $index; track ci) {
            <div class="sg-cascader-column">
              @for (opt of col; track opt.value) {
                <div [class]="optionClass(opt, ci)" (click)="onOptionClick(opt, ci)">
                  <span class="sg-cascader-option-label">{{ opt.label }}</span>
                  @if (opt.children && opt.children.length) {
                    <span class="sg-cascader-option-expand">▸</span>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgCascaderComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)

  protected readonly _open = signal(false)
  protected readonly _internal = signal<(string | number)[]>([])
  protected readonly _ctrl = signal<(string | number)[] | undefined>(undefined)
  protected readonly _activeValues = signal<(string | number)[]>([])
  protected readonly _disabled = signal<boolean | undefined>(undefined)
  protected readonly _size = signal<SizeType | undefined>(undefined)

  @Input({ required: true }) options: SgCascaderOption[] = []
  @Input() placeholder = 'Please select'
  @Input({ transform: booleanAttribute }) allowClear = false

  @Input()
  get value(): (string | number)[] {
    return this.currentValue()
  }
  set value(v: (string | number)[]) {
    this._ctrl.set(v ?? [])
    this._internal.set(v ?? [])
    this._activeValues.set(v ?? [])
  }
  @Input()
  set defaultValue(v: (string | number)[]) {
    if (this._ctrl() === undefined) {
      this._internal.set(v ?? [])
      this._activeValues.set(v ?? [])
    }
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<(string | number)[]>()

  readonly open = this._open.asReadonly()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-cascader',
      `sg-cascader-${this.resolvedSize()}`,
      this._open() ? 'sg-cascader-open' : '',
      this.resolvedDisabled() ? 'sg-cascader-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly currentValue = computed(() => this._ctrl() ?? this._internal())

  readonly columns = computed<SgCascaderOption[][]>(() => {
    const cols: SgCascaderOption[][] = [this.options]
    let current: SgCascaderOption[] = this.options
    for (const v of this._activeValues()) {
      const found = current.find((o) => o.value === v)
      if (!found?.children?.length) break
      cols.push(found.children)
      current = found.children
    }
    return cols
  })

  readonly display = computed(() => {
    const path: SgCascaderOption[] = []
    let current: SgCascaderOption[] = this.options
    for (const v of this.currentValue()) {
      const found = current.find((o) => o.value === v)
      if (!found) break
      path.push(found)
      current = found.children ?? []
    }
    return path.map((p) => p.label).join(' / ')
  })

  optionClass(opt: SgCascaderOption, colIndex: number): string {
    return [
      'sg-cascader-option',
      this._activeValues()[colIndex] === opt.value ? 'sg-cascader-option-active' : '',
      opt.disabled ? 'sg-cascader-option-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  toggleOpen(): void {
    if (this.resolvedDisabled()) return
    this._open.update((v) => !v)
    if (this._open()) this._activeValues.set(this.currentValue())
  }

  onOptionClick(opt: SgCascaderOption, colIndex: number): void {
    if (opt.disabled) return
    const next = [...this._activeValues().slice(0, colIndex), opt.value]
    this._activeValues.set(next)
    const isLeaf = !opt.children || opt.children.length === 0
    if (isLeaf) {
      if (this._ctrl() === undefined) this._internal.set(next)
      this.valueChange.emit(next)
      this._open.set(false)
    }
  }

  clear(e: MouseEvent): void {
    e.stopPropagation()
    if (this.resolvedDisabled()) return
    if (this._ctrl() === undefined) this._internal.set([])
    this._activeValues.set([])
    this.valueChange.emit([])
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
