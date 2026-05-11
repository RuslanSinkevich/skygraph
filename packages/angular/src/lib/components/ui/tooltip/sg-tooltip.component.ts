import { ChangeDetectionStrategy, Component, Input, booleanAttribute, signal } from '@angular/core'

let tooltipUid = 0

/**
 * Tooltip wrapper, DOM-equivalent of
 * `packages/react/src/components/ui/Tooltip.tsx`.
 *
 * Wraps a single trigger projected via `<ng-content>`. Tooltip popup is
 * an inline child positioned with CSS classes (`sg-tooltip-top` etc.) —
 * runtime measurement is intentionally not done (parity with React,
 * which also relies on CSS).
 *
 * Use as:
 * ```html
 * <span sg-tooltip title="Hello" placement="top">
 *   <button sg-button>Hover me</button>
 * </span>
 * ```
 */
@Component({
  selector: 'span[sg-tooltip]',
  standalone: true,
  template: `
    <ng-content></ng-content>
    @if (visible()) {
      <div [id]="tooltipId" role="tooltip" [class]="'sg-tooltip sg-tooltip-' + placement">
        <div class="sg-tooltip-content">{{ title }}</div>
        <div class="sg-tooltip-arrow"></div>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focusin)': 'show()',
    '(focusout)': 'hide()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTooltipComponent {
  private readonly _unstyled = signal<boolean>(false)
  readonly visible = signal(false)
  readonly tooltipId = `sg-tooltip-${++tooltipUid}`

  /** Tooltip text content shown on hover/focus. */
  @Input() title = ''

  /** Position relative to the trigger. @default 'top' */
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top'

  /** Strips built-in styles when true. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  classes(): string {
    return this._unstyled() ? '' : 'sg-tooltip-wrapper'
  }

  show(): void {
    this.visible.set(true)
  }

  hide(): void {
    this.visible.set(false)
  }
}
