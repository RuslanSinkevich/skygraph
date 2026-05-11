import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

const PRESET = new Set(['default', 'success', 'error', 'warning', 'processing'])

/**
 * Attribute-selector tag, DOM-equivalent of
 * `packages/react/src/components/ui/Tag.tsx`.
 *
 * Use as `<span sg-tag color="success">label</span>` or
 * `<span sg-tag closable (closed)="…">label</span>`.
 */
@Component({
  selector: 'span[sg-tag]',
  standalone: true,
  template: `
    <ng-content></ng-content>
    @if (closable) {
      <span
        class="sg-tag-close"
        role="button"
        [attr.aria-label]="closeAriaLabel()"
        (click)="handleClose($event)"
        >×</span
      >
    }
  `,
  host: {
    '[class]': 'classes()',
    '[style.background]': 'customBg()',
    '[style.borderColor]': 'customBg()',
    '[style.color]': 'customColor()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTagComponent {
  private readonly cfg = injectSgConfig()
  private readonly _color = signal<string>('default')
  private readonly _bordered = signal<boolean>(true)
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

  /** Preset color (default/success/error/warning/processing) or any CSS color. */
  @Input()
  get color(): string {
    return this._color()
  }
  set color(v: string) {
    this._color.set(v ?? 'default')
  }

  /** When `true`, draw a border around the tag. @default true */
  @Input({ transform: booleanAttribute })
  get bordered(): boolean {
    return this._bordered()
  }
  set bordered(v: boolean) {
    this._bordered.set(v)
  }

  /** Renders the close (×) control when true. */
  @Input({ transform: booleanAttribute }) closable = false

  /** Strips built-in styles when true. */
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  /** Extra class name appended to the host class list. */
  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  /** Emitted when the close (×) control is activated. */
  @Output() readonly closed = new EventEmitter<void>()

  readonly isPreset = computed(() => PRESET.has(this._color()))

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    const parts = [
      'sg-tag',
      this.isPreset() ? `sg-tag-${this._color()}` : '',
      this._bordered() ? '' : 'sg-tag-borderless',
      this._className(),
    ]
    return parts.filter(Boolean).join(' ')
  })

  readonly customBg = computed(() => (this._unstyled() || this.isPreset() ? null : this._color()))
  readonly customColor = computed(() => (this._unstyled() || this.isPreset() ? null : '#fff'))

  readonly closeAriaLabel = computed(() => this.cfg.locale?.tag?.closeAriaLabel ?? 'Close')

  handleClose(event: Event): void {
    event.stopPropagation()
    this.closed.emit()
  }
}
