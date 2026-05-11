import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

const SIZE_MAP: Record<string, number> = {
  small: 24,
  default: 32,
  large: 40,
}

/**
 * Attribute-selector avatar, DOM-equivalent of
 * `packages/react/src/components/ui/Avatar.tsx`.
 *
 * Modes:
 * - `<span sg-avatar src="..." alt="..."></span>`         — image
 * - `<span sg-avatar><svg sg-avatar-icon ... /></span>`  — projected icon (use class `sg-avatar-icon`)
 * - `<span sg-avatar>JD</span>`                            — text fallback
 *
 * For text mode, project the initials directly. The component wraps
 * projected content in `<span class="sg-avatar-text">` automatically
 * unless `src` is set or a child carries the `sg-avatar-icon` class.
 */
@Component({
  selector: 'span[sg-avatar]',
  standalone: true,
  template: `
    @if (src) {
      <img class="sg-avatar-image" [src]="src" [alt]="alt || ''" />
    } @else {
      <span class="sg-avatar-text">
        <ng-content></ng-content>
      </span>
    }
  `,
  host: {
    '[class]': 'classes()',
    '[style.width.px]': 'px()',
    '[style.height.px]': 'px()',
    '[style.lineHeight.px]': 'px()',
    '[style.fontSize.px]': 'fontSize()',
    role: 'img',
    '[attr.aria-label]': 'ariaLabel || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgAvatarComponent {
  private readonly cfg = injectSgConfig()
  private readonly _size = signal<SizeType | number | undefined>(undefined)
  private readonly _shape = signal<'circle' | 'square'>('circle')

  @Input() src?: string
  @Input() alt?: string
  /** Accessible name for the avatar (when no visible text). */
  @Input('aria-label') ariaLabel?: string

  /** Outer shape. @default 'circle' */
  @Input()
  get shape(): 'circle' | 'square' {
    return this._shape()
  }
  set shape(v: 'circle' | 'square') {
    this._shape.set(v ?? 'circle')
  }

  /** Width/height in px (number) or preset size token. */
  @Input()
  get size(): SizeType | number | undefined {
    return this._size()
  }
  set size(v: SizeType | number | undefined) {
    this._size.set(v == null ? undefined : v)
  }

  readonly resolvedSize = computed<SizeType | number>(
    () => this._size() ?? this.cfg.size ?? 'middle',
  )

  readonly avatarSizeToken = computed<string>(() => {
    const s = this.resolvedSize()
    if (typeof s === 'number') return ''
    return s === 'middle' ? 'default' : s
  })

  readonly px = computed(() => {
    const s = this.resolvedSize()
    if (typeof s === 'number') return s
    return SIZE_MAP[this.avatarSizeToken()] ?? 32
  })

  readonly fontSize = computed(() => (this.src ? null : Math.round(this.px() * 0.45)))

  readonly classes = computed(() => {
    const parts = [
      'sg-avatar',
      `sg-avatar-${this._shape()}`,
      typeof this.resolvedSize() === 'string' ? `sg-avatar-${this.avatarSizeToken()}` : '',
    ]
    return parts.filter(Boolean).join(' ')
  })
}
