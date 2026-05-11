import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/**
 * Attribute-selector spinner, DOM-equivalent of
 * `packages/react/src/components/ui/Spin.tsx` (standalone + fullscreen
 * branches).
 *
 * Use as:
 * ```html
 * <span sg-spin></span>                   <!-- standalone -->
 * <span sg-spin tip="Loading..."></span>  <!-- standalone with tip -->
 * <div  sg-spin fullscreen></div>         <!-- fullscreen overlay -->
 * ```
 *
 * The container-over-children branch (React's `<Spin>` wrapping projected
 * content with `sg-spin-overlay` + `sg-spin-blur`) is **not** implemented in
 * Wave 4.1; see `docs/_streams/findings/T-Angular-Foundation.md` F1.
 *
 * `delay` input is accepted for API parity but currently ignored — see F2 in
 * the same finding doc.
 */
@Component({
  selector: 'span[sg-spin], div[sg-spin]',
  standalone: true,
  template: `
    @if (visible()) {
      <span
        [class]="indicatorClasses()"
        role="status"
        aria-live="polite"
        [attr.aria-label]="loadingLabel()"
      ></span>
      @if (tip) {
        <div [class]="tipClass()">{{ tip }}</div>
      }
    }
  `,
  host: {
    '[class.sg-spin-standalone]': '!unstyled && !fullscreen',
    '[class.sg-spin-fullscreen]': '!unstyled && fullscreen',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSpinComponent {
  private readonly cfg = injectSgConfig()
  private readonly _size = signal<SizeType | undefined>(undefined)
  private readonly _spinning = signal<boolean>(true)
  private readonly _unstyled = signal<boolean>(false)

  /** When `true`, shows the loading state. @default true */
  @Input({ transform: booleanAttribute })
  get spinning(): boolean {
    return this._spinning()
  }
  set spinning(v: boolean) {
    this._spinning.set(v)
  }

  /** Component size variant. */
  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  /**
   * Optional text below the indicator (only in standalone / fullscreen modes
   * in Wave 4.1; see finding F1).
   */
  @Input() tip?: string

  /** When `true`, covers the viewport instead of inline. */
  @Input({ transform: booleanAttribute }) fullscreen = false

  /** When `true`, all built-in styles are stripped. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  /**
   * Accepted for API parity with React's `delay` prop; currently no-op in
   * Wave 4.1 (see finding F2).
   */
  @Input() delay?: number

  /** Extra class names applied to the indicator `<span>`. */
  @Input() className = ''

  readonly visible = computed(() => this._spinning())

  readonly indicatorClasses = computed(() => {
    if (this._unstyled()) return this.className
    const resolved = this._size() ?? this.cfg.size ?? 'middle'
    const tag = resolved === 'middle' ? 'default' : resolved
    return ['sg-spin', `sg-spin-${tag}`, this.className].filter(Boolean).join(' ')
  })

  readonly tipClass = computed(() => (this._unstyled() ? '' : 'sg-spin-tip'))

  readonly loadingLabel = computed(() => this.cfg.locale?.spin?.loading ?? 'Loading')
}
