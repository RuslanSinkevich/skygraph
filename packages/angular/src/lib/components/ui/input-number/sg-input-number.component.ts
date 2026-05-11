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
 * Attribute-selector numeric input, DOM-equivalent of
 * `packages/react/src/components/ui/InputNumber.tsx`.
 *
 * Use as `<span sg-input-number [(value)]="n" [min]="0" [max]="10"></span>`.
 */
@Component({
  selector: 'span[sg-input-number]',
  standalone: true,
  template: `
    <button
      class="sg-input-number-btn sg-input-number-minus"
      [disabled]="isInteractiveDisabled() || isAtMin()"
      tabindex="-1"
      (click)="decrement()"
    >
      −
    </button>
    <input
      type="text"
      inputmode="numeric"
      role="spinbutton"
      class="sg-input-number-input"
      [value]="displayValue()"
      [placeholder]="placeholder || null"
      [disabled]="isInteractiveDisabled()"
      [attr.aria-valuemin]="min ?? null"
      [attr.aria-valuemax]="max ?? null"
      [attr.aria-valuenow]="currentValue() ?? null"
      (input)="handleInput($event)"
      (blur)="sgBlur.emit()"
    />
    <button
      class="sg-input-number-btn sg-input-number-plus"
      [disabled]="isInteractiveDisabled() || isAtMax()"
      tabindex="-1"
      (click)="increment()"
    >
      +
    </button>
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
export class SgInputNumberComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<number | null | undefined>(undefined)
  private readonly _internal = signal<number | null>(null)
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input()
  get value(): number | null | undefined {
    return this._value()
  }
  set value(v: number | null | undefined) {
    this._value.set(v)
    if (v !== undefined) this._internal.set(v)
  }
  @Input()
  set defaultValue(v: number | null | undefined) {
    if (this._value() === undefined) this._internal.set(v ?? null)
  }

  @Input({ transform: (v: unknown) => (v == null || v === '' ? undefined : Number(v)) })
  min?: number
  @Input({ transform: (v: unknown) => (v == null || v === '' ? undefined : Number(v)) })
  max?: number
  @Input({ transform: numberAttribute }) step = 1
  @Input({ transform: numberAttribute }) precision?: number
  @Input() placeholder?: string

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

  @Output() readonly valueChange = new EventEmitter<number | null>()
  @Output() readonly sgBlur = new EventEmitter<void>()

  readonly currentValue = computed(() => this._value() ?? this._internal())
  readonly displayValue = computed(() => {
    const v = this.currentValue()
    return v === null || v === undefined ? '' : String(v)
  })

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  isAtMin(): boolean {
    return this.min !== undefined && (this.currentValue() ?? 0) <= this.min
  }
  isAtMax(): boolean {
    return this.max !== undefined && (this.currentValue() ?? 0) >= this.max
  }

  readonly classes = computed(() => {
    const parts = [
      'sg-input-number',
      `sg-input-number-${this.resolvedSize()}`,
      this._loading() ? 'sg-input-number-loading' : '',
    ]
    return parts.filter(Boolean).join(' ')
  })

  private clamp(v: number): number {
    let r = v
    if (this.min !== undefined && r < this.min) r = this.min
    if (this.max !== undefined && r > this.max) r = this.max
    if (this.precision !== undefined) r = Number(r.toFixed(this.precision))
    return r
  }

  private commit(v: number | null): void {
    const next = v === null ? null : this.clamp(v)
    if (this._value() === undefined) this._internal.set(next)
    this.valueChange.emit(next)
  }

  handleInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value
    if (raw === '' || raw === '-') {
      this.commit(null)
      return
    }
    const n = Number(raw)
    if (!isNaN(n)) this.commit(n)
  }

  increment(): void {
    if (this.isInteractiveDisabled()) return
    this.commit((this.currentValue() ?? 0) + this.step)
  }

  decrement(): void {
    if (this.isInteractiveDisabled()) return
    this.commit((this.currentValue() ?? 0) - this.step)
  }
}
