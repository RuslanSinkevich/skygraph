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

/**
 * Attribute-selector star rating, DOM-equivalent of
 * `packages/react/src/components/ui/Rate.tsx`.
 *
 * Use as `<div sg-rate [(value)]="r" [count]="5" allowHalf></div>`.
 */
@Component({
  selector: 'div[sg-rate]',
  standalone: true,
  template: `
    @for (i of indexes(); track i) {
      <span
        [class]="starClass(i + 1)"
        role="radio"
        [attr.aria-checked]="displayValue() >= i + 1"
        [attr.aria-label]="starLabel()(i + 1)"
        [attr.tabindex]="isInteractiveDisabled() ? -1 : 0"
        (click)="onStarClick($event, i + 1)"
        (keydown)="onKeyDown($event, i + 1)"
        (mousemove)="onStarHover($event, i + 1)"
        (mouseleave)="onMouseLeave()"
        >{{ character }}</span
      >
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'radiogroup',
    '[attr.aria-label]': 'ariaLabel()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgRateComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<number | undefined>(undefined)
  private readonly _internal = signal<number>(0)
  private readonly _hover = signal<number | null>(null)
  private readonly _disabled = signal<boolean>(false)
  private readonly _unstyled = signal<boolean>(false)
  private readonly _allowHalf = signal<boolean>(false)
  private readonly _className = signal<string>('')

  @Input({ transform: numberAttribute })
  get value(): number {
    return this._value() ?? this._internal()
  }
  set value(v: number) {
    this._value.set(v)
    this._internal.set(v)
  }
  @Input({ transform: numberAttribute })
  set defaultValue(v: number) {
    if (this._value() === undefined) this._internal.set(v ?? 0)
  }

  @Input({ transform: numberAttribute }) count = 5
  @Input() character = '★'

  @Input({ transform: booleanAttribute })
  get allowHalf(): boolean {
    return this._allowHalf()
  }
  set allowHalf(v: boolean) {
    this._allowHalf.set(v)
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled()
  }
  set disabled(v: boolean) {
    this._disabled.set(v)
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

  @Output() readonly valueChange = new EventEmitter<number>()

  readonly currentValue = computed(() => this._value() ?? this._internal())
  readonly displayValue = computed(() => this._hover() ?? this.currentValue())

  readonly isInteractiveDisabled = computed(() => this._disabled() || (this.cfg.disabled ?? false))

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    return ['sg-rate', this.isInteractiveDisabled() ? 'sg-rate-disabled' : '', this._className()]
      .filter(Boolean)
      .join(' ')
  })

  readonly ariaLabel = computed(() => this.cfg.locale?.rate?.ariaLabel ?? 'Rating')

  readonly starLabel = computed(
    () => this.cfg.locale?.rate?.star ?? ((n: number) => `${n} star${n > 1 ? 's' : ''}`),
  )

  indexes(): number[] {
    return Array.from({ length: this.count }, (_, i) => i)
  }

  starClass(starIndex: number): string {
    if (this._unstyled()) return ''
    const v = this.displayValue()
    const isFull = v >= starIndex
    const isHalf = this._allowHalf() && v >= starIndex - 0.5 && v < starIndex
    const parts = [
      'sg-rate-star',
      isFull ? 'sg-rate-star-full' : '',
      isHalf ? 'sg-rate-star-half' : '',
    ]
    return parts.filter(Boolean).join(' ')
  }

  onStarClick(event: MouseEvent, starIndex: number): void {
    if (this.isInteractiveDisabled()) return
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    let next: number
    if (this._allowHalf()) {
      const isLeft = event.clientX - rect.left < rect.width / 2
      next = isLeft ? starIndex - 0.5 : starIndex
    } else {
      next = starIndex
    }
    this.commit(this.currentValue() === next ? 0 : next)
  }

  onStarHover(event: MouseEvent, starIndex: number): void {
    if (this.isInteractiveDisabled()) return
    if (!this._allowHalf()) {
      this._hover.set(starIndex)
      return
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const isLeft = event.clientX - rect.left < rect.width / 2
    this._hover.set(isLeft ? starIndex - 0.5 : starIndex)
  }

  onMouseLeave(): void {
    if (this.isInteractiveDisabled()) return
    this._hover.set(null)
  }

  onKeyDown(event: KeyboardEvent, _starIndex: number): void {
    if (this.isInteractiveDisabled()) return
    const cur = this.currentValue()
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      const next = Math.min(this.count, this._allowHalf() ? cur + 0.5 : cur + 1)
      this.commit(next === cur ? 0 : next)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      const next = Math.max(0, this._allowHalf() ? cur - 0.5 : cur - 1)
      this.commit(next === cur ? 0 : next)
    }
  }

  private commit(v: number): void {
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }
}
