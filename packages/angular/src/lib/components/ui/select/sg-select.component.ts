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

export interface SgSelectOption {
  label: string
  value: string | number
  disabled?: boolean
  loading?: boolean
}

/**
 * Attribute-selector select / combobox, DOM-equivalent of
 * `packages/react/src/components/ui/Select.tsx`.
 *
 * Use as `<div sg-select [options]="…" [(value)]="…"></div>`.
 *
 * Multi-select: `<div sg-select multiple [(value)]="arr">`. Renders inline
 * (no portal) — see decision D7 / finding F-Overlay-Inline.
 */
@Component({
  selector: 'div[sg-select]',
  standalone: true,
  template: `
    <div
      class="sg-select-selector"
      role="combobox"
      [attr.aria-expanded]="open()"
      aria-haspopup="listbox"
      [attr.aria-controls]="listboxId"
      [attr.aria-multiselectable]="multiple ? true : null"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.aria-disabled]="resolvedDisabled() || loading || null"
      [attr.tabindex]="resolvedDisabled() || loading ? -1 : 0"
      (click)="toggleOpen()"
      (keydown)="onKeyDown($event)"
    >
      @if (multiple) {
        @if (selectedMulti().length === 0) {
          <span class="sg-select-placeholder">{{ placeholder }}</span>
        } @else {
          <span class="sg-select-tags">
            @for (opt of selectedMulti(); track opt.value) {
              <span class="sg-select-tag">
                <span class="sg-select-tag-label">{{ opt.label }}</span>
                <button
                  type="button"
                  class="sg-select-tag-remove"
                  [attr.aria-label]="'Remove ' + opt.label"
                  tabindex="-1"
                  (click)="removeTag(opt, $event)"
                >
                  ×
                </button>
              </span>
            }
          </span>
        }
      } @else {
        <span [class]="selectedSingle() ? 'sg-select-selection-item' : 'sg-select-placeholder'">
          {{ selectedSingle()?.label ?? placeholder }}
        </span>
      }
      @if (loading) {
        <span
          class="sg-spin sg-spin-small"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        ></span>
      } @else {
        <span class="sg-select-arrow">{{ open() ? '▲' : '▼' }}</span>
      }
    </div>
    @if (open()) {
      <div
        class="sg-select-dropdown"
        role="listbox"
        [id]="listboxId"
        [attr.aria-multiselectable]="multiple ? true : null"
      >
        @for (opt of options; let i = $index; track opt.value) {
          <div
            role="option"
            [attr.aria-selected]="isOptionSelected(opt)"
            [class]="optionClass(opt, i)"
            (click)="select(opt)"
          >
            <span>{{ opt.label }}</span>
            @if (opt.loading) {
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
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSelectComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)

  protected readonly _open = signal(false)
  protected readonly _focused = signal(-1)
  protected readonly _internalSingle = signal<string | number | undefined>(undefined)
  protected readonly _internalMulti = signal<(string | number)[]>([])
  protected readonly _ctrlSingle = signal<string | number | undefined>(undefined)
  protected readonly _ctrlMulti = signal<(string | number)[] | undefined>(undefined)
  protected readonly _disabled = signal<boolean | undefined>(undefined)
  protected readonly _size = signal<SizeType | undefined>(undefined)
  protected readonly _unstyled = signal<boolean>(false)

  readonly listboxId = 'sg-select-' + Math.random().toString(36).slice(2, 8)

  @Input({ required: true }) options: SgSelectOption[] = []
  @Input() placeholder = 'Select...'
  @Input({ transform: booleanAttribute }) multiple = false
  @Input({ transform: booleanAttribute }) loading = false
  @Input() ariaLabel?: string
  @Input() ariaLabelledBy?: string

  @Input()
  get value(): string | number | (string | number)[] | undefined {
    return this.multiple ? this.currentMulti() : this.currentSingle()
  }
  set value(v: string | number | (string | number)[] | undefined) {
    if (this.multiple) {
      const arr = (v as (string | number)[]) ?? []
      this._ctrlMulti.set(arr)
      this._internalMulti.set(arr)
    } else {
      this._ctrlSingle.set(v as string | number | undefined)
      if (v !== undefined) this._internalSingle.set(v as string | number)
    }
  }
  @Input()
  set defaultValue(v: string | number | (string | number)[] | undefined) {
    if (this.multiple) {
      if (this._ctrlMulti() === undefined) this._internalMulti.set((v as (string | number)[]) ?? [])
    } else {
      if (this._ctrlSingle() === undefined)
        this._internalSingle.set(v as string | number | undefined)
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

  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<string | number | (string | number)[]>()
  @Output() readonly blurEvent = new EventEmitter<void>()

  readonly open = this._open.asReadonly()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() => {
    if (this._unstyled()) return ''
    return [
      'sg-select',
      `sg-select-${this.resolvedSize()}`,
      this.multiple ? 'sg-select-multiple' : '',
      this._open() ? 'sg-select-open' : '',
      this.resolvedDisabled() || this.loading ? 'sg-select-disabled' : '',
      this.loading ? 'sg-select-loading' : '',
    ]
      .filter(Boolean)
      .join(' ')
  })

  protected currentSingle(): string | number | undefined {
    return this._ctrlSingle() ?? this._internalSingle()
  }

  protected currentMulti(): (string | number)[] {
    return this._ctrlMulti() ?? this._internalMulti()
  }

  readonly selectedSingle = computed(() =>
    this.options.find((o) => o.value === this.currentSingle()),
  )

  readonly selectedMulti = computed(() =>
    this.options.filter((o) => this.currentMulti().includes(o.value)),
  )

  isOptionSelected(opt: SgSelectOption): boolean {
    return this.multiple
      ? this.currentMulti().includes(opt.value)
      : opt.value === this.currentSingle()
  }

  optionClass(opt: SgSelectOption, idx: number): string {
    return [
      'sg-select-option',
      this.isOptionSelected(opt) ? 'sg-select-option-selected' : '',
      idx === this._focused() ? 'sg-select-option-focused' : '',
      opt.disabled || opt.loading ? 'sg-select-option-disabled' : '',
      opt.loading ? 'sg-select-option-loading' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  toggleOpen(): void {
    if (this.resolvedDisabled() || this.loading) return
    this._open.update((v) => !v)
  }

  select(opt: SgSelectOption): void {
    if (opt.disabled || opt.loading) return
    if (this.multiple) {
      const cur = this.currentMulti()
      const next = cur.includes(opt.value)
        ? cur.filter((v) => v !== opt.value)
        : [...cur, opt.value]
      if (this._ctrlMulti() === undefined) this._internalMulti.set(next)
      this.valueChange.emit(next)
    } else {
      if (this._ctrlSingle() === undefined) this._internalSingle.set(opt.value)
      this.valueChange.emit(opt.value)
      this._open.set(false)
    }
  }

  removeTag(opt: SgSelectOption, e: MouseEvent): void {
    e.stopPropagation()
    if (this.resolvedDisabled() || this.loading) return
    const next = this.currentMulti().filter((v) => v !== opt.value)
    if (this._ctrlMulti() === undefined) this._internalMulti.set(next)
    this.valueChange.emit(next)
  }

  onKeyDown(e: KeyboardEvent): void {
    if (this.resolvedDisabled() || this.loading) return
    switch (e.key) {
      case 'Enter':
      case ' ': {
        e.preventDefault()
        const idx = this._focused()
        if (this._open() && idx >= 0 && this.options[idx]) this.select(this.options[idx])
        else this._open.update((v) => !v)
        break
      }
      case 'Escape':
        e.preventDefault()
        this._open.set(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!this._open()) this._open.set(true)
        else this._focused.update((i) => (i + 1) % this.options.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!this._open()) this._open.set(true)
        else this._focused.update((i) => (i - 1 + this.options.length) % this.options.length)
        break
      case 'Backspace':
        if (this.multiple && this.currentMulti().length > 0) {
          const next = this.currentMulti().slice(0, -1)
          if (this._ctrlMulti() === undefined) this._internalMulti.set(next)
          this.valueChange.emit(next)
        }
        break
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
