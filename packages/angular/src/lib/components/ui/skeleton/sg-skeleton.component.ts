import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  computed,
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

/**
 * Attribute-selector skeleton, DOM-equivalent of
 * `packages/react/src/components/ui/Skeleton.tsx`.
 *
 * `<div sg-skeleton></div>` renders title + 3 paragraph lines + optional
 * avatar block. When `[loading]=false` the projected children render
 * instead of placeholders.
 */
@Component({
  selector: 'div[sg-skeleton]',
  standalone: true,
  template: `
    @if (loading) {
      @if (avatar) {
        <div class="sg-skeleton-header">
          <span
            [class]="'sg-skeleton-avatar sg-skeleton-avatar-' + avatarShape"
            [style.width.px]="avatarSize"
            [style.height.px]="avatarSize"
          ></span>
        </div>
      }
      <div class="sg-skeleton-content">
        @if (title) {
          <div class="sg-skeleton-title" [style.width]="titleWidthCss()"></div>
        }
        @if (paragraph) {
          <ul class="sg-skeleton-paragraph">
            @for (i of rowIndexes(); track i) {
              <li [style.width]="rowWidthCss(i)"></li>
            }
          </ul>
        }
      </div>
    } @else {
      <ng-content></ng-content>
    }
  `,
  host: {
    '[class]': 'classes()',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.aria-label]': 'loading ? loadingLabel() : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSkeletonComponent {
  private readonly cfg = injectSgConfig()
  private readonly _active = signal<boolean>(false)
  private readonly _avatar = signal<boolean>(false)
  private readonly _title = signal<boolean>(true)
  private readonly _paragraph = signal<boolean>(true)
  private readonly _loading = signal<boolean>(true)
  private readonly _className = signal<string>('')

  /** Enables shimmering animation. @default false */
  @Input({ transform: booleanAttribute })
  get active(): boolean {
    return this._active()
  }
  set active(v: boolean) {
    this._active.set(v)
  }

  /** Shows an avatar block. @default false */
  @Input({ transform: booleanAttribute })
  get avatar(): boolean {
    return this._avatar()
  }
  set avatar(v: boolean) {
    this._avatar.set(v)
  }

  @Input() avatarSize = 40
  @Input() avatarShape: 'circle' | 'square' = 'circle'

  /** Shows a title bar. @default true */
  @Input({ transform: booleanAttribute })
  get title(): boolean {
    return this._title()
  }
  set title(v: boolean) {
    this._title.set(v)
  }
  @Input() titleWidth: number | string = '38%'

  /** Shows paragraph lines. @default true */
  @Input({ transform: booleanAttribute })
  get paragraph(): boolean {
    return this._paragraph()
  }
  set paragraph(v: boolean) {
    this._paragraph.set(v)
  }
  @Input({ transform: numberAttribute }) rows = 3
  @Input() rowWidths?: Array<number | string>

  /** When false, renders projected children instead. @default true */
  @Input({ transform: booleanAttribute })
  get loading(): boolean {
    return this._loading()
  }
  set loading(v: boolean) {
    this._loading.set(v)
  }

  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  readonly loadingLabel = computed(() => this.cfg.locale?.skeleton?.loading ?? 'Loading')

  readonly classes = computed(() => {
    const parts = [
      'sg-skeleton',
      this._active() ? 'sg-skeleton-active' : '',
      this._avatar() ? 'sg-skeleton-with-avatar' : '',
      this._className(),
    ]
    return parts.filter(Boolean).join(' ')
  })

  rowIndexes(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i)
  }

  titleWidthCss(): string {
    const w = this.titleWidth
    return typeof w === 'number' ? `${w}px` : w
  }

  rowWidthCss(i: number): string {
    if (this.rowWidths && this.rowWidths[i] !== undefined) {
      const w = this.rowWidths[i]
      return typeof w === 'number' ? `${w}px` : w
    }
    if (i === this.rows - 1) return '61%'
    return '100%'
  }
}
