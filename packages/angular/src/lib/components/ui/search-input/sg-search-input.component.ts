import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/**
 * Attribute-selector search input, DOM-equivalent of
 * `packages/react/src/components/ui/SearchInput.tsx`.
 *
 * Use as `<span sg-search-input [(value)]="q" enterButton="Search"></span>`.
 */
@Component({
  selector: 'span[sg-search-input]',
  standalone: true,
  template: `
    <span class="sg-search-input-icon">⌕</span>
    <input
      #input
      type="text"
      [class]="inputClass()"
      [value]="currentValue()"
      [placeholder]="placeholder"
      [disabled]="isInteractiveDisabled()"
      (input)="handleInput($event)"
      (keydown.enter)="handleSearch()"
      (blur)="sgBlur.emit()"
      (focus)="sgFocus.emit()"
    />
    @if (loading) {
      <span
        class="sg-spin sg-spin-small"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      ></span>
    }
    @if (allowClear && currentValue() && !loading) {
      <button
        type="button"
        class="sg-search-input-clear"
        tabindex="-1"
        [attr.aria-label]="clearLabel()"
        (click)="handleClear()"
      >
        ×
      </button>
    }
    @if (enterButton) {
      <button
        type="button"
        class="sg-search-input-btn"
        [disabled]="isInteractiveDisabled()"
        (click)="handleSearch()"
      >
        {{ enterButtonLabel() }}
      </button>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSearchInputComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>

  @Input() placeholder = 'Search...'
  @Input({ transform: booleanAttribute }) allowClear = true
  /** `true` for default label, string for custom; `false` to hide. */
  @Input() enterButton: boolean | string = false

  @Input()
  get value(): string {
    return this._value() ?? this._internal()
  }
  set value(v: string) {
    this._value.set(v)
    this._internal.set(v ?? '')
  }
  @Input()
  set defaultValue(v: string) {
    if (this._value() === undefined) this._internal.set(v ?? '')
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled()
  }
  set disabled(v: boolean) {
    this._disabled.set(v)
  }

  @Input({ transform: booleanAttribute })
  get loading(): boolean {
    return this._loading()
  }
  set loading(v: boolean) {
    this._loading.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly search = new EventEmitter<string>()
  @Output() readonly sgBlur = new EventEmitter<void>()
  @Output() readonly sgFocus = new EventEmitter<void>()

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() => {
    const parts = [
      'sg-search-input',
      `sg-search-input-${this.resolvedSize()}`,
      this.enterButton ? 'sg-search-input-with-button' : '',
      this._loading() ? 'sg-search-input-loading' : '',
      this._disabled() || this.cfg.disabled ? 'sg-search-input-disabled' : '',
    ]
    return parts.filter(Boolean).join(' ')
  })

  readonly clearLabel = computed(() => this.cfg.locale?.searchInput?.clear ?? 'Clear')

  inputClass(): string {
    return ['sg-input', `sg-input-${this.resolvedSize()}`, 'sg-search-input-field'].join(' ')
  }

  enterButtonLabel(): string {
    return typeof this.enterButton === 'string' ? this.enterButton : '⌕'
  }

  handleInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }

  handleSearch(): void {
    if (this.isInteractiveDisabled()) return
    this.search.emit(this.currentValue())
  }

  handleClear(): void {
    if (this._value() === undefined) this._internal.set('')
    this.valueChange.emit('')
    this.search.emit('')
    this.inputRef?.nativeElement.focus()
  }
}
