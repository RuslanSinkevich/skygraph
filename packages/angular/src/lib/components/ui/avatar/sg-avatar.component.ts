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
      <img [class]="imgClass()" [src]="src" [alt]="alt || ''" />
    } @else {
      <span [class]="textClass()">
        <ng-content></ng-content>
      </span>
    }
  `,
  host: {
    '[class]': 'classes()',
    '[style.width.px]': 'hostPx()',
    '[style.height.px]': 'hostPx()',
    '[style.lineHeight.px]': 'hostPx()',
    '[style.fontSize.px]': 'hostFontSize()',
    role: 'img',
    '[attr.aria-label]': 'ariaLabel || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgAvatarComponent {
  private readonly cfg = injectSgConfig()
  private readonly _size = signal<SizeType | number | undefined>(undefined)
  private readonly _shape = signal<'circle' | 'square'>('circle')
  private readonly _unstyled = signal<boolean>(false)

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

  /** Strip all sg-avatar-* classes and the inline sizing. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
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

  readonly hostPx = computed(() => (this._unstyled() ? null : this.px()))

  readonly fontSize = computed(() => (this.src ? null : Math.round(this.px() * 0.45)))

  readonly hostFontSize = computed(() => (this._unstyled() ? null : this.fontSize()))

  readonly classes = computed(() => {
    if (this._unstyled()) return ''
    const parts = [
      'sg-avatar',
      `sg-avatar-${this._shape()}`,
      typeof this.resolvedSize() === 'string' ? `sg-avatar-${this.avatarSizeToken()}` : '',
    ]
    return parts.filter(Boolean).join(' ')
  })

  readonly imgClass = computed(() => (this._unstyled() ? '' : 'sg-avatar-image'))
  readonly textClass = computed(() => (this._unstyled() ? '' : 'sg-avatar-text'))
}
