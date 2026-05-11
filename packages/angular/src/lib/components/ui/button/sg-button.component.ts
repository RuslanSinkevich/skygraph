import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'
import { SgSpinComponent } from '../spin/sg-spin.component'

/**
 * Attribute-selector button, DOM-equivalent of
 * `packages/react/src/components/ui/Button.tsx`.
 *
 * Use as:
 * ```html
 * <button sg-button type="primary" size="large" (click)="onClick()">OK</button>
 * <a sg-button type="link" href="/foo">Link</a>
 * ```
 *
 * Renders the same class set as React's `<Button>` — `sg-button`,
 * `sg-button-<type>`, `sg-button-<size>`, plus `sg-button-danger`,
 * `sg-button-block`, `sg-button-loading` modifiers.
 *
 * When `loading` is `true`, projects a `<span sg-spin>` indicator *before*
 * the slotted content, matching React's order.
 */
@Component({
  selector: 'button[sg-button], a[sg-button]',
  standalone: true,
  imports: [SgSpinComponent],
  template: `
    @if (loading) {
      <span sg-spin size="small" [unstyled]="unstyled"></span>
    }
    <ng-content></ng-content>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'isAnchor ? null : htmlType',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '(click)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgButtonComponent {
  private readonly cfg = injectSgConfig()

  private readonly _type = signal<'default' | 'primary' | 'dashed' | 'text' | 'link'>('default')
  private readonly _size = signal<SizeType | undefined>(undefined)
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _danger = signal<boolean>(false)
  private readonly _block = signal<boolean>(false)
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

  /** Visual style variant. @default 'default' */
  @Input()
  get type(): 'default' | 'primary' | 'dashed' | 'text' | 'link' {
    return this._type()
  }
  set type(v: 'default' | 'primary' | 'dashed' | 'text' | 'link') {
    this._type.set(v)
  }

  /** Native HTML button type attribute. @default 'button' */
  @Input() htmlType: 'button' | 'submit' | 'reset' = 'button'

  /** Component size variant. */
  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  /** Disables the button, preventing user interaction. */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled()
  }
  set disabled(v: boolean) {
    this._disabled.set(v)
  }

  /** Shows a loading indicator and disables the button. */
  @Input({ transform: booleanAttribute })
  get loading(): boolean {
    return this._loading()
  }
  set loading(v: boolean) {
    this._loading.set(v)
  }

  /** Visually flags a destructive action. @default false */
  @Input({ transform: booleanAttribute })
  get danger(): boolean {
    return this._danger()
  }
  set danger(v: boolean) {
    this._danger.set(v)
  }

  /** Stretches the button to fill its parent container. @default false */
  @Input({ transform: booleanAttribute })
  get block(): boolean {
    return this._block()
  }
  set block(v: boolean) {
    this._block.set(v)
  }

  /** When `true`, all built-in styles are stripped. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  /** Additional CSS class name appended to the host class list. */
  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  /** Native click event, parity with React's `onClick`. */
  @Output() readonly sgClick = new EventEmitter<MouseEvent>()

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef)

  /** True for `<a sg-button>` so we don't emit a `type` HTML attribute. */
  readonly isAnchor = this.host.nativeElement.tagName === 'A'

  readonly isDisabled = computed(() => {
    const d = this._disabled() || this.cfg.disabled || false
    return d || this._loading()
  })

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    const size = this._size() ?? this.cfg.size ?? 'middle'
    const parts = [
      'sg-button',
      `sg-button-${this._type()}`,
      `sg-button-${size}`,
      this._danger() ? 'sg-button-danger' : '',
      this._block() ? 'sg-button-block' : '',
      this._loading() ? 'sg-button-loading' : '',
      this._className(),
    ]
    return parts.filter(Boolean).join(' ')
  })

  handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault()
      event.stopImmediatePropagation()
      return
    }
    this.sgClick.emit(event as MouseEvent)
  }
}
