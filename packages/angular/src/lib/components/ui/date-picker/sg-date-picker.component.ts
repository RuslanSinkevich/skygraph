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

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface DayCell {
  date: Date
  day: number
  inMonth: boolean
  iso: string
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date | null, fmt: string): string {
  if (!d) return ''
  return fmt
    .replace('YYYY', String(d.getFullYear()))
    .replace('MM', pad2(d.getMonth() + 1))
    .replace('DD', pad2(d.getDate()))
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getMonthGrid(year: number, month: number): DayCell[][] {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = new Date(year, month, 1).getDay()
  const prevDays = getDaysInMonth(year, month - 1)
  const cells: DayCell[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevDays - i)
    cells.push({ date, day: prevDays - i, inMonth: false, iso: date.toISOString() })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    cells.push({ date, day: d, inMonth: true, iso: date.toISOString() })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d)
    cells.push({ date, day: d, inMonth: false, iso: date.toISOString() })
  }
  const weeks: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

/**
 * Attribute-selector date picker, DOM-equivalent of
 * `packages/react/src/components/ui/DatePicker.tsx` (single-date subset).
 *
 * Use as `<div sg-date-picker [(value)]="date"></div>`.
 *
 * Wave 4.2 ships single-date selection with month / year navigation and
 * clear. Time panel, presets, range picker, and disabled-date
 * predicates are deferred to 4.3 (see findings F-DatePicker-Limited).
 */
@Component({
  selector: 'div[sg-date-picker]',
  standalone: true,
  template: `
    <div class="sg-datepicker-input" (click)="toggleOpen()">
      <span
        [class]="
          display()
            ? 'sg-datepicker-input-text'
            : 'sg-datepicker-input-text sg-datepicker-placeholder'
        "
      >
        {{ display() || placeholder }}
      </span>
      <span class="sg-datepicker-suffix">
        @if (allowClear && currentValue()) {
          <span class="sg-datepicker-clear" (click)="clear($event)">×</span>
        }
        <svg
          class="sg-datepicker-icon"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="currentColor"
        >
          <path
            d="M11 1V0h1v1h2.5A1.5 1.5 0 0116 2.5v12a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 14.5v-12A1.5 1.5 0 011.5 1H4V0h1v1h6zM1.5 2a.5.5 0 00-.5.5V4h14V2.5a.5.5 0 00-.5-.5h-13zM15 5H1v9.5a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V5z"
          />
        </svg>
      </span>
    </div>
    @if (open()) {
      <div class="sg-dp-dropdown sg-dp-dropdown-bottomLeft">
        <div class="sg-dp-dropdown-inner">
          <div class="sg-dp-content">
            <div class="sg-dp-panel">
              <div class="sg-dp-panel-header">
                <button
                  class="sg-dp-nav-btn"
                  (click)="addYear(-1)"
                  [attr.aria-label]="prevYearLabel()"
                >
                  «
                </button>
                <button
                  class="sg-dp-nav-btn"
                  (click)="addMonth(-1)"
                  [attr.aria-label]="prevMonthLabel()"
                >
                  ‹
                </button>
                <span class="sg-dp-panel-title">{{ monthName() }} {{ viewYear() }}</span>
                <button
                  class="sg-dp-nav-btn"
                  (click)="addMonth(1)"
                  [attr.aria-label]="nextMonthLabel()"
                >
                  ›
                </button>
                <button
                  class="sg-dp-nav-btn"
                  (click)="addYear(1)"
                  [attr.aria-label]="nextYearLabel()"
                >
                  »
                </button>
              </div>
              <table class="sg-dp-table">
                <thead>
                  <tr>
                    @for (n of dayNames(); track n) {
                      <th class="sg-dp-th">{{ n }}</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  @for (week of weeks(); let wi = $index; track wi) {
                    <tr>
                      @for (cell of week; track cell.iso) {
                        <td [class]="cellClass(cell)" (click)="select(cell)">
                          <span class="sg-dp-cell-inner">{{ cell.day }}</span>
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <div class="sg-dp-footer">
              <div class="sg-dp-footer-start">
                <button class="sg-dp-footer-btn sg-dp-today-btn" (click)="today()">
                  {{ todayLabel() }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgDatePickerComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)

  protected readonly _open = signal(false)
  protected readonly _internal = signal<Date | null>(null)
  protected readonly _ctrl = signal<Date | null | undefined>(undefined)
  protected readonly _viewYear = signal<number>(new Date().getFullYear())
  protected readonly _viewMonth = signal<number>(new Date().getMonth())
  protected readonly _disabled = signal<boolean | undefined>(undefined)
  protected readonly _size = signal<SizeType | undefined>(undefined)

  @Input() placeholder = 'Select date'
  @Input() format = 'YYYY-MM-DD'
  @Input({ transform: booleanAttribute }) allowClear = true

  @Input()
  get value(): Date | null {
    return this._ctrl() ?? this._internal()
  }
  set value(v: Date | null | undefined) {
    this._ctrl.set(v)
    if (v) {
      this._internal.set(v)
      this._viewYear.set(v.getFullYear())
      this._viewMonth.set(v.getMonth())
    }
  }
  @Input()
  set defaultValue(v: Date | null | undefined) {
    if (this._ctrl() === undefined && v) {
      this._internal.set(v)
      this._viewYear.set(v.getFullYear())
      this._viewMonth.set(v.getMonth())
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

  @Output() readonly valueChange = new EventEmitter<Date | null>()

  readonly open = this._open.asReadonly()
  readonly viewYear = this._viewYear.asReadonly()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-datepicker',
      `sg-datepicker-${this.resolvedSize()}`,
      this._open() ? 'sg-datepicker-open' : '',
      this.resolvedDisabled() ? 'sg-datepicker-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly currentValue = computed(() => this._ctrl() ?? this._internal())

  readonly display = computed(() => formatDate(this.currentValue(), this.format))

  readonly weeks = computed(() => getMonthGrid(this._viewYear(), this._viewMonth()))

  readonly monthName = computed(() => {
    const names = this.cfg.locale?.calendar?.monthNames ?? MONTH_NAMES
    return names[this._viewMonth()]
  })

  readonly dayNames = computed(() => this.cfg.locale?.calendar?.dayNames ?? DAY_NAMES)

  readonly todayLabel = computed(() => this.cfg.locale?.calendar?.today ?? 'Today')

  readonly prevYearLabel = computed(() => this.cfg.locale?.datePicker?.prevYear ?? 'Previous year')
  readonly nextYearLabel = computed(() => this.cfg.locale?.datePicker?.nextYear ?? 'Next year')
  readonly prevMonthLabel = computed(
    () => this.cfg.locale?.datePicker?.prevMonth ?? 'Previous month',
  )
  readonly nextMonthLabel = computed(() => this.cfg.locale?.datePicker?.nextMonth ?? 'Next month')

  cellClass(cell: DayCell): string {
    const sel = this.currentValue()
    return [
      'sg-dp-cell',
      !cell.inMonth ? 'sg-dp-cell-outside' : '',
      sel && isSameDay(sel, cell.date) ? 'sg-dp-cell-selected' : '',
      isSameDay(cell.date, new Date()) ? 'sg-dp-cell-today' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  toggleOpen(): void {
    if (this.resolvedDisabled()) return
    this._open.update((v) => !v)
  }

  addMonth(d: number): void {
    let m = this._viewMonth() + d
    let y = this._viewYear()
    if (m < 0) {
      m = 11
      y -= 1
    } else if (m > 11) {
      m = 0
      y += 1
    }
    this._viewMonth.set(m)
    this._viewYear.set(y)
  }

  addYear(d: number): void {
    this._viewYear.update((v) => v + d)
  }

  select(cell: DayCell): void {
    if (this._ctrl() === undefined) this._internal.set(cell.date)
    this.valueChange.emit(cell.date)
    this._open.set(false)
  }

  today(): void {
    const d = new Date()
    if (this._ctrl() === undefined) {
      this._internal.set(d)
      this._viewYear.set(d.getFullYear())
      this._viewMonth.set(d.getMonth())
    }
    this.valueChange.emit(d)
    this._open.set(false)
  }

  clear(e: MouseEvent): void {
    e.stopPropagation()
    if (this.resolvedDisabled()) return
    if (this._ctrl() === undefined) this._internal.set(null)
    this.valueChange.emit(null)
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
