import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/** One mention candidate. */
export interface SgMentionOption {
  value: string
  label?: string
}

/**
 * Mentions textarea (minimal), DOM-equivalent of
 * `packages/react/src/components/ui/Mentions.tsx`.
 *
 * Wave 4.2 ships only the textarea + change/select API. The auto-suggest
 * dropdown is **not** implemented — see finding F-Mentions-Suggestions.
 */
@Component({
  selector: 'div[sg-mentions]',
  standalone: true,
  template: `
    <textarea
      class="sg-input sg-textarea"
      [value]="currentValue()"
      [placeholder]="placeholder || null"
      [rows]="rows"
      [disabled]="isInteractiveDisabled()"
      (input)="handleInput($event)"
    ></textarea>
  `,
  host: {
    '[class]': 'classes()',
    '[style.position]': '"relative"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgMentionsComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input()
  get value(): string {
    return this._value() ?? this._internal()
  }
  set value(v: string) {
    this._value.set(v)
    this._internal.set(v ?? '')
  }
  @Input()
  set defaultValue(v: string) {
    if (this._value() === undefined) this._internal.set(v ?? '')
  }

  @Input() prefix: string | string[] = '@'
  @Input() options: SgMentionOption[] = []
  @Input() placement: 'top' | 'bottom' = 'bottom'
  @Input() placeholder?: string
  @Input({ transform: numberAttribute }) rows = 3

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled()
  }
  set disabled(v: boolean) {
    this._disabled.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<string>()

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(() => this._disabled() || (this.cfg.disabled ?? false))

  readonly classes = computed(() =>
    [
      'sg-mentions',
      `sg-mentions-${this.resolvedSize()}`,
      this.isInteractiveDisabled() ? 'sg-mentions-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  handleInput(event: Event): void {
    const v = (event.target as HTMLTextAreaElement).value
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }
}
