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
 * Attribute-selector input-group, DOM-equivalent of
 * `packages/react/src/components/ui/InputGroup.tsx`.
 *
 * Use the projected `[sg-input-group-before]` / `[sg-input-group-after]`
 * slots for the addons; the default slot hosts the main control.
 *
 * ```html
 * <span sg-input-group>
 *   <span sg-input-group-before>https://</span>
 *   <span sg-input>…</span>
 *   <span sg-input-group-after>.com</span>
 * </span>
 * ```
 */
@Component({
  selector: 'span[sg-input-group]',
  standalone: true,
  template: `
    <span class="sg-input-group-addon">
      <ng-content select="[sg-input-group-before]"></ng-content>
    </span>
    <ng-content></ng-content>
    <span class="sg-input-group-addon">
      <ng-content select="[sg-input-group-after]"></ng-content>
    </span>
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgInputGroupComponent {
  private readonly cfg = injectSgConfig()
  private readonly _size = signal<SizeType | undefined>(undefined)
  private readonly _compact = signal<boolean>(true)

  @Input({ transform: booleanAttribute })
  get compact(): boolean {
    return this._compact()
  }
  set compact(v: boolean) {
    this._compact.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-input-group',
      `sg-input-group-${this.resolvedSize()}`,
      this._compact() ? 'sg-input-group-compact' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )
}
