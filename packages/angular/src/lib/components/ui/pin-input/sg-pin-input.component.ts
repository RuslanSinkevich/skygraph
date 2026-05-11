import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  booleanAttribute,
  computed,
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/**
 * PIN / OTP input, DOM-equivalent of
 * `packages/react/src/components/ui/PinInput.tsx`.
 *
 * Use as `<div sg-pin-input length="6" [(value)]="otp"></div>`.
 */
@Component({
  selector: 'div[sg-pin-input]',
  standalone: true,
  template: `
    @for (i of indexes(); track i) {
      <input
        #cell
        [class]="cellClass(i)"
        [type]="mask ? 'password' : 'text'"
        [attr.inputmode]="type === 'numeric' ? 'numeric' : 'text'"
        maxlength="1"
        [placeholder]="placeholder"
        [value]="cellValue(i)"
        [disabled]="isInteractiveDisabled()"
        (input)="handleInput(i, $event)"
        (keydown)="handleKeyDown(i, $event)"
        (paste)="handlePaste($event)"
        (focus)="handleFocus($event)"
      />
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'group',
    '[attr.aria-label]': 'ariaLabel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgPinInputComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)

  @ViewChildren('cell') cells?: QueryList<ElementRef<HTMLInputElement>>

  @Input({ transform: numberAttribute }) length = 6
  @Input({ transform: booleanAttribute }) mask = false
  @Input() type: 'numeric' | 'alphanumeric' = 'numeric'
  @Input() placeholder = '○'
  @Input('aria-label') ariaLabel = 'PIN input'

  @Input()
  get value(): string {
    return this._value() ?? this._internal()
  }
  set value(v: string) {
    this._value.set(v)
    this._internal.set(this.pad(v ?? ''))
  }
  @Input()
  set defaultValue(v: string) {
    if (this._value() === undefined) this._internal.set(this.pad(v ?? ''))
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
  @Output() readonly complete = new EventEmitter<string>()

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() =>
    [
      'sg-pin-input',
      `sg-pin-input-${this.resolvedSize()}`,
      this.isInteractiveDisabled() ? 'sg-pin-input-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  indexes(): number[] {
    return Array.from({ length: this.length }, (_, i) => i)
  }

  cellValue(i: number): string {
    const v = this.current()[i]
    return v === ' ' || v === undefined ? '' : v
  }

  cellClass(i: number): string {
    const v = this.current()[i]
    const filled = v !== ' ' && v !== undefined
    return [
      'sg-pin-input-cell',
      `sg-pin-input-cell-${this.resolvedSize()}`,
      filled ? 'sg-pin-input-cell-filled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  private current(): string {
    const v = this._value()
    return v !== undefined ? this.pad(v) : this._internal()
  }

  private pad(s: string): string {
    return (s ?? '').padEnd(this.length, ' ').slice(0, this.length)
  }

  private get pattern(): RegExp {
    return this.type === 'numeric' ? /^\d$/ : /^[a-zA-Z0-9]$/
  }

  handleInput(i: number, event: Event): void {
    const ch = (event.target as HTMLInputElement).value
    if (!this.pattern.test(ch)) {
      // Reset cell to its previous value to avoid invalid keys leaking through.
      ;(event.target as HTMLInputElement).value = this.cellValue(i)
      return
    }
    const arr = this.current().split('')
    arr[i] = ch
    this.commit(arr.join(''))
    this.focusAt(i + 1)
  }

  handleKeyDown(i: number, e: KeyboardEvent): void {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const arr = this.current().split('')
      if (arr[i] !== ' ') {
        arr[i] = ' '
        this.commit(arr.join(''))
      } else {
        this.focusAt(i - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      this.focusAt(i - 1)
    } else if (e.key === 'ArrowRight') {
      this.focusAt(i + 1)
    }
  }

  handlePaste(e: ClipboardEvent): void {
    e.preventDefault()
    const pasted = e.clipboardData?.getData('text').slice(0, this.length) ?? ''
    const arr = this.current().split('')
    let cursor = 0
    for (const ch of pasted) {
      if (this.pattern.test(ch) && cursor < this.length) {
        arr[cursor] = ch
        cursor++
      }
    }
    this.commit(arr.join(''))
    this.focusAt(Math.min(cursor, this.length - 1))
  }

  handleFocus(e: FocusEvent): void {
    ;(e.target as HTMLInputElement).select()
  }

  private commit(v: string): void {
    if (this._value() === undefined) this._internal.set(v)
    const trimmed = v.replace(/\s/g, '')
    this.valueChange.emit(trimmed)
    if (trimmed.length === this.length) this.complete.emit(trimmed)
  }

  private focusAt(i: number): void {
    if (i >= 0 && i < this.length) {
      const cells = this.cells?.toArray() ?? []
      cells[i]?.nativeElement.focus()
    }
  }
}
