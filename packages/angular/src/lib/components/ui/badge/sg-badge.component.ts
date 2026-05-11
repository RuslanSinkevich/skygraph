import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  computed,
  numberAttribute,
  signal,
} from '@angular/core'

/**
 * Attribute-selector badge, DOM-equivalent of
 * `packages/react/src/components/ui/Badge.tsx`.
 *
 * Three render modes:
 * - **Standalone status** — `<span sg-badge status="success" text="…">`.
 *   Renders `<span class="sg-badge-status">…`.
 * - **Wrapping** — `<span sg-badge [count]="5">{children}</span>`.
 *   Renders `<span class="sg-badge">{children}<sup …/></span>`.
 * - **Standalone count/dot** (no children) — host gets
 *   `sg-badge sg-badge-standalone` + a `<sup>`.
 *
 * Status-mode without children replaces the host classes (we cannot
 * change the host element type, but the class set matches React).
 */
@Component({
  selector: 'span[sg-badge]',
  standalone: true,
  template: `
    @if (statusOnly()) {
      <span
        [class]="'sg-badge-status-dot sg-badge-status-' + status"
        [style.background]="color || null"
      ></span>
      @if (text) {
        <span class="sg-badge-status-text">{{ text }}</span>
      }
    } @else {
      <ng-content></ng-content>
      @if (dot && !hasCount()) {
        <sup
          class="sg-badge-dot"
          [style.right]="offsetRight()"
          [style.marginTop]="offsetMargin()"
          [style.background]="color || null"
        ></sup>
      }
      @if (hasCount()) {
        <sup
          class="sg-badge-count"
          [style.right]="offsetRight()"
          [style.marginTop]="offsetMargin()"
          [style.background]="color || null"
          [attr.aria-label]="displayCount()"
          >{{ displayCount() }}</sup
        >
      }
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgBadgeComponent {
  private readonly _count = signal<number | undefined>(undefined)
  private readonly _dot = signal<boolean>(false)
  private readonly _showZero = signal<boolean>(false)
  private readonly _hasContent = signal<boolean>(true)
  private readonly _status = signal<
    'success' | 'error' | 'warning' | 'processing' | 'default' | undefined
  >(undefined)

  /** Numeric value shown in the badge; hidden when zero unless `showZero`. */
  @Input({
    transform: (v: unknown) => (v === '' || v == null ? undefined : numberAttribute(v as never)),
  })
  get count(): number | undefined {
    return this._count()
  }
  set count(v: number | undefined) {
    this._count.set(v)
  }

  /** Renders a small dot indicator instead of a numeric count. */
  @Input({ transform: booleanAttribute })
  get dot(): boolean {
    return this._dot()
  }
  set dot(v: boolean) {
    this._dot.set(v)
  }

  /** Maximum count before showing `{overflowCount}+`. @default 99 */
  @Input({ transform: numberAttribute }) overflowCount = 99

  /** When true, shows the badge even when `count` is zero. */
  @Input({ transform: booleanAttribute })
  get showZero(): boolean {
    return this._showZero()
  }
  set showZero(v: boolean) {
    this._showZero.set(v)
  }

  /** Custom CSS color (background of dot/count). */
  @Input() color?: string

  /** Preset status style (only applies when host has no projected content). */
  @Input()
  get status(): 'success' | 'error' | 'warning' | 'processing' | 'default' | undefined {
    return this._status()
  }
  set status(v: 'success' | 'error' | 'warning' | 'processing' | 'default' | undefined) {
    this._status.set(v)
  }

  /** Text label shown next to the status dot. */
  @Input() text?: string

  /** Pixel offset `[right, top]`. */
  @Input() offset?: [number, number]

  /**
   * Force the "no children" mode (so the badge becomes standalone or
   * status-only). When omitted the component assumes children exist.
   * Angular has no clean way to detect projected `<ng-content>` slot
   * presence at runtime without `ContentChildren`, so we expose this
   * flag for the standalone case.
   */
  @Input({ transform: booleanAttribute })
  set noChildren(v: boolean) {
    this._hasContent.set(!v)
  }

  readonly hasCount = computed(() => {
    const c = this._count()
    return c !== undefined && (c > 0 || this._showZero())
  })

  readonly displayCount = computed(() => {
    if (!this.hasCount()) return null
    const c = this._count()!
    return c > this.overflowCount ? `${this.overflowCount}+` : `${c}`
  })

  readonly statusOnly = computed(() => this._status() !== undefined && !this._hasContent())

  readonly isStandalone = computed(() => !this._hasContent() && (this.hasCount() || this._dot()))

  readonly classes = computed(() => {
    if (this.statusOnly()) return 'sg-badge-status'
    return ['sg-badge', this.isStandalone() ? 'sg-badge-standalone' : ''].filter(Boolean).join(' ')
  })

  readonly offsetRight = computed(() =>
    this.offset && !this.isStandalone() ? `${-this.offset[0]}px` : null,
  )
  readonly offsetMargin = computed(() =>
    this.offset && !this.isStandalone() ? `${this.offset[1]}px` : null,
  )
}
