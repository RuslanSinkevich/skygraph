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
import type { SizeType } from '../../../types'

/**
 * Attribute-selector progress bar / circle, DOM-equivalent of
 * `packages/react/src/components/ui/Progress.tsx`.
 *
 * `<div sg-progress [percent]="50"></div>` renders a horizontal bar.
 * `<div sg-progress type="circle" [percent]="60"></div>` renders an SVG
 * circle.
 */
@Component({
  selector: 'div[sg-progress]',
  standalone: true,
  template: `
    @if (type === 'circle') {
      <svg [attr.width]="width" [attr.height]="width" [attr.viewBox]="'0 0 ' + width + ' ' + width">
        <circle
          class="sg-progress-circle-trail"
          [attr.cx]="width / 2"
          [attr.cy]="width / 2"
          [attr.r]="radius()"
          [attr.stroke-width]="circleStrokeWidth()"
          fill="none"
        ></circle>
        <circle
          class="sg-progress-circle-path"
          [attr.cx]="width / 2"
          [attr.cy]="width / 2"
          [attr.r]="radius()"
          [attr.stroke-width]="circleStrokeWidth()"
          fill="none"
          [attr.stroke-dasharray]="circumference()"
          [attr.stroke-dashoffset]="dashOffset()"
          stroke-linecap="round"
          [style.stroke]="strokeColor || null"
          [attr.transform]="'rotate(-90 ' + width / 2 + ' ' + width / 2 + ')'"
        ></circle>
      </svg>
      @if (showInfo) {
        <span class="sg-progress-circle-text">{{ clamped() }}%</span>
      }
    } @else {
      <div class="sg-progress-outer">
        <div class="sg-progress-inner" [style.height.px]="barHeight()">
          <div
            class="sg-progress-bg"
            [style.width.%]="clamped()"
            [style.background]="strokeColor || null"
          ></div>
        </div>
      </div>
      @if (showInfo) {
        <span class="sg-progress-text">{{ clamped() }}%</span>
      }
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'progressbar',
    '[attr.aria-valuenow]': 'clamped()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgProgressComponent {
  private readonly cfg = injectSgConfig()
  private readonly _percent = signal<number>(0)
  private readonly _type = signal<'line' | 'circle'>('line')
  private readonly _status = signal<'normal' | 'success' | 'error' | 'active'>('normal')
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input({ transform: numberAttribute })
  get percent(): number {
    return this._percent()
  }
  set percent(v: number) {
    this._percent.set(Number.isFinite(v) ? v : 0)
  }

  @Input()
  get type(): 'line' | 'circle' {
    return this._type()
  }
  set type(v: 'line' | 'circle') {
    this._type.set(v ?? 'line')
  }

  @Input()
  get status(): 'normal' | 'success' | 'error' | 'active' {
    return this._status()
  }
  set status(v: 'normal' | 'success' | 'error' | 'active') {
    this._status.set(v ?? 'normal')
  }

  @Input({ transform: booleanAttribute }) showInfo = true
  @Input() strokeWidth?: number
  @Input() strokeColor?: string

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v ?? undefined)
  }

  @Input({ transform: numberAttribute }) width = 120

  readonly clamped = computed(() => Math.min(100, Math.max(0, this._percent())))

  readonly resolvedStatus = computed(() => {
    const s = this._status()
    return this.clamped() >= 100 && s === 'normal' ? 'success' : s
  })

  readonly progressSize = computed(() => {
    const s = this._size() ?? this.cfg.size ?? 'middle'
    return s === 'small' ? 'small' : 'default'
  })

  readonly classes = computed(() => {
    const parts = [
      'sg-progress',
      this._type() === 'circle' ? 'sg-progress-circle' : 'sg-progress-line',
      `sg-progress-${this.resolvedStatus()}`,
      this._type() === 'line' ? `sg-progress-${this.progressSize()}` : '',
    ]
    return parts.filter(Boolean).join(' ')
  })

  readonly circleStrokeWidth = computed(() => this.strokeWidth ?? 6)
  readonly radius = computed(() => (this.width - this.circleStrokeWidth()) / 2)
  readonly circumference = computed(() => 2 * Math.PI * this.radius())
  readonly dashOffset = computed(
    () => this.circumference() - (this.clamped() / 100) * this.circumference(),
  )

  barHeight(): number {
    return this.strokeWidth ?? (this.progressSize() === 'small' ? 6 : 8)
  }
}
