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

/**
 * Attribute-selector pagination, DOM-equivalent of
 * `packages/react/src/components/ui/Pagination.tsx`.
 *
 * Use as `<nav sg-pagination [current]="page" [total]="total" …></nav>`.
 *
 * Loading state intentionally inlines just the wrapper class (see
 * findings F-Pagination-Loading).
 */
@Component({
  selector: 'nav[sg-pagination]',
  standalone: true,
  template: `
    @if (simple) {
      <button
        class="sg-pagination-item sg-pagination-prev"
        [disabled]="safeCurrent() <= 1 || resolvedDisabled()"
        (click)="go(safeCurrent() - 1)"
      >
        ‹
      </button>
      <span class="sg-pagination-simple-pager"> {{ safeCurrent() }} / {{ totalPages() }} </span>
      <button
        class="sg-pagination-item sg-pagination-next"
        [disabled]="safeCurrent() >= totalPages() || resolvedDisabled()"
        (click)="go(safeCurrent() + 1)"
      >
        ›
      </button>
    } @else {
      @if (showTotal) {
        <span class="sg-pagination-total"> {{ totalPrefix() }} {{ total }} </span>
      }
      <button
        class="sg-pagination-item sg-pagination-prev"
        [disabled]="safeCurrent() <= 1 || resolvedDisabled()"
        (click)="go(safeCurrent() - 1)"
      >
        ‹
      </button>
      @for (p of pages(); let i = $index; track i) {
        @if (p === '...') {
          <span class="sg-pagination-ellipsis">…</span>
        } @else {
          <button
            [class]="
              'sg-pagination-item' + (p === safeCurrent() ? ' sg-pagination-item-active' : '')
            "
            [attr.aria-current]="p === safeCurrent() ? 'page' : null"
            [disabled]="resolvedDisabled()"
            (click)="go(p)"
          >
            {{ p }}
          </button>
        }
      }
      <button
        class="sg-pagination-item sg-pagination-next"
        [disabled]="safeCurrent() >= totalPages() || resolvedDisabled()"
        (click)="go(safeCurrent() + 1)"
      >
        ›
      </button>
      @if (showSizeChanger) {
        <select
          class="sg-pagination-size-changer"
          [value]="pageSize"
          [disabled]="resolvedDisabled()"
          (change)="onSizeChange($event)"
        >
          @for (opt of pageSizeOptions; track opt) {
            <option [value]="opt">{{ opt }} {{ itemsPerPageLabel() }}</option>
          }
        </select>
      }
      @if (showQuickJumper) {
        <span class="sg-pagination-quick-jumper">
          {{ jumpLabel() }}
          <input
            type="text"
            class="sg-pagination-jumper-input"
            [value]="jumpValue()"
            [disabled]="resolvedDisabled()"
            (input)="onJumpInput($event)"
            (keydown.enter)="handleJump()"
            (blur)="handleJump()"
          />
        </span>
      }
    }
  `,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgPaginationComponent {
  private readonly cfg = injectSgConfig()
  private readonly _disabled = signal<boolean | undefined>(undefined)

  readonly jumpValue = signal<string>('')

  @Input({ required: true }) current = 1
  @Input({ required: true }) total = 0
  @Input() pageSize = 10

  @Input({ transform: booleanAttribute }) simple = false
  @Input({ transform: booleanAttribute }) showSizeChanger = false
  @Input({ transform: booleanAttribute }) showQuickJumper = false
  @Input({ transform: booleanAttribute }) showTotal = false
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100]

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Output() readonly currentChange = new EventEmitter<number>()
  @Output() readonly pageSizeChange = new EventEmitter<number>()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly totalPrefix = computed(() => this.cfg.locale?.pagination?.totalPrefix ?? 'Total')
  readonly itemsPerPageLabel = computed(() => this.cfg.locale?.pagination?.itemsPerPage ?? '/ page')
  readonly jumpLabel = computed(() => this.cfg.locale?.pagination?.jump ?? 'Go to')
  readonly ariaLabel = computed(() => this.cfg.locale?.pagination?.ariaLabel ?? 'Pagination')

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total / this.pageSize)))

  readonly safeCurrent = computed(() => Math.min(Math.max(1, this.current), this.totalPages()))

  readonly pages = computed(() => buildPages(this.safeCurrent(), this.totalPages()))

  readonly classes = computed(() =>
    [
      'sg-pagination',
      this.simple ? 'sg-pagination-simple' : '',
      this.resolvedDisabled() ? 'sg-pagination-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  go(page: number): void {
    if (
      this.resolvedDisabled() ||
      page < 1 ||
      page > this.totalPages() ||
      page === this.safeCurrent()
    )
      return
    this.currentChange.emit(page)
  }

  handleJump(): void {
    const num = parseInt(this.jumpValue(), 10)
    if (!isNaN(num)) this.go(num)
    this.jumpValue.set('')
  }

  onJumpInput(e: Event): void {
    this.jumpValue.set((e.target as HTMLInputElement).value)
  }

  onSizeChange(e: Event): void {
    const v = Number((e.target as HTMLSelectElement).value)
    if (!isNaN(v)) this.pageSizeChange.emit(v)
  }
}

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}
