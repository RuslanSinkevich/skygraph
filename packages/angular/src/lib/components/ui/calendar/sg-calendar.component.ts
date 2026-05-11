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

const DEFAULT_MONTH_NAMES = [
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
const DEFAULT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

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

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getMonthGrid(year: number, month: number, weekStartDay: number): DayCell[][] {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayRaw = new Date(year, month, 1).getDay()
  const firstDay = (firstDayRaw - weekStartDay + 7) % 7
  const prevMonthDays = getDaysInMonth(year, month - 1)
  const cells: DayCell[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const date = new Date(year, month - 1, day)
    cells.push({ date, day, inMonth: false, iso: date.toISOString() })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    cells.push({ date, day, inMonth: true, iso: date.toISOString() })
  }
  const remaining = 42 - cells.length
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(year, month + 1, day)
    cells.push({ date, day, inMonth: false, iso: date.toISOString() })
  }
  const weeks: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

/**
 * Attribute-selector calendar, DOM-equivalent of
 * `packages/react/src/components/complex/Calendar/Calendar.tsx` (basic
 * month-view subset).
 *
 * Use as `<div sg-calendar [(value)]="date"></div>`.
 *
 * Wave 4.2 ships single-date month view with prev / next / today.
 * Year mode, range selection, multi-select, event markers, week numbers,
 * keyboard navigation, and `cellRender` are deferred to 4.3 (see
 * findings F-Calendar-Limited).
 */
@Component({
  selector: 'div[sg-calendar]',
  standalone: true,
  template: `
    <div class="sg-calendar-header">
      <div class="sg-calendar-header-controls">
        <button
          type="button"
          class="sg-calendar-nav-btn"
          [attr.aria-label]="prevYearLabel()"
          (click)="addYear(-1)"
        >
          «
        </button>
        <button
          type="button"
          class="sg-calendar-nav-btn"
          [attr.aria-label]="prevMonthLabel()"
          (click)="addMonth(-1)"
        >
          ‹
        </button>
        <span class="sg-calendar-header-title">{{ monthName() }} {{ panelYear() }}</span>
        <button
          type="button"
          class="sg-calendar-nav-btn"
          [attr.aria-label]="nextMonthLabel()"
          (click)="addMonth(1)"
        >
          ›
        </button>
        <button
          type="button"
          class="sg-calendar-nav-btn"
          [attr.aria-label]="nextYearLabel()"
          (click)="addYear(1)"
        >
          »
        </button>
      </div>
      <button type="button" class="sg-calendar-today-btn" (click)="goToday()">
        {{ todayLabel() }}
      </button>
    </div>
    <table class="sg-calendar-table">
      <thead>
        <tr>
          @for (n of dayNames(); track n) {
            <th class="sg-calendar-th">{{ n }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (week of weeks(); let wi = $index; track wi) {
          <tr>
            @for (cell of week; track cell.iso) {
              <td [class]="cellClass(cell)" (click)="select(cell)">
                <div class="sg-calendar-cell-inner">{{ cell.day }}</div>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'ariaLabel()',
    role: 'grid',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgCalendarComponent {
  private readonly cfg = injectSgConfig()

  protected readonly _internal = signal<Date>(new Date())
  protected readonly _ctrl = signal<Date | undefined>(undefined)
  protected readonly _panel = signal<Date>(new Date())

  @Input() weekStartDay = 0
  @Input({ transform: booleanAttribute }) fullscreen = true

  @Input()
  get value(): Date | undefined {
    return this._ctrl() ?? this._internal()
  }
  set value(v: Date | undefined) {
    this._ctrl.set(v)
    if (v) {
      this._internal.set(v)
      this._panel.set(v)
    }
  }
  @Input()
  set defaultValue(v: Date | undefined) {
    if (this._ctrl() === undefined && v) {
      this._internal.set(v)
      this._panel.set(v)
    }
  }

  @Output() readonly valueChange = new EventEmitter<Date>()

  readonly classes = computed(() =>
    ['sg-calendar', this.fullscreen ? 'sg-calendar-fullscreen' : 'sg-calendar-card']
      .filter(Boolean)
      .join(' '),
  )

  readonly ariaLabel = computed(() => this.cfg.locale?.calendar?.today ?? 'Calendar')

  readonly panelYear = computed(() => this._panel().getFullYear())
  readonly panelMonth = computed(() => this._panel().getMonth())

  readonly weeks = computed(() =>
    getMonthGrid(this.panelYear(), this.panelMonth(), this.weekStartDay),
  )

  readonly monthName = computed(() => {
    const names = this.cfg.locale?.calendar?.monthNames ?? DEFAULT_MONTH_NAMES
    return names[this.panelMonth()]
  })

  readonly dayNames = computed(() => {
    const base = this.cfg.locale?.calendar?.dayNames ?? DEFAULT_DAY_NAMES
    if (this.weekStartDay === 0) return base
    return [...base.slice(this.weekStartDay), ...base.slice(0, this.weekStartDay)]
  })

  readonly todayLabel = computed(() => this.cfg.locale?.calendar?.today ?? 'Today')
  readonly prevYearLabel = computed(() => this.cfg.locale?.calendar?.prevYear ?? 'Previous year')
  readonly nextYearLabel = computed(() => this.cfg.locale?.calendar?.nextYear ?? 'Next year')
  readonly prevMonthLabel = computed(() => this.cfg.locale?.calendar?.prevMonth ?? 'Previous month')
  readonly nextMonthLabel = computed(() => this.cfg.locale?.calendar?.nextMonth ?? 'Next month')

  cellClass(cell: DayCell): string {
    const v = this._ctrl() ?? this._internal()
    return [
      'sg-calendar-cell',
      cell.inMonth ? '' : 'sg-calendar-cell-disabled',
      v && isSameDay(cell.date, v) ? 'sg-calendar-cell-selected' : '',
      isSameDay(cell.date, new Date()) ? 'sg-calendar-cell-today' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  addMonth(d: number): void {
    const cur = this._panel()
    this._panel.set(new Date(cur.getFullYear(), cur.getMonth() + d, 1))
  }
  addYear(d: number): void {
    const cur = this._panel()
    this._panel.set(new Date(cur.getFullYear() + d, cur.getMonth(), 1))
  }

  goToday(): void {
    const today = new Date()
    if (this._ctrl() === undefined) this._internal.set(today)
    this._panel.set(today)
    this.valueChange.emit(today)
  }

  select(cell: DayCell): void {
    if (!cell.inMonth) return
    if (this._ctrl() === undefined) this._internal.set(cell.date)
    this._panel.set(cell.date)
    this.valueChange.emit(cell.date)
  }
}
