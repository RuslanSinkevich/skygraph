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

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatTime(h: number, m: number, s: number, fmt: string): string {
  return fmt.replace('HH', pad2(h)).replace('mm', pad2(m)).replace('ss', pad2(s))
}

function parseTime(str: string): { h: number; m: number; s: number } | null {
  if (!str) return null
  const parts = str.split(':').map(Number)
  if (parts.some(isNaN)) return null
  return { h: parts[0] ?? 0, m: parts[1] ?? 0, s: parts[2] ?? 0 }
}

/**
 * Attribute-selector time picker, DOM-equivalent of
 * `packages/react/src/components/ui/TimePicker.tsx` (24-hour subset).
 *
 * Use as `<div sg-time-picker [(value)]="time"></div>`.
 *
 * Wave 4.2 ships 24-hour mode with optional seconds and Now / Clear.
 * 12-hour mode and disabled-slot predicates are deferred to 4.3 (see
 * findings F-TimePicker-Limited).
 */
@Component({
  selector: 'div[sg-time-picker]',
  standalone: true,
  template: `
    <div
      class="sg-timepicker-input"
      role="combobox"
      aria-haspopup="dialog"
      [attr.aria-expanded]="open()"
      [attr.aria-disabled]="resolvedDisabled()"
      (click)="toggleOpen()"
    >
      <span [class]="currentValue() ? '' : 'sg-timepicker-placeholder'">
        {{ currentValue() || placeholder }}
      </span>
      <span class="sg-timepicker-suffix">
        @if (allowClear && currentValue()) {
          <span class="sg-timepicker-clear" (click)="clear($event)">×</span>
        }
        <svg
          class="sg-timepicker-icon-svg"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="currentColor"
        >
          <path
            d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1a7 7 0 100 14A7 7 0 008 1zm.5 3v4.5l3 1.5-.5 1-3.5-1.75V4h1z"
          />
        </svg>
      </span>
    </div>
    @if (open()) {
      <div class="sg-tp-dropdown">
        <div class="sg-tp-columns">
          <div class="sg-tp-col">
            @for (h of hours(); track h) {
              <div
                [attr.data-active]="h === hour()"
                [class]="cellClass(h === hour())"
                (click)="setHour(h)"
              >
                {{ pad(h) }}
              </div>
            }
          </div>
          <div class="sg-tp-col">
            @for (m of minutes(); track m) {
              <div
                [attr.data-active]="m === minute()"
                [class]="cellClass(m === minute())"
                (click)="setMinute(m)"
              >
                {{ pad(m) }}
              </div>
            }
          </div>
          @if (showSecond) {
            <div class="sg-tp-col">
              @for (s of seconds(); track s) {
                <div
                  [attr.data-active]="s === second()"
                  [class]="cellClass(s === second())"
                  (click)="setSecond(s)"
                >
                  {{ pad(s) }}
                </div>
              }
            </div>
          }
        </div>
        @if (showNow) {
          <div class="sg-tp-footer">
            <button class="sg-tp-now-btn" (click)="now()">{{ nowLabel() }}</button>
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
export class SgTimePickerComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)

  protected readonly _open = signal(false)
  protected readonly _internal = signal<string>('')
  protected readonly _ctrl = signal<string | undefined>(undefined)
  protected readonly _hour = signal(0)
  protected readonly _minute = signal(0)
  protected readonly _second = signal(0)
  protected readonly _disabled = signal<boolean | undefined>(undefined)
  protected readonly _size = signal<SizeType | undefined>(undefined)

  @Input() placeholder = 'Select time'
  @Input() format?: string
  @Input() hourStep = 1
  @Input() minuteStep = 1
  @Input() secondStep = 1
  @Input({ transform: booleanAttribute }) showSecond = true
  @Input({ transform: booleanAttribute }) showNow = true
  @Input({ transform: booleanAttribute }) allowClear = true

  @Input()
  get value(): string {
    return this._ctrl() ?? this._internal()
  }
  set value(v: string) {
    this._ctrl.set(v)
    if (v !== undefined && v !== null) {
      this._internal.set(v)
      const p = parseTime(v)
      if (p) {
        this._hour.set(p.h)
        this._minute.set(p.m)
        this._second.set(p.s)
      }
    }
  }
  @Input()
  set defaultValue(v: string) {
    if (this._ctrl() === undefined) {
      this._internal.set(v ?? '')
      const p = parseTime(v)
      if (p) {
        this._hour.set(p.h)
        this._minute.set(p.m)
        this._second.set(p.s)
      }
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

  @Output() readonly valueChange = new EventEmitter<string>()

  readonly open = this._open.asReadonly()
  readonly hour = this._hour.asReadonly()
  readonly minute = this._minute.asReadonly()
  readonly second = this._second.asReadonly()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-timepicker',
      `sg-timepicker-${this.resolvedSize()}`,
      this._open() ? 'sg-timepicker-open' : '',
      this.resolvedDisabled() ? 'sg-timepicker-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly currentValue = computed(() => this._ctrl() ?? this._internal())

  readonly nowLabel = computed(() => this.cfg.locale?.calendar?.now ?? 'Now')

  readonly fmt = computed(() => this.format ?? (this.showSecond ? 'HH:mm:ss' : 'HH:mm'))

  readonly hours = computed(() => {
    const arr: number[] = []
    for (let i = 0; i < 24; i += this.hourStep) arr.push(i)
    return arr
  })
  readonly minutes = computed(() => {
    const arr: number[] = []
    for (let i = 0; i < 60; i += this.minuteStep) arr.push(i)
    return arr
  })
  readonly seconds = computed(() => {
    const arr: number[] = []
    for (let i = 0; i < 60; i += this.secondStep) arr.push(i)
    return arr
  })

  pad(n: number): string {
    return pad2(n)
  }

  cellClass(active: boolean): string {
    return ['sg-tp-cell', active ? 'sg-tp-cell-active' : ''].filter(Boolean).join(' ')
  }

  toggleOpen(): void {
    if (this.resolvedDisabled()) return
    this._open.update((v) => !v)
  }

  setHour(h: number): void {
    this._hour.set(h)
    this.commit()
  }
  setMinute(m: number): void {
    this._minute.set(m)
    this.commit()
  }
  setSecond(s: number): void {
    this._second.set(s)
    this.commit()
  }

  now(): void {
    const d = new Date()
    this._hour.set(d.getHours())
    this._minute.set(d.getMinutes())
    this._second.set(d.getSeconds())
    this.commit()
    this._open.set(false)
  }

  clear(e: MouseEvent): void {
    e.stopPropagation()
    if (this.resolvedDisabled()) return
    if (this._ctrl() === undefined) this._internal.set('')
    this.valueChange.emit('')
  }

  protected commit(): void {
    const str = formatTime(this._hour(), this._minute(), this._second(), this.fmt())
    if (this._ctrl() === undefined) this._internal.set(str)
    this.valueChange.emit(str)
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
