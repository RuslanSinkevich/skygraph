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

/**
 * Attribute-selector single-line input, DOM-equivalent of
 * `packages/react/src/components/ui/Input.tsx`.
 *
 * Use as `<span sg-input [(value)]="v" placeholder="…"></span>`.
 *
 * The host `<span>` becomes the `sg-input-wrapper` and renders an inner
 * `<input class="sg-input">` plus an inline spinner when loading.
 */
@Component({
  selector: 'span[sg-input]',
  standalone: true,
  template: `
    <input
      [id]="id || null"
      [type]="type"
      [class]="inputClass()"
      [value]="currentValue()"
      [placeholder]="placeholder || null"
      [disabled]="isInteractiveDisabled()"
      [readOnly]="readOnly"
      [attr.aria-invalid]="ariaInvalid"
      [attr.aria-required]="ariaRequired"
      [attr.aria-readonly]="readOnly || null"
      [attr.aria-describedby]="ariaDescribedBy"
      (input)="handleInput($event)"
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
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgInputComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _readOnly = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

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

  @Input() placeholder?: string
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text'
  @Input() id?: string

  @Input({ transform: booleanAttribute })
  get readOnly(): boolean {
    return this._readOnly()
  }
  set readOnly(v: boolean) {
    this._readOnly.set(v)
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

  @Input('aria-invalid') ariaInvalid?: boolean | string
  @Input('aria-required') ariaRequired?: boolean | string
  @Input('aria-describedby') ariaDescribedBy?: string

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly sgBlur = new EventEmitter<void>()
  @Output() readonly sgFocus = new EventEmitter<void>()

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    const parts = [
      'sg-input-wrapper',
      `sg-input-wrapper-${this.resolvedSize()}`,
      this._loading() ? 'sg-input-wrapper-loading' : '',
      this._readOnly() ? 'sg-input-wrapper-readonly' : '',
      this._className(),
    ]
    return parts.filter(Boolean).join(' ')
  })

  inputClass(): string {
    if (this._unstyled()) return ''
    return [
      'sg-input',
      `sg-input-${this.resolvedSize()}`,
      this._readOnly() ? 'sg-input-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  handleInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }
}
