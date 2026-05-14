import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  signal,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

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
  imports: [NgTemplateOutlet],
  template: `
    <ng-content></ng-content>
    @if (visible()) {
      @if (_unstyled()) {
        <div [id]="tooltipId" role="tooltip">
          @if (titleTemplate) {
            <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
          } @else {
            {{ title }}
          }
        </div>
      } @else {
        <div [id]="tooltipId" role="tooltip" [class]="'sg-tooltip sg-tooltip-' + placement">
          <div class="sg-tooltip-content">
            @if (titleTemplate) {
              <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
            } @else {
              {{ title }}
            }
          </div>
          <div class="sg-tooltip-arrow"></div>
        </div>
      }
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
  readonly _unstyled = signal<boolean>(false)
  readonly visible = signal(false)
  readonly tooltipId = `sg-tooltip-${++tooltipUid}`

  /** Tooltip text content shown on hover/focus. */
  @Input() title = ''

  /** Optional rich-content template — overrides `title` when set. */
  @Input() titleTemplate?: TemplateRef<unknown>

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
