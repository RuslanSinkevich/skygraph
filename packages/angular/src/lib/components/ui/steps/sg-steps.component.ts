import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

export type SgStepStatus = 'wait' | 'process' | 'finish' | 'error'

export interface SgStepItem {
  title: string
  description?: string
  /** Plain-string icon (an emoji or short label). See decision D2. */
  icon?: string
  status?: SgStepStatus
}

const CHECK_SVG =
  '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/></svg>'

const ERROR_SVG =
  '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 449.8 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9A7.95 7.95 0 00203.8 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 574.1l216.1 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>'

/**
 * Attribute-selector steps, DOM-equivalent of
 * `packages/react/src/components/ui/Steps.tsx`.
 *
 * Use as `<div sg-steps [items]="…" [current]="…"></div>`.
 */
@Component({
  selector: 'div[sg-steps]',
  standalone: true,
  template: `
    @for (item of items; let i = $index; track i) {
      <div
        [class]="itemClass(item, i)"
        [attr.aria-current]="status(item, i) === 'process' ? 'step' : null"
        (click)="onItemClick(i)"
      >
        <div class="sg-steps-item-container">
          <div class="sg-steps-item-icon">
            @if (item.icon) {
              <span class="sg-steps-icon-custom">{{ item.icon }}</span>
            } @else if (status(item, i) === 'finish') {
              <span class="sg-steps-icon" [innerHTML]="checkSvg"></span>
            } @else if (status(item, i) === 'error') {
              <span class="sg-steps-icon" [innerHTML]="errorSvg"></span>
            } @else {
              <span class="sg-steps-icon">{{ i + 1 }}</span>
            }
          </div>
          <div class="sg-steps-item-content">
            <div class="sg-steps-item-title">
              {{ item.title }}
              @if (direction === 'horizontal' && i < items.length - 1) {
                <span class="sg-steps-item-tail"></span>
              }
            </div>
            @if (item.description) {
              <div class="sg-steps-item-description">{{ item.description }}</div>
            }
          </div>
        </div>
        @if (direction === 'vertical' && i < items.length - 1) {
          <div class="sg-steps-item-tail-vertical"></div>
        }
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'list',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgStepsComponent {
  private readonly cfg = injectSgConfig()
  private readonly _size = signal<SizeType | undefined>(undefined)

  readonly checkSvg = CHECK_SVG
  readonly errorSvg = ERROR_SVG

  @Input({ required: true }) items: SgStepItem[] = []
  @Input() current = 0
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal'
  @Input() type: 'default' | 'navigation' = 'default'

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly currentChange = new EventEmitter<number>()

  readonly resolvedSize = computed(() => {
    const s = this._size() ?? this.cfg.size ?? 'middle'
    return s === 'small' ? 'small' : 'default'
  })

  readonly classes = computed(() =>
    [
      'sg-steps',
      `sg-steps-${this.direction}`,
      `sg-steps-${this.resolvedSize()}`,
      this.type === 'navigation' ? 'sg-steps-navigation' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  status(item: SgStepItem, i: number): SgStepStatus {
    if (item.status) return item.status
    if (i < this.current) return 'finish'
    if (i === this.current) return 'process'
    return 'wait'
  }

  itemClass(item: SgStepItem, i: number): string {
    const clickable = this.currentChange.observed
    return [
      'sg-steps-item',
      `sg-steps-item-${this.status(item, i)}`,
      clickable ? 'sg-steps-item-clickable' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  onItemClick(i: number): void {
    if (this.currentChange.observed) this.currentChange.emit(i)
  }
}
