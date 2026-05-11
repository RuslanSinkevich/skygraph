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

export interface SgAutoCompleteOption {
  label: string
  value: string
}

/**
 * Attribute-selector autocomplete input, DOM-equivalent of
 * `packages/react/src/components/ui/AutoComplete.tsx`.
 *
 * Use as `<div sg-autocomplete [options]="…" [(value)]="…"></div>`.
 *
 * Filters options client-side by `label` (case-insensitive) against the
 * current input value.
 */
@Component({
  selector: 'div[sg-autocomplete]',
  standalone: true,
  template: `
    <span class="sg-input-wrapper">
      <input
        type="text"
        role="combobox"
        aria-autocomplete="list"
        [attr.aria-expanded]="open() && filtered().length > 0"
        [class]="'sg-input sg-input-' + resolvedSize()"
        [value]="currentValue()"
        [placeholder]="placeholder ?? ''"
        [disabled]="resolvedDisabled() || loading"
        (input)="onInput($event)"
        (focus)="open.set(true)"
        (blur)="blurEvent.emit()"
      />
      @if (loading) {
        <span
          class="sg-spin sg-spin-small"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        ></span>
      }
    </span>
    @if (open() && filtered().length > 0) {
      <div class="sg-autocomplete-dropdown">
        @for (opt of filtered(); track opt.value) {
          <div class="sg-autocomplete-option" (mousedown)="select(opt)">
            {{ opt.label }}
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
export class SgAutoCompleteComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)
  protected readonly _value = signal<string | undefined>(undefined)
  protected readonly _internal = signal<string>('')
  protected readonly _disabled = signal<boolean | undefined>(undefined)
  protected readonly _size = signal<SizeType | undefined>(undefined)
  protected readonly open = signal(false)

  @Input({ required: true }) options: SgAutoCompleteOption[] = []
  @Input() placeholder?: string
  @Input({ transform: booleanAttribute }) loading = false

  @Input()
  get value(): string {
    return this._value() ?? this._internal()
  }
  set value(v: string) {
    this._value.set(v)
    if (v !== undefined && v !== null) this._internal.set(v)
  }
  @Input()
  set defaultValue(v: string) {
    if (this._value() === undefined) this._internal.set(v ?? '')
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

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly searchChange = new EventEmitter<string>()
  @Output() readonly optionSelect = new EventEmitter<SgAutoCompleteOption>()
  @Output() readonly blurEvent = new EventEmitter<void>()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)
  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-autocomplete',
      `sg-autocomplete-${this.resolvedSize()}`,
      this.loading ? 'sg-autocomplete-loading' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly filtered = computed(() => {
    const q = this.currentValue().toLowerCase()
    return this.options.filter((o) => o.label.toLowerCase().includes(q))
  })

  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
    this.searchChange.emit(v)
    this.open.set(true)
  }

  select(opt: SgAutoCompleteOption): void {
    if (this._value() === undefined) this._internal.set(opt.value)
    this.valueChange.emit(opt.value)
    this.optionSelect.emit(opt)
    this.open.set(false)
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this.open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this.open.set(false)
  }
}
