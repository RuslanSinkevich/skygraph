import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

/**
 * Attribute-selector empty-state, DOM-equivalent of
 * `packages/react/src/components/ui/Empty.tsx`.
 *
 * `<div sg-empty></div>` — default illustration + locale `description`.
 * `<div sg-empty description="No results"></div>` — custom description.
 * `<div sg-empty [description]="null">…footer…</div>` — hide description.
 */
@Component({
  selector: 'div[sg-empty]',
  standalone: true,
  template: `
    <div class="sg-empty-image">
      <ng-content select="[sg-empty-image]"></ng-content>
      @if (!hasCustomImage) {
        <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd" transform="translate(0 1)">
            <ellipse cx="32" cy="33" rx="32" ry="7" fill="currentColor" opacity="0.08"></ellipse>
            <g fill-rule="nonzero" stroke="currentColor" stroke-opacity="0.25">
              <path
                d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
              ></path>
              <path
                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35H11.95C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                fill="currentColor"
                opacity="0.08"
              ></path>
            </g>
          </g>
        </svg>
      }
    </div>
    @if (descriptionText() !== null) {
      <p class="sg-empty-description">{{ descriptionText() }}</p>
    }
    <div class="sg-empty-footer">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class]': 'classes()',
    role: 'status',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgEmptyComponent {
  private readonly cfg = injectSgConfig()
  private readonly _description = signal<string | null | undefined>(undefined)
  private readonly _className = signal<string>('')

  /**
   * Description text. `undefined` → locale default ("No data"); `null` →
   * description hidden; string → custom text.
   */
  @Input()
  get description(): string | null | undefined {
    return this._description()
  }
  set description(v: string | null | undefined) {
    this._description.set(v)
  }

  /**
   * Set to `true` if you project a custom illustration through the
   * `[sg-empty-image]` slot — this hides the built-in default SVG.
   */
  @Input() hasCustomImage = false

  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  readonly descriptionText = computed(() => {
    const d = this._description()
    if (d === null) return null
    if (d === undefined) return this.cfg.locale?.empty?.description ?? 'No Data'
    return d
  })

  readonly classes = computed(() => ['sg-empty', this._className()].filter(Boolean).join(' '))
}
