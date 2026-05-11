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
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

/**
 * Attribute-selector slider, DOM-equivalent of
 * `packages/react/src/components/ui/Slider.tsx`.
 *
 * Use as `<div sg-slider [(value)]="x" [min]="0" [max]="100"></div>`.
 */
@Component({
  selector: 'div[sg-slider]',
  standalone: true,
  template: `
    <div [class]="trackClass()" #track (mousedown)="onTrackMouseDown($event)">
      <div [class]="fillClass()" [style.width.%]="percent()"></div>
      <div
        [class]="handleClass()"
        [style.left.%]="percent()"
        role="slider"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        [attr.aria-valuenow]="currentValue()"
        [attr.aria-disabled]="isInteractiveDisabled()"
        [attr.tabindex]="isInteractiveDisabled() ? -1 : 0"
        (keydown)="onKeyDown($event)"
      ></div>
    </div>
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSliderComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<number | undefined>(undefined)
  private readonly _internal = signal<number>(0)
  private readonly _disabled = signal<boolean>(false)
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

  @ViewChild('track') trackRef?: ElementRef<HTMLDivElement>

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

  @Input({ transform: numberAttribute }) min = 0
  @Input({ transform: numberAttribute }) max = 100
  @Input({ transform: numberAttribute }) step = 1

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
  readonly percent = computed(() => {
    const v = this.currentValue()
    return ((v - this.min) / (this.max - this.min)) * 100
  })

  readonly isInteractiveDisabled = computed(() => this._disabled() || (this.cfg.disabled ?? false))

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    return [
      'sg-slider',
      this.isInteractiveDisabled() ? 'sg-slider-disabled' : '',
      this._className(),
    ]
      .filter(Boolean)
      .join(' ')
  })

  trackClass(): string {
    return this._unstyled() ? '' : 'sg-slider-track'
  }
  fillClass(): string {
    return this._unstyled() ? '' : 'sg-slider-fill'
  }
  handleClass(): string {
    return this._unstyled() ? '' : 'sg-slider-handle'
  }

  onTrackMouseDown(event: MouseEvent): void {
    if (this.isInteractiveDisabled()) return
    this.updateFromX(event.clientX)
    const move = (e: MouseEvent) => this.updateFromX(e.clientX)
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.isInteractiveDisabled()) return
    const cur = this.currentValue()
    let next = cur
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      next = Math.min(this.max, cur + this.step)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      next = Math.max(this.min, cur - this.step)
    }
    if (next !== cur) this.commit(next)
  }

  private updateFromX(clientX: number): void {
    const el = this.trackRef?.nativeElement
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const raw = this.min + ratio * (this.max - this.min)
    const stepped = Math.round(raw / this.step) * this.step
    const clamped = Math.max(this.min, Math.min(this.max, stepped))
    this.commit(clamped)
  }

  private commit(v: number): void {
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }
}
