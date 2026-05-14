import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'

export interface SgTimelineItem {
  /** Plain-string body content (see decision D2). */
  content: string
  /** Optional CSS color value applied to the default dot border / text. */
  color?: string
  /** Plain-string custom dot (replaces the default `●`). */
  dot?: string
  /** Optional label rendered beside the marker. */
  label?: string
  /** Force this item to one side (overrides `mode` for this index). */
  position?: 'left' | 'right'
}

/**
 * Attribute-selector timeline, DOM-equivalent of
 * `packages/react/src/components/ui/Timeline.tsx`.
 *
 * Use as `<ul sg-timeline [items]="…" mode="alternate"></ul>`.
 */
@Component({
  selector: 'ul[sg-timeline]',
  standalone: true,
  template: `
    @for (item of resolvedItems(); let i = $index; track i) {
      <li [class]="itemClass(item, i)" role="listitem">
        @if (item.label !== undefined) {
          <div [class]="labelClass()">{{ item.label }}</div>
        }
        <div [class]="headWrapperClass()">
          <div
            [class]="dotClass(item)"
            [style.border-color]="item.color && !item.dot ? item.color : null"
            [style.color]="item.color && !item.dot ? item.color : null"
          >
            {{ item.dot ?? '' }}
          </div>
          @if (i < resolvedItems().length - 1 && !_unstyled()) {
            <div class="sg-timeline-item-tail"></div>
          }
        </div>
        <div [class]="contentClass()">{{ item.content }}</div>
      </li>
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'list',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTimelineComponent {
  protected readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

  @Input({ required: true }) items: SgTimelineItem[] = []
  @Input() mode: 'left' | 'right' | 'alternate' = 'left'
  /** When set, appends a synthetic pending row at the end. */
  @Input() pending?: string
  @Input() pendingDot?: string
  @Input({ transform: booleanAttribute }) reverse = false

  /** Strip every sg-timeline-* class — keep only DOM structure. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    return ['sg-timeline', `sg-timeline-${this.mode}`, this._className()].filter(Boolean).join(' ')
  })

  readonly labelClass = computed(() => (this._unstyled() ? '' : 'sg-timeline-item-label'))
  readonly headWrapperClass = computed(() =>
    this._unstyled() ? '' : 'sg-timeline-item-head-wrapper',
  )
  readonly contentClass = computed(() => (this._unstyled() ? '' : 'sg-timeline-item-content'))

  readonly resolvedItems = computed<SgTimelineItem[]>(() => {
    let arr: SgTimelineItem[] = [...(this.items ?? [])]
    if (this.pending !== undefined && this.pending !== null) {
      arr.push({
        content: typeof this.pending === 'string' ? this.pending : '',
        dot: this.pendingDot,
      })
    }
    if (this.reverse) arr = arr.reverse()
    return arr
  })

  itemClass(item: SgTimelineItem, i: number): string {
    if (this._unstyled()) return ''
    const pos =
      item.position ?? (this.mode === 'alternate' ? (i % 2 === 0 ? 'left' : 'right') : this.mode)
    const isPendingItem =
      this.pending !== undefined && this.pending !== null && i === this.resolvedItems().length - 1
    return [
      'sg-timeline-item',
      `sg-timeline-item-${pos}`,
      isPendingItem ? 'sg-timeline-item-pending' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  dotClass(item: SgTimelineItem): string {
    if (this._unstyled()) return ''
    return ['sg-timeline-item-head', item.dot ? 'sg-timeline-item-head-custom' : '']
      .filter(Boolean)
      .join(' ')
  }
}
