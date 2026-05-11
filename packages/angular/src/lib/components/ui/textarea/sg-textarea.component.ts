import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/**
 * Attribute-selector multiline input, DOM-equivalent of
 * `packages/react/src/components/ui/Textarea.tsx`.
 *
 * Use as `<div sg-textarea [(value)]="v" rows="6" maxLength="200" showCount></div>`.
 */
@Component({
  selector: 'div[sg-textarea]',
  standalone: true,
  template: `
    <textarea
      [id]="id || null"
      class="sg-input sg-textarea"
      [value]="currentValue()"
      [placeholder]="placeholder || null"
      [rows]="rows"
      [disabled]="isInteractiveDisabled()"
      [attr.aria-disabled]="isInteractiveDisabled()"
      [attr.aria-invalid]="ariaInvalid"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-required]="ariaRequired"
      (input)="handleInput($event)"
      (blur)="sgBlur.emit()"
      (focus)="sgFocus.emit()"
    ></textarea>
    @if (loading) {
      <span
        class="sg-spin sg-spin-small"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      ></span>
    }
    @if (showCount) {
      <span class="sg-textarea-count">
        {{ currentValue().length }}{{ maxLength != null ? ' / ' + maxLength : '' }}
      </span>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTextareaComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)

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
  @Input({ transform: numberAttribute }) rows = 4
  @Input({ transform: numberAttribute }) maxLength?: number
  @Input({ transform: booleanAttribute }) showCount = false
  @Input() id?: string

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

  @Input('aria-invalid') ariaInvalid?: boolean | string
  @Input('aria-describedby') ariaDescribedBy?: string
  @Input('aria-required') ariaRequired?: boolean | string

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly sgBlur = new EventEmitter<void>()
  @Output() readonly sgFocus = new EventEmitter<void>()

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() => {
    const parts = [
      'sg-textarea-wrapper',
      `sg-textarea-${this.resolvedSize()}`,
      this._loading() ? 'sg-textarea-wrapper-loading' : '',
    ]
    return parts.filter(Boolean).join(' ')
  })

  handleInput(event: Event): void {
    const v = (event.target as HTMLTextAreaElement).value
    if (this.maxLength && v.length > this.maxLength) return
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }
}
